import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    document.title = "Admin Login - Sage";
    const token = localStorage.getItem("sage_admin_token");
    if (token) {
      navigate("/admin/blog");
    }
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/posts", {
        headers: { Authorization: `Bearer ${password}` },
      });

      if (res.ok) {
        localStorage.setItem("sage_admin_token", password);
        navigate("/admin/blog");
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-forest-900 rounded-2xl mb-4">
            <Lock className="h-8 w-8 text-cream-50" />
          </div>
          <h1 className="text-3xl font-bold text-forest-900 font-recoleta">Sage Admin</h1>
          <p className="text-gray-500 mt-2">Sign in to manage blog content</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl text-forest-900 font-recoleta">Enter Admin Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="mt-1"
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}
              <Button
                type="submit"
                disabled={isLoading || !password}
                className="w-full bg-forest-900 hover:bg-forest-800 text-white font-medium py-2"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
