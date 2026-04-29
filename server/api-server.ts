import express from "express";
import cors from "cors";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { demoFormSchema, insertBlogPostSchema } from "../shared/schema.js";
import { storage } from "./storage.js";
import { pool } from "./db.js";
import { runMigrations } from "./migrate.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const CLEANUP_INTERVAL_MS = 24 * 60 * 60 * 1000;

function parseRetentionDays(raw: string | undefined): number {
  const parsed = parseInt(raw ?? "30", 10);
  if (isNaN(parsed) || parsed < 1 || parsed > 3650) return 30;
  return parsed;
}

const cleanupState = {
  retentionDays: parseRetentionDays(process.env.TRASH_RETENTION_DAYS),
  lastRunAt: null as Date | null,
  nextRunAt: null as Date | null,
  lastPurgedCount: 0,
};

async function runCleanup() {
  cleanupState.nextRunAt = new Date(Date.now() + CLEANUP_INTERVAL_MS);
  try {
    const count = await storage.purgeOldDeletedPosts(cleanupState.retentionDays);
    cleanupState.lastRunAt = new Date();
    cleanupState.lastPurgedCount = count;
    if (count > 0) {
      console.log(`Trash cleanup: permanently removed ${count} post(s) older than ${cleanupState.retentionDays} days`);
    }
  } catch (err) {
    console.error("Trash cleanup failed:", err);
  }
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false, limit: "5mb" }));

app.get("/api/health", async (_req, res) => {
  const timestamp = Date.now();
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", version: "2.0", timestamp, database: "connected" });
  } catch (err) {
    console.error("Health check: database unreachable", err);
    res.status(503).json({
      status: "degraded",
      version: "2.0",
      timestamp,
      database: "unreachable",
    });
  }
});

app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (req.path.startsWith("/api")) {
      console.log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
    }
  });
  next();
});

function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return res.status(500).json({ success: false, message: "ADMIN_PASSWORD not configured" });
  }
  if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  next();
}

app.post("/api/email-demo", async (req, res) => {
  try {
    const validatedData = demoFormSchema.parse(req.body);
    console.log("Demo form submission received:", validatedData);
    res.json({ success: true, message: "Demo request submitted successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, message: "Invalid form data", errors: error.errors });
    } else {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
});

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await storage.getPublishedBlogPosts();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/api/posts/:slug", async (req, res) => {
  try {
    const post = await storage.getBlogPostBySlug(req.params.slug);
    const now = new Date();
    if (
      !post ||
      post.status !== "published" ||
      !post.publishedDate ||
      new Date(post.publishedDate) > now
    ) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/api/admin/posts", requireAdmin, async (req, res) => {
  try {
    const posts = await storage.getBlogPosts();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching admin posts:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/api/admin/posts", requireAdmin, async (req, res) => {
  try {
    const validatedData = insertBlogPostSchema.parse(req.body);
    const post = await storage.createBlogPost(validatedData);
    res.status(201).json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, message: "Invalid post data", errors: error.errors });
    } else {
      console.error("Error creating post:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
});

app.patch("/api/admin/posts/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid post ID" });
    }
    const partial = insertBlogPostSchema.partial().parse(req.body);
    const post = await storage.updateBlogPost(id, partial);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, message: "Invalid post data", errors: error.errors });
    } else {
      console.error("Error updating post:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
});

app.delete("/api/admin/posts/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid post ID" });
    }
    const deleted = await storage.deleteBlogPost(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.json({ success: true, message: "Post soft-deleted" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/api/admin/posts/export", requireAdmin, async (req, res) => {
  try {
    const [activePosts, deletedPosts] = await Promise.all([
      storage.getBlogPosts(),
      storage.getSoftDeletedBlogPosts(),
    ]);
    const allPosts = [...activePosts, ...deletedPosts];
    const filename = `blog-posts-all-export-${new Date().toISOString().slice(0, 10)}.json`;
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(allPosts, null, 2));
  } catch (error) {
    console.error("Error exporting posts:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/api/admin/posts/deleted", requireAdmin, async (req, res) => {
  try {
    const posts = await storage.getSoftDeletedBlogPosts();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching deleted posts:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/api/admin/posts/:id/restore", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid post ID" });
    }
    const post = await storage.restoreBlogPost(id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Deleted post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error restoring post:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.delete("/api/admin/posts/:id/permanent", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid post ID" });
    }
    const deleted = await storage.permanentlyDeleteBlogPost(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Deleted post not found" });
    }
    res.json({ success: true, message: "Post permanently deleted" });
  } catch (error) {
    console.error("Error permanently deleting post:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/api/admin/trash/cleanup-status", requireAdmin, async (req, res) => {
  try {
    const eligibleCount = await storage.countPostsEligibleForPurge(cleanupState.retentionDays);
    res.json({
      retentionDays: cleanupState.retentionDays,
      eligibleForPurge: eligibleCount,
      lastRunAt: cleanupState.lastRunAt,
      nextRunAt: cleanupState.nextRunAt,
      lastPurgedCount: cleanupState.lastPurgedCount,
    });
  } catch (error) {
    console.error("Error fetching cleanup status:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/api/admin/trash/cleanup", requireAdmin, async (req, res) => {
  cleanupState.nextRunAt = new Date(Date.now() + CLEANUP_INTERVAL_MS);
  try {
    const count = await storage.purgeOldDeletedPosts(cleanupState.retentionDays);
    cleanupState.lastRunAt = new Date();
    cleanupState.lastPurgedCount = count;
    res.json({ success: true, purgedCount: count, retentionDays: cleanupState.retentionDays });
  } catch (error) {
    console.error("Error running cleanup:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


app.post("/api/admin/upload", requireAdmin, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No image file provided" });
  }
  const stream = cloudinary.uploader.upload_stream(
    { folder: "sage-blog", resource_type: "image", transformation: [] },
    (error, result) => {
      if (error || !result) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({ success: false, message: "Image upload failed" });
      }
      res.json({ success: true, url: result.secure_url });
    }
  );
  stream.end(req.file.buffer);
});

if (process.env.NODE_ENV === "production" && !process.env.VERCEL) {
  const distDir = path.resolve(process.cwd(), "dist");
  if (fs.existsSync(distDir)) {
    app.use(express.static(distDir, { index: false }));
    app.get("*", (_req, res) => {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.sendFile(path.join(distDir, "index.html"));
    });
  }
}

export { app };

const isProduction = process.env.NODE_ENV === "production";
const port = isProduction
  ? parseInt(process.env.PORT || "5000", 10)
  : parseInt(process.env.API_PORT || "3001", 10);

async function start() {
  try {
    await runMigrations();
  } catch (err) {
    console.error("Failed to run migrations. Server will not start.", err);
    process.exit(1);
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`API server running on port ${port} (${isProduction ? "production" : "development"})`);
    runCleanup();
    setInterval(runCleanup, CLEANUP_INTERVAL_MS);
    console.log(`Trash cleanup scheduled every 24h (retention: ${cleanupState.retentionDays} days)`);
  });
}

if (process.env.NODE_ENV !== "test" && !process.env.VERCEL) {
  start();
}
