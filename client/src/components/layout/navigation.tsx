import { useState, useEffect } from "react";
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

interface NavigationProps {
  showDemoCta?: boolean;
}

export function Navigation({ showDemoCta = false }: NavigationProps) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isActive = (path: string) => location === path;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav style={{ backgroundColor: '#FFF5E4' }} className={`fixed top-0 w-full z-50 shadow-sm transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-32">
          <div className="flex items-center">
            <Link href="/" className="flex items-center" data-testid="link-home">
              <img 
                src="/Sage-healthy-meal-plan-app-logo_1755077718089.png" 
                alt="Sage logo - stylized plant with leaves and text representing healthy meal planning" 
                className="w-32 h-32" 
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                href="/" 
                className={`px-3 py-2 text-sm font-medium font-recoleta transition-colors ${
                  isActive('/') ? 'text-forest-900' : 'text-gray-600 hover:text-sage-500'
                }`}
                data-testid="link-nav-home"
              >
                Home
              </Link>
              <Link 
                href="/product" 
                className={`px-3 py-2 text-sm font-medium font-recoleta transition-colors ${
                  isActive('/product') ? 'text-forest-900' : 'text-gray-600 hover:text-sage-500'
                }`}
                data-testid="link-nav-product"
              >
                Product
              </Link>
              
              {/* Industries Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-gray-600 hover:text-sage-500 px-3 py-2 text-sm font-medium font-recoleta transition-colors flex items-center" data-testid="button-industries-dropdown">
                    Industries <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-white border border-sage-200 shadow-lg rounded-lg p-2">
                  <DropdownMenuItem asChild className="hover:bg-sage-50 rounded-md transition-colors">
                    <Link href="/industry/food-retailers" className="text-gray-700 hover:text-sage-600 px-3 py-2 block w-full" data-testid="link-industry-food-retailers">Food Retailers</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-sage-50 rounded-md transition-colors">
                    <Link href="/industry/food-brands" className="text-gray-700 hover:text-sage-600 px-3 py-2 block w-full" data-testid="link-industry-food-brands">Food Brands</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-sage-50 rounded-md transition-colors">
                    <Link href="/industry/chronic-disease-foundations" className="text-gray-700 hover:text-sage-600 px-3 py-2 block w-full" data-testid="link-industry-chronic-disease-foundations">Chronic Disease Foundations</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-sage-50 rounded-md transition-colors">
                    <Link href="/industry/self-insured-employers" className="text-gray-700 hover:text-sage-600 px-3 py-2 block w-full" data-testid="link-industry-self-insured-employers">Self-Insured Employers</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-sage-50 rounded-md transition-colors">
                    <Link href="/industry/kitchen-appliance-manufacturers" className="text-gray-700 hover:text-sage-600 px-3 py-2 block w-full" data-testid="link-industry-kitchen-appliance-manufacturers">Kitchen Appliance Manufacturers</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-sage-50 rounded-md transition-colors">
                    <Link href="/industry/food-health-media" className="text-gray-700 hover:text-sage-600 px-3 py-2 block w-full" data-testid="link-industry-food-health-media">Food and Health Media</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-sage-50 rounded-md transition-colors">
                    <Link href="/industry/tech-companies" className="text-gray-700 hover:text-sage-600 px-3 py-2 block w-full" data-testid="link-industry-tech-companies">Tech Companies</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Link 
                href="/about" 
                className={`px-3 py-2 text-sm font-medium font-recoleta transition-colors ${
                  isActive('/about') ? 'text-forest-900' : 'text-gray-600 hover:text-sage-500'
                }`}
                data-testid="link-nav-about"
              >
                About
              </Link>
              <Link 
                href="/blog" 
                className={`px-3 py-2 text-sm font-medium font-recoleta transition-colors ${
                  isActive('/blog') ? 'text-forest-900' : 'text-gray-600 hover:text-sage-500'
                }`}
                data-testid="link-nav-blog"
              >
                Blog
              </Link>
            </div>

            {/* Homepage-only "Request a Demo" CTA */}
            {showDemoCta && (
              <a
                href="#demo"
                className="ml-8 bg-sage-500 text-white px-5 py-2 rounded-lg text-sm font-semibold font-recoleta hover:bg-sage-600 transition-colors"
                data-testid="link-nav-request-demo"
              >
                Request a Demo
              </a>
            )}
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
                      href="/industry/food-retailers" 
                      className="block px-3 py-2 text-gray-600 hover:text-sage-500"
                      onClick={() => setMobileOpen(false)}
                      data-testid="link-mobile-food-retailers"
                    >
                      Food Retailers
                    </Link>
                    <Link 
                      href="/industry/food-brands" 
                      className="block px-3 py-2 text-gray-600 hover:text-sage-500"
                      onClick={() => setMobileOpen(false)}
                      data-testid="link-mobile-food-brands"
                    >
                      Food Brands
                    </Link>
                    <Link 
                      href="/industry/chronic-disease-foundations" 
                      className="block px-3 py-2 text-gray-600 hover:text-sage-500"
                      onClick={() => setMobileOpen(false)}
                      data-testid="link-mobile-chronic-disease-foundations"
                    >
                      Chronic Disease Foundations
                    </Link>
                    <Link 
                      href="/industry/self-insured-employers" 
                      className="block px-3 py-2 text-gray-600 hover:text-sage-500"
                      onClick={() => setMobileOpen(false)}
                      data-testid="link-mobile-self-insured-employers"
                    >
                      Self-Insured Employers
                    </Link>
                    <Link 
                      href="/industry/kitchen-appliance-manufacturers" 
                      className="block px-3 py-2 text-gray-600 hover:text-sage-500"
                      onClick={() => setMobileOpen(false)}
                      data-testid="link-mobile-kitchen-appliance-manufacturers"
                    >
                      Kitchen Appliance Manufacturers
                    </Link>
                    <Link 
                      href="/industry/food-health-media" 
                      className="block px-3 py-2 text-gray-600 hover:text-sage-500"
                      onClick={() => setMobileOpen(false)}
                      data-testid="link-mobile-food-health-media"
                    >
                      Food and Health Media
                    </Link>
                    <Link 
                      href="/industry/tech-companies" 
                      className="block px-3 py-2 text-gray-600 hover:text-sage-500"
                      onClick={() => setMobileOpen(false)}
                      data-testid="link-mobile-tech-companies"
                    >
                      Tech Companies
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
                  <Link 
                    href="/blog" 
                    className="block px-3 py-2 text-gray-600 hover:text-sage-500"
                    onClick={() => setMobileOpen(false)}
                    data-testid="link-mobile-blog"
                  >
                    Blog
                  </Link>

                  {/* Homepage-only "Request a Demo" CTA */}
                  {showDemoCta && (
                    <a
                      href="#demo"
                      className="block mx-3 mt-2 bg-sage-500 text-white px-4 py-3 rounded-lg text-sm font-semibold font-recoleta text-center hover:bg-sage-600 transition-colors"
                      onClick={() => setMobileOpen(false)}
                      data-testid="link-mobile-request-demo"
                    >
                      Request a Demo
                    </a>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
