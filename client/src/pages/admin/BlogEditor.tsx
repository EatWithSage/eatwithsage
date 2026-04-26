import React, { useEffect, useRef, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Eye, Upload, X, ImageIcon } from "lucide-react";
import type { BlogPost } from "../../../../shared/schema";

function getToken(): string {
  return localStorage.getItem("sage_admin_token") || "";
}

async function adminFetch(url: string, options?: RequestInit): Promise<Response> {
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      ...(options?.headers || {}),
    },
  });
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const editorSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  coverImage: z.string().optional().refine(
    (val) => !val || val.startsWith("/") || /^https?:\/\//.test(val),
    "Must be a valid URL or uploaded image"
  ),
  author: z.string().min(1, "Author is required"),
  tags: z.string().optional(),
  status: z.enum(["draft", "published"]),
  postDate: z.string().optional(),
  publishedDate: z.string().optional(),
});

type EditorForm = z.infer<typeof editorSchema>;

export default function BlogEditor() {
  const [, navigate] = useLocation();
  const params = useParams<{ id?: string }>();
  const postId = params.id ? parseInt(params.id, 10) : undefined;
  const isEditing = !!postId;
  const [saveMsg, setSaveMsg] = useState("");

  useEffect(() => {
    document.title = isEditing ? "Edit Post - Sage Admin" : "New Post - Sage Admin";
    const token = localStorage.getItem("sage_admin_token");
    if (!token) {
      navigate("/admin");
    }
  }, [isEditing, navigate]);

  const { data: existingPost, isLoading: postLoading } = useQuery<BlogPost>({
    queryKey: ["/api/admin/posts", postId],
    queryFn: async () => {
      const res = await adminFetch(`/api/admin/posts`);
      const text = await res.text();
      if (!res.ok || !text) throw new Error(`Failed to load posts (${res.status})`);
      const posts: BlogPost[] = JSON.parse(text);
      const found = posts.find((p) => p.id === postId);
      if (!found) throw new Error("Post not found");
      return found;
    },
    enabled: isEditing,
  });

  const form = useForm<EditorForm>({
    resolver: zodResolver(editorSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "",
      author: "Sage",
      tags: "",
      status: "draft",
      postDate: "",
      publishedDate: "",
    },
  });

  const { watch, setValue, reset } = form;
  const titleValue = watch("title");
  const statusValue = watch("status");

  useEffect(() => {
    if (existingPost && isEditing) {
      reset({
        title: existingPost.title,
        slug: existingPost.slug,
        excerpt: existingPost.excerpt || "",
        content: existingPost.content || "",
        coverImage: existingPost.coverImage || "",
        author: existingPost.author,
        tags: existingPost.tags?.join(", ") || "",
        status: (existingPost.status as "draft" | "published") || "draft",
        postDate: existingPost.postDate || "",
        publishedDate: existingPost.publishedDate
          ? new Date(existingPost.publishedDate as unknown as string).toISOString().slice(0, 16)
          : "",
      });
    }
  }, [existingPost, isEditing, reset]);

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleImageUpload(file: File) {
    setIsUploading(true);
    setUploadError("");
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      });
      const rawText = await res.text();
      if (!rawText) throw new Error("Upload failed: empty response");
      const data = JSON.parse(rawText);
      if (!res.ok || !data.success) throw new Error(data.message || "Upload failed");
      setValue("coverImage", data.url);
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  }

  useEffect(() => {
    if (!isEditing && !slugManuallyEdited && titleValue) {
      setValue("slug", slugify(titleValue));
    }
  }, [titleValue, isEditing, slugManuallyEdited, setValue]);

  const saveMutation = useMutation({
    mutationFn: async (data: EditorForm) => {
      const tagsArray = data.tags
        ? data.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [];

      const payload = {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || null,
        content: data.content || null,
        coverImage: data.coverImage || null,
        author: data.author,
        tags: tagsArray,
        status: data.status,
        postDate: data.postDate || null,
        publishedDate: data.publishedDate ? new Date(data.publishedDate).toISOString() : null,
      };

      async function parseResponse(res: Response) {
        const text = await res.text();
        if (!text) throw new Error(`Server returned empty response (${res.status})`);
        let json: Record<string, unknown>;
        try { json = JSON.parse(text); } catch { throw new Error(`Unexpected server response (${res.status}): ${text.slice(0, 200)}`); }
        if (!res.ok) throw new Error((json.message as string) || `Request failed (${res.status})`);
        return json;
      }

      if (isEditing) {
        const res = await adminFetch(`/api/admin/posts/${postId}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
        return parseResponse(res);
      } else {
        const res = await adminFetch("/api/admin/posts", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        return parseResponse(res);
      }
    },
    onSuccess: (savedPost: BlogPost) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      setSaveMsg("Saved!");
      setTimeout(() => setSaveMsg(""), 3000);
      if (!isEditing) {
        navigate(`/admin/blog/${savedPost.id}/edit`);
      }
    },
    onError: (error: Error) => {
      setSaveMsg(`Error: ${error.message}`);
      setTimeout(() => setSaveMsg(""), 5000);
    },
  });

  function onSubmit(data: EditorForm) {
    saveMutation.mutate(data);
  }

  if (postLoading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <p className="text-gray-500">Loading post...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/blog">
              <Button variant="ghost" size="sm" className="gap-2 text-gray-600">
                <ArrowLeft className="h-4 w-4" />
                All Posts
              </Button>
            </Link>
            <span className="text-gray-300">|</span>
            <h1 className="text-base font-semibold text-gray-700">
              {isEditing ? "Edit Post" : "New Post"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {saveMsg && (
              <span className={`text-sm ${saveMsg.startsWith("Error") ? "text-red-500" : "text-green-600"}`}>
                {saveMsg}
              </span>
            )}
            {isEditing && existingPost?.status === "published" && (
              <Link href={`/blog/${existingPost.slug}`}>
                <Button variant="outline" size="sm" className="gap-2">
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
              </Link>
            )}
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={saveMutation.isPending}
              className="bg-forest-900 hover:bg-forest-800 text-white gap-2"
            >
              <Save className="h-4 w-4" />
              {saveMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
            <div>
              <Label htmlFor="title" className="text-gray-700 font-medium">Title *</Label>
              <Input
                id="title"
                {...form.register("title")}
                placeholder="Enter post title"
                className="mt-1 text-lg font-medium"
              />
              {form.formState.errors.title && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="slug" className="text-gray-700 font-medium">Slug *</Label>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-400 text-sm whitespace-nowrap">/blog/</span>
                <Input
                  id="slug"
                  {...form.register("slug")}
                  placeholder="post-slug"
                  onChange={(e) => {
                    setSlugManuallyEdited(true);
                    form.setValue("slug", e.target.value);
                  }}
                />
              </div>
              {form.formState.errors.slug && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.slug.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="excerpt" className="text-gray-700 font-medium">Excerpt</Label>
              <Textarea
                id="excerpt"
                {...form.register("excerpt")}
                placeholder="Short summary shown in post listings..."
                rows={3}
                className="mt-1"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <Label htmlFor="content" className="text-gray-700 font-medium block mb-2">
              Content <span className="text-gray-400 font-normal text-sm">(HTML supported)</span>
            </Label>
            <Textarea
              id="content"
              {...form.register("content")}
              placeholder="<p>Write your post content here. HTML tags are supported.</p>&#10;<h2>Section heading</h2>&#10;<p>More content...</p>"
              rows={20}
              className="mt-1 font-mono text-sm"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
            <h3 className="font-semibold text-forest-900">Post Settings</h3>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-700 font-medium">Status</Label>
                <p className="text-sm text-gray-500 mt-0.5">
                  {statusValue === "published" ? "Visible on the public blog" : "Hidden from public view"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Draft</span>
                <Switch
                  checked={statusValue === "published"}
                  onCheckedChange={(checked) => {
                    setValue("status", checked ? "published" : "draft");
                    if (checked && !form.getValues("publishedDate")) {
                      const now = new Date();
                      now.setSeconds(0, 0);
                      setValue("publishedDate", now.toISOString().slice(0, 16));
                    }
                  }}
                />
                <span className="text-sm text-gray-700 font-medium">Published</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="postDate" className="text-gray-700 font-medium">Post Date</Label>
                <Input
                  id="postDate"
                  type="date"
                  {...form.register("postDate")}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="publishedDate" className="text-gray-700 font-medium">
                  Published Date & Time <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="publishedDate"
                  type="datetime-local"
                  {...form.register("publishedDate")}
                  className="mt-1"
                />
                <p className="text-xs text-gray-400 mt-1">Required for post to appear publicly</p>
              </div>
            </div>

            <div>
              <Label htmlFor="author" className="text-gray-700 font-medium">Author</Label>
              <Input
                id="author"
                {...form.register("author")}
                placeholder="Sage"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="tags" className="text-gray-700 font-medium">Tags</Label>
              <Input
                id="tags"
                {...form.register("tags")}
                placeholder="meal planning, grocery retail, AI (comma-separated)"
                className="mt-1"
              />
              <p className="text-xs text-gray-400 mt-1">Separate multiple tags with commas</p>
            </div>

            <div>
              <Label className="text-gray-700 font-medium">Cover Image</Label>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                  e.target.value = "";
                }}
              />

              {/* Upload area */}
              {!watch("coverImage") ? (
                <div
                  className="mt-1 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-sage-400 hover:bg-sage-50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2 text-sage-600">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-sage-400 border-t-transparent" />
                      <p className="text-sm">Uploading...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <ImageIcon className="h-10 w-10" />
                      <p className="text-sm font-medium text-gray-600">Click to upload or drag & drop</p>
                      <p className="text-xs">JPG, PNG, WebP up to 5 MB</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-1 relative rounded-xl overflow-hidden border border-gray-200">
                  <img
                    src={watch("coverImage")}
                    alt="Cover preview"
                    className="w-full h-48 object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white shadow gap-1.5 text-xs"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      <Upload className="h-3 w-3" />
                      {isUploading ? "Uploading..." : "Replace"}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white shadow"
                      onClick={() => setValue("coverImage", "")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}

              {/* URL input as fallback */}
              <div className="mt-2">
                <Input
                  {...form.register("coverImage")}
                  placeholder="Or paste an image URL..."
                  className="text-sm text-gray-500"
                />
              </div>

              {uploadError && <p className="text-red-500 text-sm mt-1">{uploadError}</p>}
              {form.formState.errors.coverImage && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.coverImage.message}</p>
              )}
            </div>
          </div>

          <div className="pb-8">
            <Button
              type="submit"
              disabled={saveMutation.isPending}
              className="w-full bg-forest-900 hover:bg-forest-800 text-white py-3 text-base font-medium gap-2"
            >
              <Save className="h-5 w-5" />
              {saveMutation.isPending ? "Saving..." : isEditing ? "Save Changes" : "Create Post"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
