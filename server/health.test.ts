import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

const { mockPing } = vi.hoisted(() => ({ mockPing: vi.fn() }));

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

vi.mock("cloudinary", () => ({
  v2: {
    config: vi.fn(),
    api: { ping: mockPing },
    uploader: { upload_stream: vi.fn() },
  },
}));

import request from "supertest";
import { pool } from "./db";
import { app } from "./api-server";

const mockQuery = pool.query as ReturnType<typeof vi.fn>;

describe("GET /api/health", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = {
      ...originalEnv,
      CLOUDINARY_CLOUD_NAME: "test-cloud",
      CLOUDINARY_API_KEY: "test-key",
      CLOUDINARY_API_SECRET: "test-secret",
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns 200 with database and cloudinary connected when both succeed", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [{ "?column?": 1 }] });
    mockPing.mockResolvedValueOnce({ status: "ok" });

    const res = await request(app).get("/api/health");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.database).toBe("connected");
    expect(res.body.cloudinary).toBe("connected");
    expect(res.body.version).toBe("2.0");
    expect(typeof res.body.timestamp).toBe("number");
  });

  it("returns 503 with database unreachable when the pool query throws", async () => {
    mockQuery.mockRejectedValueOnce(new Error("Connection refused"));
    mockPing.mockResolvedValueOnce({ status: "ok" });

    const res = await request(app).get("/api/health");

    expect(res.status).toBe(503);
    expect(res.body.status).toBe("degraded");
    expect(res.body.database).toBe("unreachable");
    expect(res.body.cloudinary).toBe("connected");
    expect(res.body.version).toBe("2.0");
    expect(typeof res.body.timestamp).toBe("number");
  });

  it("returns 503 with cloudinary unreachable when ping fails", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [{ "?column?": 1 }] });
    mockPing.mockRejectedValueOnce(new Error("Cloudinary API error"));

    const res = await request(app).get("/api/health");

    expect(res.status).toBe(503);
    expect(res.body.status).toBe("degraded");
    expect(res.body.database).toBe("connected");
    expect(res.body.cloudinary).toBe("unreachable");
  });

  it("returns 503 with cloudinary unconfigured when env vars are missing", async () => {
    delete process.env.CLOUDINARY_CLOUD_NAME;
    delete process.env.CLOUDINARY_API_KEY;
    delete process.env.CLOUDINARY_API_SECRET;

    mockQuery.mockResolvedValueOnce({ rows: [{ "?column?": 1 }] });

    const res = await request(app).get("/api/health");

    expect(res.status).toBe(503);
    expect(res.body.status).toBe("degraded");
    expect(res.body.database).toBe("connected");
    expect(res.body.cloudinary).toBe("unconfigured");
    expect(mockPing).not.toHaveBeenCalled();
  });
});
