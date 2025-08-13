import React from "react";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import DemoForm from "@/components/sections/demo-form";
import { ShoppingBasket, TrendingUp, Users, BarChart3, CheckCircle } from "lucide-react";

export default function GroceryIndustry() {
  const benefits = [
    "Increase average basket size by 25-40%",
    "Drive repeat visits with personalized meal plans", 
    "Reduce customer acquisition costs",
    "Build stronger customer loyalty and retention",
    "Differentiate from online competitors"
  ];

  return (
    <>
      <title>Grocery Retail Solutions - Sage Meal Planning Platform</title>
      <meta name="description" content="Transform your grocery retail experience with Sage's AI-powered meal planning. Increase basket size, drive repeat visits, and build customer loyalty with personalized shopping experiences." />
      
      <div className="min-h-screen bg-cream-50">
        <Navigation />
        <main>
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-sage-50 to-cream-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                <div className="lg:col-span-6">

                  <h1 className="text-4xl lg:text-5xl font-bold text-forest-900 leading-tight mb-6" data-testid="text-grocery-title">
                    Turn Meal Planning Into <span className="text-sage-500">Brand Loyalty</span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    Sage is the white-labeled app created to build your business. With personalized meal planning linked to easy ordering Sage creates:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    <div className="flex items-center" data-testid="benefit-engaged-shoppers">
                      <CheckCircle className="w-5 h-5 text-sage-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Engaged shoppers</span>
                    </div>
                    <div className="flex items-center" data-testid="benefit-customer-loyalty">
                      <CheckCircle className="w-5 h-5 text-sage-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Increased customer loyalty</span>
                    </div>
                    <div className="flex items-center" data-testid="benefit-repeat-purchases">
                      <CheckCircle className="w-5 h-5 text-sage-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">More repeat purchases</span>
                    </div>
                    <div className="flex items-center" data-testid="benefit-basket-sizes">
                      <CheckCircle className="w-5 h-5 text-sage-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Biggest average basket sizes</span>
                    </div>
                    <div className="flex items-center" data-testid="benefit-profit-margins">
                      <CheckCircle className="w-5 h-5 text-sage-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Higher profit margins</span>
                    </div>
                    <div className="flex items-center" data-testid="benefit-acquisition-costs">
                      <CheckCircle className="w-5 h-5 text-sage-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Lower customer acquisition costs</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <a 
                      href="#demo" 
                      className="inline-block bg-sage-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-sage-600 transition-colors"
                      data-testid="button-cta-demo"
                    >
                      See Sage In Action
                    </a>
                    <p className="text-sm text-gray-500 mt-2">Schedule a personalized demo for your business</p>
                  </div>
                </div>
                
                <div className="lg:col-span-6 mt-12 lg:mt-0">
                  <img 
                    src="/sage-healthy-meal-plans-app.jpg" 
                    alt="Woman using Sage healthy meal planning app while cooking in modern kitchen with fresh ingredients" 
                    className="rounded-2xl shadow-2xl w-full" 
                    data-testid="img-grocery-hero"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-forest-900 mb-4" data-testid="text-features-title">
                  Built For Grocery Retailers
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Sage seamlessly integrates with your existing systems to create personalized shopping experiences
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-sage-50 rounded-2xl p-8 text-center" data-testid="feature-smart-lists">
                  <div className="w-16 h-16 bg-sage-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-forest-900 mb-4">Smart Shopping Lists</h3>
                  <p className="text-gray-600">
                    Generate optimized shopping lists that guide customers through your store layout, increasing dwell time and cross-selling opportunities.
                  </p>
                </div>
                
                <div className="bg-sage-50 rounded-2xl p-8 text-center" data-testid="feature-customer-insights">
                  <div className="w-16 h-16 bg-sage-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <BarChart3 className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-forest-900 mb-4">Customer Insights</h3>
                  <p className="text-gray-600">
                    Gain deep understanding of customer preferences and shopping patterns to optimize inventory and merchandising decisions.
                  </p>
                </div>
                
                <div className="bg-sage-50 rounded-2xl p-8 text-center" data-testid="feature-loyalty-building">
                  <div className="w-16 h-16 bg-sage-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Users className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-forest-900 mb-4">Loyalty Building</h3>
                  <p className="text-gray-600">
                    Create emotional connections with customers through personalized meal recommendations that fit their lifestyle and preferences.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-cream-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-forest-900 mb-6" data-testid="text-cta-title">
                Ready To Transform Your Grocery Business?
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                See how leading grocery retailers are using Sage to drive growth and customer satisfaction.
              </p>
              <DemoForm />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
