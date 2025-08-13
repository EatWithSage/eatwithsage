import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Clock } from "lucide-react";

const scrollToDemo = () => {
  const demoSection = document.getElementById('demo');
  if (demoSection) {
    demoSection.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-sage-50 to-cream-50 overflow-hidden pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-6">
            <h1 className="text-4xl lg:text-6xl font-bold font-recoleta text-forest-900 leading-tight mb-6">
              Your Recipe for <span className="text-sage-500">Brand Loyalty</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Build your brand with Sage's white-labeled meal planning app. Our AI-powered weekly meal planner creates healthy meal plans that drive brand loyalty, increase margins, and generate customer insights for powerful relationships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                onClick={scrollToDemo}
                className="bg-sage-500 text-white px-12 py-6 rounded-xl font-semibold hover:bg-sage-600 transition-colors h-auto text-lg tracking-wider"
                data-testid="button-request-demo"
              >
                Request Demo
              </Button>
              <Button 
                asChild 
                variant="outline" 
                className="border-2 border-sage-500 text-sage-500 px-12 py-6 rounded-xl font-semibold hover:bg-sage-50 transition-colors h-auto text-lg tracking-wider"
                data-testid="button-learn-more"
              >
                <Link href="/product">Learn More</Link>
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row gap-6 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-sage-500 mr-2" />
                Build Customer Loyalty
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-sage-500 mr-2" />
                Lower Customer Acquisition Costs
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-sage-500 mr-2" />
                Increase Total Sales
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-6 mt-12 lg:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600" 
              alt="Sage meal planning interface showing personalized recommendations and shopping lists" 
              className="rounded-2xl shadow-2xl w-full" 
              data-testid="img-hero-product"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
