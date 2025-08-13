import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location === path;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center" data-testid="link-home">
              <img 
                src="/Sage-healthy-meal-plan-app-logo.png" 
                alt="Sage logo - stylized plant with leaves representing healthy meal planning" 
                className="w-12 h-12" 
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                href="/" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('/') ? 'text-forest-900' : 'text-gray-600 hover:text-sage-500'
                }`}
                data-testid="link-nav-home"
              >
                Home
              </Link>
              <Link 
                href="/product" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('/product') ? 'text-forest-900' : 'text-gray-600 hover:text-sage-500'
                }`}
                data-testid="link-nav-product"
              >
                Product
              </Link>
              
              {/* Industries Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-gray-600 hover:text-sage-500 px-3 py-2 text-sm font-medium transition-colors flex items-center" data-testid="button-industries-dropdown">
                    Industries <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-white border border-sage-200 shadow-lg rounded-lg p-2">
                  <DropdownMenuItem asChild className="hover:bg-sage-50 rounded-md transition-colors">
                    <Link href="/industry/grocery" className="text-gray-700 hover:text-sage-600 px-3 py-2 block w-full" data-testid="link-industry-grocery">Food Retailers</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-sage-50 rounded-md transition-colors">
                    <Link href="/industry/restaurants" className="text-gray-700 hover:text-sage-600 px-3 py-2 block w-full" data-testid="link-industry-restaurants">Restaurants</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-sage-50 rounded-md transition-colors">
                    <Link href="/industry/meal-kits" className="text-gray-700 hover:text-sage-600 px-3 py-2 block w-full" data-testid="link-industry-meal-kits">Meal Kit Services</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Link 
                href="/about" 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('/about') ? 'text-forest-900' : 'text-gray-600 hover:text-sage-500'
                }`}
                data-testid="link-nav-about"
              >
                About
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white">
                <div className="flex flex-col space-y-4 mt-4">
                  <Link 
                    href="/" 
                    className="block px-3 py-2 text-forest-900 font-medium"
                    onClick={() => setMobileOpen(false)}
                    data-testid="link-mobile-home"
                  >
                    Home
                  </Link>
                  <Link 
                    href="/product" 
                    className="block px-3 py-2 text-gray-600 hover:text-sage-500"
                    onClick={() => setMobileOpen(false)}
                    data-testid="link-mobile-product"
                  >
                    Product
                  </Link>
                  <div className="pl-3">
                    <div className="text-sm font-medium text-sage-600 mb-2">Industries</div>
                    <Link 
                      href="/industry/grocery" 
                      className="block px-3 py-2 text-gray-600 hover:text-sage-500"
                      onClick={() => setMobileOpen(false)}
                      data-testid="link-mobile-grocery"
                    >
                      Food Retailers
                    </Link>
                    <Link 
                      href="/industry/restaurants" 
                      className="block px-3 py-2 text-gray-600 hover:text-sage-500"
                      onClick={() => setMobileOpen(false)}
                      data-testid="link-mobile-restaurants"
                    >
                      Restaurants
                    </Link>
                    <Link 
                      href="/industry/meal-kits" 
                      className="block px-3 py-2 text-gray-600 hover:text-sage-500"
                      onClick={() => setMobileOpen(false)}
                      data-testid="link-mobile-meal-kits"
                    >
                      Meal Kit Services
                    </Link>
                  </div>
                  <Link 
                    href="/about" 
                    className="block px-3 py-2 text-gray-600 hover:text-sage-500"
                    onClick={() => setMobileOpen(false)}
                    data-testid="link-mobile-about"
                  >
                    About
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
