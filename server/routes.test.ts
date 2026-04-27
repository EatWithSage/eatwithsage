import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

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
        (p) =>
          p.status === "published" &&
          p.publishedDate !== null &&
          p.publishedDate <= now &&
          p.deletedAt === null,
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
        (p) => p.deletedAt !== null && p.deletedAt < cutoff,
      ).length;
    }
  }

  return new MemStorage();
});

vi.mock("./storage", () => ({ storage: memStorage }));

import request from "supertest";
import { storage } from "./storage";
import { app } from "./api-server";

const ADMIN_PASSWORD = "test-admin-secret";
const AUTH = { Authorization: `Bearer ${ADMIN_PASSWORD}` };

// ---------------------------------------------------------------------------
// Shared setup
// ---------------------------------------------------------------------------
const originalPassword = process.env.ADMIN_PASSWORD;

beforeEach(() => {
  process.env.ADMIN_PASSWORD = ADMIN_PASSWORD;
  memStorage.reset();
});

afterEach(() => {
  process.env.ADMIN_PASSWORD = originalPassword;
});

// ---------------------------------------------------------------------------
// GET /api/posts
// ---------------------------------------------------------------------------
describe("GET /api/posts", () => {
  it("returns 200 with an empty array when there are no published posts", async () => {
    const res = await request(app).get("/api/posts");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(0);
  });

  it("returns only published posts whose publishedDate is in the past", async () => {
    const pastDate = new Date(Date.now() - 60_000);
    const futureDate = new Date(Date.now() + 60 * 60 * 1000);

    await storage.createBlogPost({
      title: "Published",
      slug: "published",
      author: "Alice",
      status: "published",
      publishedDate: pastDate,
    });
    await storage.createBlogPost({
      title: "Future",
      slug: "future",
      author: "Alice",
      status: "published",
      publishedDate: futureDate,
    });
    await storage.createBlogPost({
      title: "Draft",
      slug: "draft",
      author: "Alice",
      status: "draft",
    });

    const res = await request(app).get("/api/posts");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].slug).toBe("published");
  });

  it("does not include soft-deleted published posts", async () => {
    const post = await storage.createBlogPost({
      title: "To Delete",
      slug: "to-delete",
      author: "Alice",
      status: "published",
      publishedDate: new Date(Date.now() - 1000),
    });
    await storage.deleteBlogPost(post.id);

    const res = await request(app).get("/api/posts");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);
  });

  it("returns 500 when storage throws an unexpected error", async () => {
    vi.spyOn(memStorage, "getPublishedBlogPosts").mockRejectedValueOnce(new Error("DB down"));
    const res = await request(app).get("/api/posts");
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// GET /api/posts/:slug
// ---------------------------------------------------------------------------
describe("GET /api/posts/:slug", () => {
  it("returns 200 with the post when it exists, is published, and has a past publishedDate", async () => {
    await storage.createBlogPost({
      title: "Hello World",
      slug: "hello-world",
      author: "Bob",
      status: "published",
      publishedDate: new Date(Date.now() - 1000),
    });

    const res = await request(app).get("/api/posts/hello-world");
    expect(res.status).toBe(200);
    expect(res.body.slug).toBe("hello-world");
    expect(res.body.title).toBe("Hello World");
  });

  it("returns 404 when no post exists for the given slug", async () => {
    const res = await request(app).get("/api/posts/does-not-exist");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it("returns 404 for a draft post", async () => {
    await storage.createBlogPost({
      title: "My Draft",
      slug: "my-draft",
      author: "Bob",
      status: "draft",
    });

    const res = await request(app).get("/api/posts/my-draft");
    expect(res.status).toBe(404);
  });

  it("returns 404 for a published post with a future publishedDate", async () => {
    await storage.createBlogPost({
      title: "Scheduled",
      slug: "scheduled",
      author: "Bob",
      status: "published",
      publishedDate: new Date(Date.now() + 60 * 60 * 1000),
    });

    const res = await request(app).get("/api/posts/scheduled");
    expect(res.status).toBe(404);
  });

  it("returns 404 for a published post with no publishedDate set", async () => {
    await storage.createBlogPost({
      title: "No Date",
      slug: "no-date",
      author: "Bob",
      status: "published",
      publishedDate: null,
    });

    const res = await request(app).get("/api/posts/no-date");
    expect(res.status).toBe(404);
  });

  it("returns 500 when storage throws an unexpected error", async () => {
    vi.spyOn(memStorage, "getBlogPostBySlug").mockRejectedValueOnce(new Error("Storage failure"));
    const res = await request(app).get("/api/posts/any-slug");
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// POST /api/admin/posts
// ---------------------------------------------------------------------------
describe("POST /api/admin/posts", () => {
  describe("authentication", () => {
    it("returns 401 when no Authorization header is provided", async () => {
      const res = await request(app)
        .post("/api/admin/posts")
        .send({ title: "Test", slug: "test" });
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it("returns 401 when an incorrect password is provided", async () => {
      const res = await request(app)
        .post("/api/admin/posts")
        .set("Authorization", "Bearer wrong")
        .send({ title: "Test", slug: "test" });
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  it("creates a post and returns 201 with the new post", async () => {
    const res = await request(app).post("/api/admin/posts").set(AUTH).send({
      title: "New Post",
      slug: "new-post",
      author: "Alice",
      status: "draft",
    });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("New Post");
    expect(res.body.slug).toBe("new-post");
    expect(res.body.id).toBeDefined();
  });

  it("returns 400 when required fields are missing", async () => {
    const res = await request(app)
      .post("/api/admin/posts")
      .set(AUTH)
      .send({ excerpt: "no title or slug" });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("returns 400 when slug is missing from the body", async () => {
    const res = await request(app)
      .post("/api/admin/posts")
      .set(AUTH)
      .send({ title: "No Slug Here" });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/Invalid post data/i);
  });

  it("returns 500 when storage throws an unexpected error", async () => {
    vi.spyOn(memStorage, "createBlogPost").mockRejectedValueOnce(new Error("DB write failure"));
    const res = await request(app)
      .post("/api/admin/posts")
      .set(AUTH)
      .send({ title: "Fail Post", slug: "fail-post" });
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// PATCH /api/admin/posts/:id
// ---------------------------------------------------------------------------
describe("PATCH /api/admin/posts/:id", () => {
  describe("authentication", () => {
    it("returns 401 when no Authorization header is provided", async () => {
      const res = await request(app).patch("/api/admin/posts/1").send({ title: "Updated" });
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it("returns 401 when an incorrect password is provided", async () => {
      const res = await request(app)
        .patch("/api/admin/posts/1")
        .set("Authorization", "Bearer bad-password")
        .send({ title: "Updated" });
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  it("returns 400 when the id is not a valid integer", async () => {
    const res = await request(app)
      .patch("/api/admin/posts/not-a-number")
      .set(AUTH)
      .send({ title: "Updated" });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/Invalid post ID/i);
  });

  it("returns 404 when the post does not exist", async () => {
    const res = await request(app)
      .patch("/api/admin/posts/9999")
      .set(AUTH)
      .send({ title: "Ghost" });
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it("updates a post and returns the updated data", async () => {
    const created = await storage.createBlogPost({
      title: "Original Title",
      slug: "original-slug",
      author: "Alice",
      status: "draft",
    });

    const res = await request(app)
      .patch(`/api/admin/posts/${created.id}`)
      .set(AUTH)
      .send({ title: "Updated Title", status: "published" });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Updated Title");
    expect(res.body.status).toBe("published");
    expect(res.body.slug).toBe("original-slug");
  });

  it("returns 500 when storage throws an unexpected error", async () => {
    const created = await storage.createBlogPost({
      title: "Error Post",
      slug: "error-post",
      author: "Alice",
      status: "draft",
    });

    vi.spyOn(memStorage, "updateBlogPost").mockRejectedValueOnce(new Error("DB failure"));
    const res = await request(app)
      .patch(`/api/admin/posts/${created.id}`)
      .set(AUTH)
      .send({ title: "Crash" });
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// DELETE /api/admin/posts/:id  (soft-delete)
// ---------------------------------------------------------------------------
describe("DELETE /api/admin/posts/:id", () => {
  describe("authentication", () => {
    it("returns 401 when no Authorization header is provided", async () => {
      const res = await request(app).delete("/api/admin/posts/1");
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it("returns 401 when an incorrect password is provided", async () => {
      const res = await request(app)
        .delete("/api/admin/posts/1")
        .set("Authorization", "Bearer wrong");
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  it("returns 400 when the id is not a valid integer", async () => {
    const res = await request(app).delete("/api/admin/posts/abc").set(AUTH);
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/Invalid post ID/i);
  });

  it("returns 404 when the post does not exist", async () => {
    const res = await request(app).delete("/api/admin/posts/9999").set(AUTH);
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it("soft-deletes a post and returns success", async () => {
    const created = await storage.createBlogPost({
      title: "To Be Deleted",
      slug: "to-be-deleted",
      author: "Alice",
      status: "draft",
    });

    const res = await request(app).delete(`/api/admin/posts/${created.id}`).set(AUTH);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("returns 404 when trying to delete an already soft-deleted post", async () => {
    const created = await storage.createBlogPost({
      title: "Already Gone",
      slug: "already-gone",
      author: "Alice",
      status: "draft",
    });
    await storage.deleteBlogPost(created.id);

    const res = await request(app).delete(`/api/admin/posts/${created.id}`).set(AUTH);
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it("returns 500 when storage throws an unexpected error", async () => {
    const created = await storage.createBlogPost({
      title: "Crash Delete",
      slug: "crash-delete",
      author: "Alice",
      status: "draft",
    });

    vi.spyOn(memStorage, "deleteBlogPost").mockRejectedValueOnce(new Error("DB failure"));
    const res = await request(app).delete(`/api/admin/posts/${created.id}`).set(AUTH);
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// GET /api/admin/posts  (list all non-deleted posts)
// ---------------------------------------------------------------------------
describe("GET /api/admin/posts", () => {
  describe("authentication", () => {
    it("returns 401 when no Authorization header is provided", async () => {
      const res = await request(app).get("/api/admin/posts");
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it("returns 401 when an incorrect password is provided", async () => {
      const res = await request(app)
        .get("/api/admin/posts")
        .set("Authorization", "Bearer wrong");
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  it("returns 200 with an empty array when there are no posts", async () => {
    const res = await request(app).get("/api/admin/posts").set(AUTH);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(0);
  });

  it("returns all non-deleted posts including drafts", async () => {
    await storage.createBlogPost({ title: "Draft", slug: "draft-a", author: "Alice", status: "draft" });
    await storage.createBlogPost({
      title: "Published",
      slug: "pub-a",
      author: "Alice",
      status: "published",
      publishedDate: new Date(Date.now() - 1000),
    });

    const res = await request(app).get("/api/admin/posts").set(AUTH);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it("does not include soft-deleted posts", async () => {
    const post = await storage.createBlogPost({ title: "Soon Gone", slug: "soon-gone", author: "Alice", status: "draft" });
    await storage.deleteBlogPost(post.id);

    const res = await request(app).get("/api/admin/posts").set(AUTH);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);
  });

  it("returns 500 when storage throws an unexpected error", async () => {
    vi.spyOn(memStorage, "getBlogPosts").mockRejectedValueOnce(new Error("DB failure"));
    const res = await request(app).get("/api/admin/posts").set(AUTH);
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});
