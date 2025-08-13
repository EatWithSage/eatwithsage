import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import DemoForm from "@/components/sections/demo-form";
import { Package, TrendingDown, BookOpen, RefreshCw, CheckCircle } from "lucide-react";

export default function MealKitsIndustry() {
  const benefits = [
    "Reduce customer churn by up to 35%",
    "Increase meal kit satisfaction scores",
    "Optimize subscription retention rates",
    "Provide cooking success support",
    "Create personalized recipe discovery"
  ];

  return (
    <>
      <title>Meal Kit Services - Sage Meal Planning Platform</title>
      <meta name="description" content="Reduce churn and increase satisfaction in your meal kit service with Sage's AI-powered meal curation, cooking guidance, and subscription optimization features." />
      
      <div className="min-h-screen bg-cream-50">
        <Navigation />
        <main>
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-sage-50 to-cream-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                <div className="lg:col-span-6">
                  <div className="w-16 h-16 bg-sage-500 rounded-xl flex items-center justify-center mb-6">
                    <Package className="text-white w-8 h-8" />
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold font-recoleta text-forest-900 leading-tight mb-6" data-testid="text-meal-kit-title">
                    Reduce Churn With <span className="text-sage-500">Smart Curation</span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Increase customer satisfaction and retention with AI-powered meal curation and cooking guidance that ensures every meal is a success.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center" data-testid={`benefit-${index}`}>
                        <CheckCircle className="w-5 h-5 text-sage-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="lg:col-span-6 mt-12 lg:mt-0">
                  <img 
                    src="/sage-best-meal-planning.png" 
                    alt="Couple cooking together in modern kitchen, demonstrating successful meal kit preparation with guided cooking" 
                    className="rounded-2xl shadow-2xl w-full" 
                    data-testid="img-meal-kit-hero"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold font-recoleta text-forest-900 mb-4" data-testid="text-features-title">
                  Built For Meal Kit Success
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Ensure customer success with intelligent meal curation and comprehensive cooking support
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-sage-50 rounded-2xl p-8 text-center" data-testid="feature-recipe-recommendations">
                  <div className="w-16 h-16 bg-sage-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-forest-900 mb-4">Recipe Recommendations</h3>
                  <p className="text-gray-600">
                    Curate personalized meal selections based on customer preferences, cooking skill level, and dietary requirements.
                  </p>
                </div>
                
                <div className="bg-sage-50 rounded-2xl p-8 text-center" data-testid="feature-cooking-tutorials">
                  <div className="w-16 h-16 bg-sage-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <TrendingDown className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-forest-900 mb-4">Cooking Tutorials</h3>
                  <p className="text-gray-600">
                    Provide step-by-step guidance and cooking tips to ensure every meal turns out perfectly, reducing frustration and cancellations.
                  </p>
                </div>
                
                <div className="bg-sage-50 rounded-2xl p-8 text-center" data-testid="feature-subscription-optimization">
                  <div className="w-16 h-16 bg-sage-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <RefreshCw className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-forest-900 mb-4">Subscription Optimization</h3>
                  <p className="text-gray-600">
                    Optimize delivery frequency and meal variety based on customer feedback and consumption patterns to maximize retention.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-cream-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-forest-900 mb-6" data-testid="text-cta-title">
                Ready To Reduce Churn And Increase Satisfaction?
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                See how leading meal kit services are using Sage to improve customer retention and success.
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
