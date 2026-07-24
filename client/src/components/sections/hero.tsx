import { Button } from "@/components/ui/button";
import { Tv2, ShoppingCart, Users, BarChart2 } from "lucide-react";

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-sage-50 to-cream-50 overflow-hidden pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            {/* Eyebrow */}
            <div className="inline-block bg-sage-100 text-sage-700 text-sm font-semibold font-recoleta px-4 py-1.5 rounded-full mb-6 tracking-wide">
              White-Labeled Retail Media for Grocery
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold font-recoleta text-forest-900 leading-tight mb-6">
              Turn Weekly Food Decisions Into a New{" "}
              <span className="text-sage-500">Retail Media Platform</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Sage gives grocers a white-labeled platform that transforms those decisions into
              personalized, shoppable and monetizable digital experiences—all under the retailer's brand.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button
                onClick={() => scrollTo('demo')}
                className="bg-sage-500 text-white px-10 py-6 rounded-xl font-semibold hover:bg-sage-600 transition-colors h-auto text-lg tracking-wider"
                data-testid="button-request-demo"
              >
                Request a Demo
              </Button>
              <Button
                onClick={() => scrollTo('how-sage-works')}
                variant="outline"
                className="border-2 border-sage-500 text-sage-500 px-10 py-6 rounded-xl font-semibold hover:bg-sage-50 transition-colors h-auto text-lg tracking-wider"
                data-testid="button-see-how-it-works"
              >
                See How It Works
              </Button>
            </div>

            {/* Benefit hierarchy trust indicators */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Tv2 className="w-5 h-5 text-sage-500 flex-shrink-0" />
                New Media Platform
              </div>
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-sage-500 flex-shrink-0" />
                Ecommerce Engine
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-sage-500 flex-shrink-0" />
                Shopper Loyalty
              </div>
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-sage-500 flex-shrink-0" />
                New Shopper Insights
              </div>
            </div>

            {/* Supporting line */}
            <p className="mt-6 text-sm font-medium text-forest-900 tracking-wide">
              Your brand. Your shoppers. Your digital experience.
            </p>
          </div>

          <div className="lg:col-span-6 mt-12 lg:mt-0">
            {/* TODO: replace with retailer-branded visual when approved */}
            <div style={{ aspectRatio: "512 / 341" }} className="w-full">
              <img
                src="/sage-healthy-meal-plans-app.jpg"
                alt="A person with dark hair cooking at a stove in a modern white kitchen, with fresh produce including citrus and vegetables visible on the counter"
                className="rounded-2xl shadow-2xl w-full h-full object-cover"
                data-testid="img-hero-product"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
