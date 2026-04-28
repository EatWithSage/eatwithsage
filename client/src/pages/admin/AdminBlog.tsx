import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PlusCircle, Edit, Trash2, LogOut, Eye, Download, Database, RotateCcw, Flame } from "lucide-react";
import type { BlogPost } from "../../../../shared/schema";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

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

function timeAgo(ts: number): string {
  const diffMs = Math.max(0, Date.now() - ts);
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 5) return "just now";
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${Math.floor(diffHr / 24)}d ago`;
}

function DatabaseHealthBadge() {
  const [lastConnected, setLastConnected] = useState<number | null>(null);
  const [, setTick] = useState(0);

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

  useEffect(() => {
    if (!isError && data?.database === "connected") {
      setLastConnected(data.timestamp ?? Date.now());
    }
  }, [data, isError]);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(id);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">
        <Database className="h-3 w-3" />
        <span>Checking…</span>
      </div>
    );
  }

  const isHealthy = !isError && data?.database === "connected";
  const lastConnectedLabel = lastConnected ? `Last connected ${timeAgo(lastConnected)}` : null;
  const tooltipText = isHealthy
    ? lastConnectedLabel ? `Database connected · ${lastConnectedLabel}` : "Database connected"
    : lastConnectedLabel ? `Database unreachable · ${lastConnectedLabel}` : "Database unreachable";

  return (
    <div
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
        isHealthy
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
      title={tooltipText}
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
      {lastConnectedLabel && (
        <span className="opacity-70 hidden sm:inline">· {lastConnectedLabel}</span>
      )}
    </div>
  );
}

export default function AdminBlog() {
  const [, navigate] = useLocation();
  const [permanentDeleteTarget, setPermanentDeleteTarget] = useState<BlogPost | null>(null);
  const [trashTarget, setTrashTarget] = useState<BlogPost | null>(null);
  const { toast } = useToast();

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

  const { data: deletedPosts, isLoading: isLoadingDeleted } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/posts/deleted"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/posts/deleted");
      if (res.status === 401) {
        localStorage.removeItem("sage_admin_token");
        navigate("/admin");
        throw new Error("Unauthorized");
      }
      const text = await res.text();
      if (!res.ok) throw new Error(`Failed to fetch deleted posts (${res.status}): ${text}`);
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
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/posts/deleted"] });
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      setTrashTarget(null);
      toast({
        title: "Post moved to trash",
        action: (
          <ToastAction altText="Undo" onClick={() => restoreMutation.mutate(id)}>
            Undo
          </ToastAction>
        ),
      });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to move post to trash", description: error.message, variant: "destructive" });
    },
  });

  const restoreMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await adminFetch(`/api/admin/posts/${id}/restore`, { method: "POST" });
      const text = await res.text();
      if (!res.ok) throw new Error(`Failed to restore post (${res.status}): ${text}`);
      return text ? JSON.parse(text) : { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/posts/deleted"] });
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({ title: "Post restored successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to restore post", description: error.message, variant: "destructive" });
    },
  });

  const permanentDeleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await adminFetch(`/api/admin/posts/${id}/permanent`, { method: "DELETE" });
      const text = await res.text();
      if (!res.ok) throw new Error(`Failed to permanently delete post (${res.status}): ${text}`);
      return text ? JSON.parse(text) : { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/posts/deleted"] });
      setPermanentDeleteTarget(null);
      toast({ title: "Post permanently deleted" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to delete post", description: error.message, variant: "destructive" });
    },
  });

  function handleLogout() {
    localStorage.removeItem("sage_admin_token");
    navigate("/admin");
  }

  async function handleExport(format: "json" | "csv" = "json") {
    const url = format === "csv" ? "/api/admin/posts/export?format=csv" : "/api/admin/posts/export";
    const res = await adminFetch(url);
    if (!res.ok) {
      alert("Export failed. Please try again.");
      return;
    }
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const disposition = res.headers.get("Content-Disposition") || "";
    const match = disposition.match(/filename="([^"]+)"/);
    a.download = match ? match[1] : `blog-posts-export.${format}`;
    a.href = objectUrl;
    a.click();
    URL.revokeObjectURL(objectUrl);
  }

  function handleDelete(post: BlogPost) {
    setTrashTarget(post);
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
            <Button variant="ghost" size="sm" onClick={() => handleExport("json")} className="gap-2 text-gray-600" title="Exports all posts including trashed ones">
              <Download className="h-4 w-4" />
              Export All JSON
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleExport("csv")} className="gap-2 text-gray-600">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-gray-600">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="posts">
          <div className="flex items-center justify-between mb-8">
            <div>
              <TabsList className="bg-white border border-gray-200">
                <TabsTrigger value="posts" className="gap-2">
                  All Posts
                  {posts && posts.length > 0 && (
                    <span className="ml-1 bg-gray-100 text-gray-600 text-xs rounded-full px-1.5 py-0.5 font-medium">
                      {posts.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="trash" className="gap-2">
                  <Trash2 className="h-3.5 w-3.5" />
                  Trash
                  {deletedPosts && deletedPosts.length > 0 && (
                    <span className="ml-1 bg-red-100 text-red-600 text-xs rounded-full px-1.5 py-0.5 font-medium">
                      {deletedPosts.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>
            <Link href="/admin/blog/new">
              <Button className="bg-forest-900 hover:bg-forest-800 text-white gap-2">
                <PlusCircle className="h-4 w-4" />
                New Post
              </Button>
            </Link>
          </div>

          <TabsContent value="posts">
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
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-forest-900 text-sm line-clamp-1">{post.title}</p>
                              <Badge
                                variant={post.status === "published" ? "default" : "secondary"}
                                className={`md:hidden shrink-0 ${post.status === "published"
                                  ? "bg-forest-100 text-forest-800 border-forest-200"
                                  : "bg-gray-100 text-gray-600 border-gray-200"}`}
                              >
                                {post.status === "published" ? "Published" : "Draft"}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5">/blog/{post.slug}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <Badge
                            variant={post.status === "published" ? "default" : "secondary"}
                            className={post.status === "published"
                              ? "bg-forest-100 text-forest-800 border-forest-200"
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
                              title="Move to trash"
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
          </TabsContent>

          <TabsContent value="trash">
            {isLoadingDeleted && (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                    <div className="h-5 bg-gray-200 rounded w-1/2 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                  </div>
                ))}
              </div>
            )}

            {!isLoadingDeleted && deletedPosts && deletedPosts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                <Trash2 className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Trash is empty.</p>
              </div>
            )}

            {!isLoadingDeleted && deletedPosts && deletedPosts.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-amber-50 border-b border-amber-100 px-6 py-3">
                  <p className="text-xs text-amber-700 font-medium">
                    Trashed posts are hidden from the public blog. Restore them to make them visible again, or permanently delete them to remove them forever.
                  </p>
                </div>
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Status</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Deleted On</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Author</th>
                      <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {deletedPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50 transition-colors opacity-75">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-600 text-sm line-clamp-1">{post.title}</p>
                            <p className="text-xs text-gray-400 mt-0.5">/blog/{post.slug}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <Badge
                            variant="secondary"
                            className="bg-gray-100 text-gray-500 border-gray-200"
                          >
                            {post.status === "published" ? "Published" : "Draft"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell text-sm text-gray-500">
                          {formatDate(post.deletedAt as unknown as string)}
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell text-sm text-gray-500">
                          {post.author}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-3 text-xs text-gray-500 hover:text-green-700 hover:bg-green-50 gap-1.5"
                              onClick={() => restoreMutation.mutate(post.id)}
                              disabled={restoreMutation.isPending || permanentDeleteMutation.isPending}
                              title="Restore post"
                            >
                              <RotateCcw className="h-3.5 w-3.5" />
                              Restore
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-3 text-xs text-gray-400 hover:text-red-600 hover:bg-red-50 gap-1.5"
                              onClick={() => setPermanentDeleteTarget(post)}
                              disabled={restoreMutation.isPending || permanentDeleteMutation.isPending}
                              title="Permanently delete"
                            >
                              <Flame className="h-3.5 w-3.5" />
                              Delete Forever
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <AlertDialog open={!!trashTarget} onOpenChange={(open) => { if (!open) setTrashTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Move post to trash?</AlertDialogTitle>
            <AlertDialogDescription>
              <strong>"{trashTarget?.title}"</strong> will be moved to the trash and hidden from the public blog. You can restore it later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={deleteMutation.isPending}
              onClick={() => trashTarget && deleteMutation.mutate(trashTarget.id)}
            >
              {deleteMutation.isPending ? "Moving…" : "Move to Trash"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!permanentDeleteTarget} onOpenChange={(open) => { if (!open) setPermanentDeleteTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Permanently delete this post?</AlertDialogTitle>
            <AlertDialogDescription>
              <strong>"{permanentDeleteTarget?.title}"</strong> will be permanently removed and cannot be recovered. This action is irreversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={permanentDeleteMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={permanentDeleteMutation.isPending}
              onClick={() => permanentDeleteTarget && permanentDeleteMutation.mutate(permanentDeleteTarget.id)}
            >
              {permanentDeleteMutation.isPending ? "Deleting…" : "Delete Forever"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
