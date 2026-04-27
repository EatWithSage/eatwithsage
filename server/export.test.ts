import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import type { BlogPost } from "@shared/schema";

vi.mock("./db", () => ({
  pool: { query: vi.fn() },
  db: {},
}));

vi.mock("./migrate", () => ({
  runMigrations: vi.fn().mockResolvedValue(undefined),
}));

const memStorage = vi.hoisted(() => {
  type Post = {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string | null;
    coverImage: string | null;
    author: string;
    tags: string[];
    status: string;
    postDate: string | null;
    publishedDate: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
  };

  type InsertPost = Partial<Post> & { title: string; slug: string; author?: string; status?: string };

  class MemStorage {
    private posts = new Map<number, Post>();
    private nextId = 1;

    reset() {
      this.posts = new Map();
      this.nextId = 1;
    }

    async getBlogPosts(): Promise<Post[]> {
      return Array.from(this.posts.values())
        .filter((p) => p.deletedAt === null)
        .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0));
    }

    async getPublishedBlogPosts(): Promise<Post[]> {
      const now = new Date();
      return Array.from(this.posts.values()).filter(
        (p) => p.status === "published" && p.publishedDate !== null && p.publishedDate <= now && p.deletedAt === null
      );
    }

    async getSoftDeletedBlogPosts(): Promise<Post[]> {
      return Array.from(this.posts.values()).filter((p) => p.deletedAt !== null);
    }

    async getBlogPostById(id: number): Promise<Post | undefined> {
      const post = this.posts.get(id);
      return post?.deletedAt === null ? post : undefined;
    }

    async getBlogPostBySlug(slug: string): Promise<Post | undefined> {
      return Array.from(this.posts.values()).find((p) => p.slug === slug && p.deletedAt === null);
    }

    async createBlogPost(post: InsertPost): Promise<Post> {
      const now = new Date();
      const created: Post = {
        id: this.nextId++,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt ?? null,
        content: post.content ?? null,
        coverImage: post.coverImage ?? null,
        author: post.author ?? "Sage",
        tags: post.tags ?? [],
        status: post.status ?? "draft",
        postDate: post.postDate ?? null,
        publishedDate: post.publishedDate ?? null,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      };
      this.posts.set(created.id, created);
      return created;
    }

    async updateBlogPost(id: number, post: Partial<InsertPost>): Promise<Post | undefined> {
      const existing = this.posts.get(id);
      if (!existing || existing.deletedAt !== null) return undefined;
      const updated = { ...existing, ...post, updatedAt: new Date() };
      this.posts.set(id, updated);
      return updated;
    }

    async deleteBlogPost(id: number): Promise<boolean> {
      const existing = this.posts.get(id);
      if (!existing || existing.deletedAt !== null) return false;
      this.posts.set(id, { ...existing, deletedAt: new Date(), updatedAt: new Date() });
      return true;
    }

    async restoreBlogPost(id: number): Promise<Post | undefined> {
      const existing = this.posts.get(id);
      if (!existing || existing.deletedAt === null) return undefined;
      const restored = { ...existing, deletedAt: null, updatedAt: new Date() };
      this.posts.set(id, restored);
      return restored;
    }

    async permanentlyDeleteBlogPost(id: number): Promise<boolean> {
      const existing = this.posts.get(id);
      if (!existing || existing.deletedAt === null) return false;
      this.posts.delete(id);
      return true;
    }

    async purgeOldDeletedPosts(olderThanDays: number): Promise<number> {
      const cutoff = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000);
      let count = 0;
      for (const [id, post] of this.posts) {
        if (post.deletedAt !== null && post.deletedAt < cutoff) {
          this.posts.delete(id);
          count++;
        }
      }
      return count;
    }

    async countPostsEligibleForPurge(olderThanDays: number): Promise<number> {
      const cutoff = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000);
      return Array.from(this.posts.values()).filter(
        (p) => p.deletedAt !== null && p.deletedAt < cutoff
      ).length;
    }
  }

  return new MemStorage();
});

