import express from "express";
import cors from "cors";
import { z } from "zod";
import { demoFormSchema, insertBlogPostSchema } from "../shared/schema";
import { storage } from "./storage";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
    res.json({ success: true, message: "Post deleted" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const port = parseInt(process.env.API_PORT || "3001", 10);
app.listen(port, "0.0.0.0", () => {
  console.log(`API server running on port ${port}`);
});
