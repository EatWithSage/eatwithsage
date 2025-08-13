import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingBasket, Package, Heart, Users, Zap, Newspaper, Code } from "lucide-react";

export default function IndustryShowcase() {
  const industries = [
    {
      icon: ShoppingBasket,
      title: "Food Retailers",
      description: "Offer Sage as a white-labeled solution to WOW shoppers. Create loyal customers and brand ambassadors when Sage saves customers time creating incredibly personalized meal plans and buying groceries from your stores. Your white-labeled Sage app will increase:",
      features: ["Shopper brand loyalty", "Cart values", "Profit margins", "Turns on seasonal items"],
      href: "/industry/grocery"
    },
    {
      icon: Package,
      title: "Food Brands", 
      description: "Offer a white-labeled version of Sage to increase product usage, cross-promotion opportunities, and market share across your product portfolio.",
      features: ["Product usage increase", "Cross-promotion", "Market share growth"],
      href: "/industry/restaurants"
    },
    {
      icon: Heart,
      title: "Chronic Disease Foundations",
      description: "Provide white-labeled Sage as a benefit to relieve the burden for people with chronic diseases through customized, disease-specific meal recommendations.",
      features: ["Disease-specific plans", "Health-focused recommendations", "Member benefits"],
      href: "/industry/meal-kits"
    },
    {
      icon: Users,
      title: "Self-Insured Employers",
      description: "Offer Sage to employees to reduce healthcare costs for the most expensive employees through disease-specific recommendations and healthier eating habits.",
      features: ["Healthcare cost reduction", "Employee wellness", "Disease management"],
      href: "/industry/employers"
    },
    {
      icon: Zap,
      title: "Kitchen Appliance Manufacturers",
      description: "Offer a white-labeled version of Sage to make your products, particularly smart appliances, more useful and engaging for customers.",
      features: ["Smart product integration", "Enhanced utility", "Customer engagement"],
      href: "/industry/appliances"
    },
    {
      icon: Newspaper,
      title: "Food and Health Media",
      description: "Offer a white-labeled version of Sage to increase brand relevance and create new advertising inventory opportunities.",
      features: ["Brand relevance", "Ad inventory", "Content integration"],
      href: "/industry/media"
    },
    {
      icon: Code,
      title: "Technology Companies",
      description: "Integrate white-labeled Sage into your platform to enhance your product offering and provide additional value to your users.",
      features: ["Product enhancement", "User value", "Platform integration"],
      href: "/industry/technology"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-forest-50 to-cream-100 text-forest-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-recoleta mb-6" data-testid="text-industry-title">
            Tailored Solutions for Your Business
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Sage can be white-labeled to fit the unique needs of your organization and your consumers
          </p>
        </div>
        
        {/* Horizontal scrollable container */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-8 min-w-max px-4">
            {industries.map((industry, index) => {
              const IconComponent = industry.icon;
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:border-sage-200 transition-all duration-300 w-80 flex-shrink-0 flex flex-col min-h-[480px]" data-testid={`industry-card-${index}`}>
                  <div className="w-16 h-16 bg-sage-500 rounded-xl flex items-center justify-center mb-6">
                    <IconComponent className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-recoleta mb-4 text-forest-900">{industry.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{industry.description}</p>
                  <ul className="space-y-2 mb-8 text-gray-600 flex-grow">
                    {industry.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-sage-400 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="bg-forest-900 text-white font-semibold font-recoleta hover:bg-forest-800 transition-colors mt-auto" data-testid={`button-industry-learn-more-${index}`}>
                    <Link href={industry.href}>Learn More</Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}