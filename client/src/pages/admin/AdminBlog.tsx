import React, { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash2, LogOut, Eye, Download, Database } from "lucide-react";
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

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

interface HealthData {
  status: "ok" | "degraded";
  version: string;
  timestamp: number;
  database: "connected" | "unreachable";
}

function DatabaseHealthBadge() {
  const { data, isLoading, isError } = useQuery<HealthData>({
    queryKey: ["/api/health"],
    queryFn: async () => {
      const res = await fetch("/api/health");
      const json = await res.json();
      return json as HealthData;
    },
    refetchInterval: 30000,
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">
        <Database className="h-3 w-3" />
        <span>Checking…</span>
      </div>
    );
  }

  const isHealthy = !isError && data?.database === "connected";

  return (
    <div
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
        isHealthy
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
      title={isHealthy ? "Database connected" : "Database unreachable"}
    >
      <Database className="h-3 w-3" />
      <span className="relative flex h-2 w-2">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            isHealthy ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            isHealthy ? "bg-green-500" : "bg-red-500"
          }`}
        />
      </span>
      <span>{isHealthy ? "DB Connected" : "DB Unreachable"}</span>
    </div>
  );
}

export default function AdminBlog() {
  const [, navigate] = useLocation();

  useEffect(() => {
    document.title = "Blog Admin - Sage";
    const token = localStorage.getItem("sage_admin_token");
    if (!token) {
      navigate("/admin");
    }
  }, [navigate]);

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/posts"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/posts");
      if (res.status === 401) {
        localStorage.removeItem("sage_admin_token");
        navigate("/admin");
        throw new Error("Unauthorized");
      }
      const text = await res.text();
      if (!res.ok) throw new Error(`Failed to fetch posts (${res.status}): ${text}`);
      if (!text) return [] as BlogPost[];
      return JSON.parse(text) as BlogPost[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await adminFetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      const text = await res.text();
      if (!res.ok) throw new Error(`Failed to delete post (${res.status}): ${text}`);
      return text ? JSON.parse(text) : { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
    },
  });

  function handleLogout() {
    localStorage.removeItem("sage_admin_token");
    navigate("/admin");
  }

  async function handleExport() {
    const res = await adminFetch("/api/admin/posts/export");
    if (!res.ok) {
      alert("Export failed. Please try again.");
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const disposition = res.headers.get("Content-Disposition") || "";
    const match = disposition.match(/filename="([^"]+)"/);
    a.download = match ? match[1] : "blog-posts-export.json";
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleDelete(post: BlogPost) {
    if (window.confirm(`Delete "${post.title}"? This cannot be undone.`)) {
      deleteMutation.mutate(post.id);
    }
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <span className="text-xl font-bold text-forest-900 font-recoleta cursor-pointer">Sage</span>
            </Link>
            <span className="text-gray-300">|</span>
            <h1 className="text-lg font-semibold text-gray-700">Blog Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <DatabaseHealthBadge />
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="gap-2 text-gray-600">
                <Eye className="h-4 w-4" />
                View Blog
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleExport} className="gap-2 text-gray-600">
              <Download className="h-4 w-4" />
              Export JSON
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-gray-600">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-forest-900 font-recoleta">All Posts</h2>
            <p className="text-gray-500 text-sm mt-1">{posts?.length ?? 0} posts total</p>
          </div>
          <Link href="/admin/blog/new">
            <Button className="bg-forest-900 hover:bg-forest-800 text-white gap-2">
              <PlusCircle className="h-4 w-4" />
              New Post
            </Button>
          </Link>
        </div>

        {isLoading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && posts && posts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">No posts yet.</p>
            <Link href="/admin/blog/new">
              <Button className="bg-forest-900 hover:bg-forest-800 text-white gap-2">
                <PlusCircle className="h-4 w-4" />
                Create your first post
              </Button>
            </Link>
          </div>
        )}

        {!isLoading && posts && posts.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Published</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Author</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-forest-900 text-sm line-clamp-1">{post.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">/blog/{post.slug}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <Badge
                        variant={post.status === "published" ? "default" : "secondary"}
                        className={post.status === "published"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-gray-100 text-gray-600 border-gray-200"}
                      >
                        {post.status === "published" ? "Published" : "Draft"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell text-sm text-gray-500">
                      {formatDate(post.publishedDate as unknown as string)}
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell text-sm text-gray-500">
                      {post.author}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/blog/${post.id}/edit`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-forest-900">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                          onClick={() => handleDelete(post)}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
