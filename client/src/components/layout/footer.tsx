import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src="/Sage-healthy-meal-plan-app-logo.png" 
                alt="Sage logo - stylized plant with leaves representing healthy meal planning" 
                className="w-8 h-8 mr-3" 
              />
              <span className="text-xl font-semibold">Sage</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Transforming retail experiences with AI-powered personalized meal planning that drives customer engagement and loyalty.
            </p>
            <div className="text-gray-400 text-sm">
              <p>© 2025 Eternal Brands, Inc.</p>
              <p>All rights reserved.</p>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/product" className="hover:text-sage-500 transition-colors" data-testid="link-footer-product">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/product#features" className="hover:text-sage-500 transition-colors" data-testid="link-footer-features">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/product#pricing" className="hover:text-sage-500 transition-colors" data-testid="link-footer-pricing">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Industries */}
          <div>
            <h4 className="font-semibold mb-4">Industries</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/industry/grocery" className="hover:text-sage-500 transition-colors" data-testid="link-footer-grocery">
                  Food Retailers
                </Link>
              </li>
              <li>
                <Link href="/industry/restaurants" className="hover:text-sage-500 transition-colors" data-testid="link-footer-restaurants">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link href="/industry/meal-kits" className="hover:text-sage-500 transition-colors" data-testid="link-footer-meal-kits">
                  Meal Kit Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-sage-500 transition-colors" data-testid="link-footer-about">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        

      </div>
    </footer>
  );
}
