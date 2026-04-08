import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { Navigation } from "@/components/layout/navigation";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft } from "lucide-react";
import type { BlogPost } from "../../../shared/schema";

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { data: post, isLoading, isError } = useQuery<BlogPost>({
    queryKey: ["/api/posts", slug],
    queryFn: async () => {
      const res = await fetch(`/api/posts/${slug}`);
      if (!res.ok) throw new Error("Post not found");
      return res.json();
    },
    enabled: !!slug,
  });

  useEffect(() => {
    if (post) {
      document.title = `${post.title} - Sage Blog`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription && post.excerpt) {
        metaDescription.setAttribute("content", post.excerpt);
      }
    }
  }, [post]);

  return (
    <div className="min-h-screen bg-cream-50">
      <Navigation />
      <main className="pt-40 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-700 text-sm font-medium mb-8 cursor-pointer transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </span>
          </Link>

          {isLoading && (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4 w-2/3" />
              <div className="h-4 bg-gray-200 rounded mb-8 w-1/3" />
              <div className="h-64 bg-gray-200 rounded-2xl mb-8" />
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded w-full" />
                ))}
              </div>
            </div>
          )}

          {isError && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-700 mb-4 font-recoleta">Post Not Found</h2>
              <p className="text-gray-500 mb-8">The post you're looking for doesn't exist or hasn't been published yet.</p>
              <Link href="/blog">
                <span className="text-sage-600 hover:text-sage-700 font-medium cursor-pointer">← Back to Blog</span>
              </Link>
            </div>
          )}

          {post && (
            <article>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-sage-50 text-sage-700 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <h1 className="text-4xl md:text-5xl font-bold text-forest-900 mb-4 font-recoleta leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center gap-6 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {post.author || "Sage"}
                </span>
                {post.publishedDate && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.publishedDate as unknown as string)}
                  </span>
                )}
              </div>

              {post.coverImage && (
                <div className="mb-10 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-auto max-h-96 object-cover"
                  />
                </div>
              )}

              {post.excerpt && (
                <p className="text-xl text-gray-600 mb-8 font-medium leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {post.content && (
                <div
                  className="prose prose-lg max-w-none text-gray-700 
                    prose-headings:font-recoleta prose-headings:text-forest-900
                    prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                    prose-a:text-sage-600 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-forest-900
                    prose-img:rounded-xl prose-img:shadow-md
                    prose-blockquote:border-l-sage-400 prose-blockquote:text-gray-600"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              )}
            </article>
          )}
        </div>
      </main>
    </div>
  );
}
