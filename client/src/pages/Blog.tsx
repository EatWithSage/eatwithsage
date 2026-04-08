import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Navigation } from "@/components/layout/navigation";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Tag } from "lucide-react";
import type { BlogPost } from "../../../shared/schema";

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPage() {
  useEffect(() => {
    document.title = "Blog - Sage";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Insights, tips, and thought leadership from the Sage team on AI-powered meal planning and grocery retail innovation.");
    }
  }, []);

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/posts"],
  });

  return (
    <div className="min-h-screen bg-cream-50">
      <Navigation />
      <main className="pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-forest-900 mb-4 font-recoleta">
              The Sage Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Insights and ideas on AI-powered meal planning, grocery retail innovation, and building lasting customer loyalty.
            </p>
          </div>

          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-3 w-1/3" />
                    <div className="h-6 bg-gray-200 rounded mb-2" />
                    <div className="h-4 bg-gray-200 rounded mb-1 w-full" />
                    <div className="h-4 bg-gray-200 rounded w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && posts && posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No posts yet. Check back soon!</p>
            </div>
          )}

          {!isLoading && posts && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  {post.coverImage && (
                    <Link href={`/blog/${post.slug}`}>
                      <div className="h-48 overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                  )}
                  {!post.coverImage && (
                    <Link href={`/blog/${post.slug}`}>
                      <div className="h-48 bg-gradient-to-br from-sage-100 to-forest-100 flex items-center justify-center">
                        <span className="text-4xl">🌿</span>
                      </div>
                    </Link>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-sage-50 text-sage-700 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="text-xl font-bold text-forest-900 mb-2 font-recoleta hover:text-sage-600 transition-colors leading-snug">
                        {post.title}
                      </h2>
                    </Link>
                    {post.excerpt && (
                      <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-auto pt-4 border-t border-gray-100">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author || "Sage"}
                      </span>
                      {post.publishedDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.publishedDate as unknown as string)}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
