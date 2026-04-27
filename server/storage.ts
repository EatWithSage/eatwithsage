import { db } from "./db.js";
import { blogPosts, type BlogPost, type InsertBlogPost } from "../shared/schema.js";
import { eq, desc, and, lte, lt, isNull, isNotNull, sql } from "drizzle-orm";

export interface IStorage {
  getBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getSoftDeletedBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  restoreBlogPost(id: number): Promise<BlogPost | undefined>;
  permanentlyDeleteBlogPost(id: number): Promise<boolean>;
  purgeOldDeletedPosts(olderThanDays: number): Promise<number>;
  countPostsEligibleForPurge(olderThanDays: number): Promise<number>;
}

export class DbStorage implements IStorage {
  async getBlogPosts(): Promise<BlogPost[]> {
    return db
      .select()
      .from(blogPosts)
      .where(isNull(blogPosts.deletedAt))
      .orderBy(desc(blogPosts.createdAt));
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return db
      .select()
      .from(blogPosts)
      .where(
        and(
          eq(blogPosts.status, "published"),
          lte(blogPosts.publishedDate, new Date()),
          isNull(blogPosts.deletedAt)
        )
      )
      .orderBy(desc(blogPosts.publishedDate));
  }

  async getSoftDeletedBlogPosts(): Promise<BlogPost[]> {
    return db
      .select()
      .from(blogPosts)
      .where(isNotNull(blogPosts.deletedAt))
      .orderBy(desc(blogPosts.deletedAt));
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const results = await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.id, id), isNull(blogPosts.deletedAt)));
    return results[0];
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const results = await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.slug, slug), isNull(blogPosts.deletedAt)));
    return results[0];
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const results = await db.insert(blogPosts).values(post).returning();
    return results[0];
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const results = await db
      .update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(and(eq(blogPosts.id, id), isNull(blogPosts.deletedAt)))
      .returning();
    return results[0];
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const results = await db
      .update(blogPosts)
      .set({ deletedAt: new Date(), updatedAt: new Date() })
      .where(and(eq(blogPosts.id, id), isNull(blogPosts.deletedAt)))
      .returning();
    return results.length > 0;
  }

  async restoreBlogPost(id: number): Promise<BlogPost | undefined> {
    const results = await db
      .update(blogPosts)
      .set({ deletedAt: null, updatedAt: new Date() })
      .where(and(eq(blogPosts.id, id), isNotNull(blogPosts.deletedAt)))
      .returning();
    return results[0];
  }

  async permanentlyDeleteBlogPost(id: number): Promise<boolean> {
    const results = await db
      .delete(blogPosts)
      .where(and(eq(blogPosts.id, id), isNotNull(blogPosts.deletedAt)))
      .returning();
    return results.length > 0;
  }

  async purgeOldDeletedPosts(olderThanDays: number): Promise<number> {
    const cutoff = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000);
    const results = await db
      .delete(blogPosts)
      .where(and(isNotNull(blogPosts.deletedAt), lt(blogPosts.deletedAt, cutoff)))
      .returning();
    return results.length;
  }

  async countPostsEligibleForPurge(olderThanDays: number): Promise<number> {
    const cutoff = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000);
    const results = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(blogPosts)
      .where(and(isNotNull(blogPosts.deletedAt), lt(blogPosts.deletedAt, cutoff)));
    return results[0]?.count ?? 0;
  }
}

export const storage = new DbStorage();
