import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { demoFormSchema, insertBlogPostSchema } from "../shared/schema.js";
import { sendEmail, createDemoEmailHTML } from "./services/email.js";
import { storage } from "./storage.js";

function requireAdmin(req: Request, res: Response, next: NextFunction) {
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

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/email-demo", async (req, res) => {
    try {
      const validatedData = demoFormSchema.parse(req.body);
      console.log("Demo form submission received:", validatedData);
      const emailHTML = createDemoEmailHTML(
        validatedData.firstName,
        validatedData.lastName,
        validatedData.email
      );
      const emailSent = await sendEmail({
        to: "dave@eatwithsage.com",
        bcc: "davidmillikenco@gmail.com",
        subject: `New Demo Request from ${validatedData.firstName} ${validatedData.lastName}`,
        html: emailHTML
      });
      if (!emailSent) {
        throw new Error("Failed to send email");
      }
      res.json({ success: true, message: "Demo request submitted successfully" });
    } catch (error) {
      console.error("Demo form submission error:", error);
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
      console.error("Error fetching published posts:", error);
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
        (post.publishedDate && post.publishedDate > now)
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
      console.error("Error creating post:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid post data", errors: error.errors });
      } else {
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
      console.error("Error updating post:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid post data", errors: error.errors });
      } else {
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
      const posts = await storage.getBlogPosts();
      const dateStr = new Date().toISOString().slice(0, 10);
      const format = req.query.format;

      if (format === "csv") {
        const headers = ["id", "title", "slug", "status", "author", "tags", "publishedDate", "createdAt"];
        const escape = (val: unknown): string => {
          if (val === null || val === undefined) return "";
          const str = Array.isArray(val) ? val.join(";") : String(val);
          if (str.includes(",") || str.includes('"') || str.includes("\n")) {
            return `"${str.replace(/"/g, '""')}"`;
          }
          return str;
        };
        const rows = posts.map((p) => [
          escape(p.id),
          escape(p.title),
          escape(p.slug),
          escape(p.status),
          escape(p.author),
          escape(p.tags),
          escape(p.publishedDate),
          escape(p.createdAt),
        ].join(","));
        const csv = [headers.join(","), ...rows].join("\n");
        const filename = `blog-posts-export-${dateStr}.csv`;
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        res.setHeader("Content-Type", "text/csv");
        res.send(csv);
      } else {
        const filename = `blog-posts-export-${dateStr}.json`;
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(posts, null, 2));
      }
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

  const httpServer = createServer(app);
  return httpServer;
}
