import React from "react";
import { Link } from "wouter";
import { Navigation } from "@/components/layout/navigation";

export default function IndexPage() {
  const pages = [
    { path: "/", title: "Home", description: "Main landing page" },
    { path: "/product", title: "Product", description: "Product overview and features" },
    { path: "/about", title: "About", description: "About Sage and our story" },
    { path: "/ShopRite", title: "ShopRite", description: "ShopRite case study and demo" },
    { 
      path: "/industry/food-retailers", 
      title: "Food Retailers", 
      description: "Solutions for grocery stores and food retailers" 
    },
    { 
      path: "/industry/food-brands", 
      title: "Food Brands", 
      description: "Solutions for food brand companies" 
    },
    { 
      path: "/industry/chronic-disease-foundations", 
      title: "Chronic Disease Foundations", 
      description: "Solutions for health foundations" 
    },
    { 
      path: "/industry/self-insured-employers", 
      title: "Self-Insured Employers", 
      description: "Solutions for employers and HR teams" 
    },
    { 
      path: "/industry/kitchen-appliance-manufacturers", 
      title: "Kitchen Appliance Manufacturers", 
      description: "Solutions for appliance companies" 
    },
    { 
      path: "/industry/food-health-media", 
      title: "Food and Health Media", 
      description: "Solutions for media companies" 
    },
    { 
      path: "/industry/tech-companies", 
      title: "Tech Companies", 
      description: "Solutions for technology platforms" 
    },
  ];

  return (
    <>
      <title>Site Index - Sage</title>
      <meta name="description" content="Complete index of all pages on the Sage website." />

      <div className="min-h-screen bg-cream-50">
        <Navigation />
        <main className="pt-40 pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-6xl font-bold text-forest-900 mb-6 font-recoleta text-center">
              Site Index
            </h1>
            <p className="text-xl text-gray-600 mb-12 text-center">
              All pages within eatwithsage.com
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {pages.map((page) => (
                <Link 
                  key={page.path} 
                  href={page.path}
                  data-testid={`link-index-${page.path}`}
                >
                  <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow border border-gray-200 hover:border-sage-300">
                    <h2 className="text-2xl font-bold text-forest-900 mb-2 font-recoleta">
                      {page.title}
                    </h2>
                    <p className="text-gray-600 mb-3">
                      {page.description}
                    </p>
                    <span className="text-sage-600 font-medium">
                      {page.path}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
