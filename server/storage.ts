import { db } from "./db";
import { blogPosts, type BlogPost, type InsertBlogPost } from "@shared/schema";
import { eq, desc, and, lte, isNull, or } from "drizzle-orm";

export interface IStorage {
  getBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
}

export class DbStorage implements IStorage {
  async getBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return db
      .select()
      .from(blogPosts)
      .where(
        and(
          eq(blogPosts.status, "published"),
          or(
            isNull(blogPosts.publishedDate),
            lte(blogPosts.publishedDate, new Date())
          )
        )
      )
      .orderBy(desc(blogPosts.publishedDate));
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const results = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return results[0];
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const results = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
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
      .where(eq(blogPosts.id, id))
      .returning();
    return results[0];
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const results = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    return results.length > 0;
  }
}

export const storage = new DbStorage();
