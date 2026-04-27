import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("./db", () => ({
  pool: { query: vi.fn() },
  db: {},
}));

vi.mock("./migrate", () => ({
  runMigrations: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("./storage", () => ({
  storage: {
    getBlogPosts: vi.fn().mockResolvedValue([]),
    getPublishedBlogPosts: vi.fn().mockResolvedValue([]),
    getSoftDeletedBlogPosts: vi.fn().mockResolvedValue([]),
    getBlogPostById: vi.fn().mockResolvedValue(undefined),
    getBlogPostBySlug: vi.fn().mockResolvedValue(undefined),
    createBlogPost: vi.fn(),
    updateBlogPost: vi.fn(),
    deleteBlogPost: vi.fn(),
    restoreBlogPost: vi.fn(),
    permanentlyDeleteBlogPost: vi.fn(),
  },
}));

import request from "supertest";
import { pool } from "./db";
import { app } from "./api-server";

const mockQuery = pool.query as ReturnType<typeof vi.fn>;

describe("GET /api/health", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 200 with database connected when the pool query succeeds", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [{ "?column?": 1 }] });

    const res = await request(app).get("/api/health");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.database).toBe("connected");
    expect(res.body.version).toBe("2.0");
    expect(typeof res.body.timestamp).toBe("number");
  });

  it("returns 503 with database unreachable when the pool query throws", async () => {
    mockQuery.mockRejectedValueOnce(new Error("Connection refused"));

    const res = await request(app).get("/api/health");

    expect(res.status).toBe(503);
    expect(res.body.status).toBe("degraded");
    expect(res.body.database).toBe("unreachable");
    expect(res.body.version).toBe("2.0");
    expect(typeof res.body.timestamp).toBe("number");
  });
});