vi.mock("./storage", () => ({ storage: memStorage }));

import request from "supertest";
import { storage } from "./storage";
import { app } from "./api-server";

const ADMIN_PASSWORD = "test-admin-password";
const AUTH = { Authorization: `Bearer ${ADMIN_PASSWORD}` };

describe("GET /api/admin/posts/export", () => {
  const originalPassword = process.env.ADMIN_PASSWORD;

  beforeEach(() => {
    process.env.ADMIN_PASSWORD = ADMIN_PASSWORD;
    memStorage.reset();
  });

  afterEach(() => {
    process.env.ADMIN_PASSWORD = originalPassword;
  });

  describe("authentication", () => {
    it("returns 401 when no Authorization header is provided", async () => {
      const res = await request(app).get("/api/admin/posts/export");
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it("returns 401 when an incorrect password is provided", async () => {
      const res = await request(app)
        .get("/api/admin/posts/export")
        .set("Authorization", "Bearer wrong-password");
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe("JSON export (default)", () => {
    it("returns 200 with application/json content type", async () => {
      await storage.createBlogPost({ title: "Hello", slug: "hello", author: "Sage", status: "draft" });
      const res = await request(app).get("/api/admin/posts/export").set(AUTH);
      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toMatch(/application\/json/);
    });

    it("sets Content-Disposition with a dated .json filename", async () => {
      const res = await request(app).get("/api/admin/posts/export").set(AUTH);
      const disposition = res.headers["content-disposition"] as string;
      expect(disposition).toMatch(/attachment/);
      expect(disposition).toMatch(/filename="blog-posts-all-export-\d{4}-\d{2}-\d{2}\.json"/);
    });

    it("returns an empty array when there are no posts", async () => {
      const res = await request(app).get("/api/admin/posts/export").set(AUTH);
      expect(res.status).toBe(200);
      const body = JSON.parse(res.text);
      expect(Array.isArray(body)).toBe(true);
      expect(body).toHaveLength(0);
    });

    it("exports a draft post with all schema fields at correct values", async () => {
      const created = await storage.createBlogPost({
        title: "My Draft",
        slug: "my-draft",
        author: "Alice",
        status: "draft",
        excerpt: "A short intro",
        content: "Full body text",
        tags: [],
        coverImage: null,
        postDate: null,
        publishedDate: null,
      });

      const res = await request(app).get("/api/admin/posts/export").set(AUTH);
      const posts = JSON.parse(res.text);
      expect(posts).toHaveLength(1);
      const post = posts[0];

      expect(post.id).toBe(created.id);
      expect(post.title).toBe("My Draft");
      expect(post.slug).toBe("my-draft");
      expect(post.excerpt).toBe("A short intro");
      expect(post.content).toBe("Full body text");
      expect(post.coverImage).toBeNull();
      expect(post.author).toBe("Alice");
      expect(post.tags).toEqual([]);
      expect(post.status).toBe("draft");
      expect(post.postDate).toBeNull();
      expect(post.publishedDate).toBeNull();
      expect(new Date(post.createdAt).getTime()).toBeCloseTo((created.createdAt as Date).getTime(), -3);
      expect(new Date(post.updatedAt).getTime()).toBeCloseTo((created.updatedAt as Date).getTime(), -3);
      expect(post.deletedAt).toBeNull();
    });

    it("exports a published post with tags, coverImage, postDate, and publishedDate", async () => {
      const pubDate = new Date("2025-03-15T12:00:00Z");
      const created = await storage.createBlogPost({
        title: "Published Article",
        slug: "published-article",
        author: "Bob",
        status: "published",
        excerpt: "Pub excerpt",
        content: "Pub body",
        tags: ["javascript", "typescript", "testing"],
        coverImage: "https://example.com/cover.jpg",
        postDate: "2025-03-15",
        publishedDate: pubDate,
      });

      const res = await request(app).get("/api/admin/posts/export").set(AUTH);
      const posts = JSON.parse(res.text);
      expect(posts).toHaveLength(1);
      const post = posts[0];

      expect(post.id).toBe(created.id);
      expect(post.title).toBe("Published Article");
      expect(post.slug).toBe("published-article");
      expect(post.author).toBe("Bob");
      expect(post.status).toBe("published");
      expect(post.tags).toEqual(["javascript", "typescript", "testing"]);
      expect(post.coverImage).toBe("https://example.com/cover.jpg");
      expect(post.postDate).toBe("2025-03-15");
      expect(new Date(post.publishedDate).toISOString()).toBe(pubDate.toISOString());
      expect(new Date(post.createdAt).getTime()).toBeCloseTo((created.createdAt as Date).getTime(), -3);
      expect(new Date(post.updatedAt).getTime()).toBeCloseTo((created.updatedAt as Date).getTime(), -3);
      expect(typeof post.createdAt).toBe("string");
      expect(typeof post.updatedAt).toBe("string");
      expect(typeof post.publishedDate).toBe("string");
      expect(post.deletedAt).toBeNull();
    });

    it("exports all posts with varied statuses and asserts all schema fields are present", async () => {
      await storage.createBlogPost({ title: "Draft Post", slug: "draft-post", author: "Alice", status: "draft" });
      await storage.createBlogPost({
        title: "Published Post", slug: "published-post", author: "Bob", status: "published",
        tags: ["tag1"], publishedDate: new Date("2025-01-10T00:00:00Z"),
      });
      await storage.createBlogPost({ title: "Archived Post", slug: "archived-post", author: "Sage", status: "archived", tags: ["archive"] });

      const res = await request(app).get("/api/admin/posts/export").set(AUTH);
      const posts = JSON.parse(res.text);
      expect(posts).toHaveLength(3);

      const requiredFields: (keyof BlogPost)[] = [
        "id", "title", "slug", "excerpt", "content", "coverImage",
        "author", "tags", "status", "postDate", "publishedDate",
        "createdAt", "updatedAt", "deletedAt",
      ];

      for (const post of posts) {
        for (const field of requiredFields) {
          expect(post, `post is missing field: ${field}`).toHaveProperty(field as string);
        }
      }

      const statuses = posts.map((p: BlogPost) => p.status);
      expect(statuses).toContain("draft");
      expect(statuses).toContain("published");
      expect(statuses).toContain("archived");
    });

    it("includes soft-deleted posts in the export with a non-null deletedAt field", async () => {
      const live = await storage.createBlogPost({ title: "Live Post", slug: "live-post", author: "Sage", status: "published" });
      const toDelete = await storage.createBlogPost({ title: "Deleted Post", slug: "deleted-post", author: "Sage", status: "draft" });
      await storage.deleteBlogPost(toDelete.id);

      const res = await request(app).get("/api/admin/posts/export").set(AUTH);
      const posts = JSON.parse(res.text);
      expect(posts).toHaveLength(2);
      const titles = posts.map((p: { title: string }) => p.title);
      expect(titles).toContain("Live Post");
      expect(titles).toContain("Deleted Post");
      const deleted = posts.find((p: { title: string }) => p.title === "Deleted Post");
      expect(deleted.deletedAt).not.toBeNull();
      const livePost = posts.find((p: { title: string; id: number }) => p.id === live.id);
      expect(livePost.deletedAt).toBeNull();
    });

    it("returns 500 when storage throws an unexpected error", async () => {
      vi.spyOn(memStorage, "getBlogPosts").mockRejectedValueOnce(new Error("DB connection lost"));
      const res = await request(app).get("/api/admin/posts/export").set(AUTH);
      expect(res.status).toBe(500);
      expect(res.body.success).toBe(false);
    });
  });
});
