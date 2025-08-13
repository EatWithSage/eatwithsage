import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import DemoForm from "@/components/sections/demo-form";
import { Utensils, Star, Heart, Users, CheckCircle } from "lucide-react";

export default function RestaurantsIndustry() {
  const benefits = [
    "Increase customer visit frequency by 30%",
    "Personalize menu recommendations for dietary needs",
    "Build stronger customer relationships",
    "Reduce food waste with better planning",
    "Create memorable dining experiences"
  ];

  return (
    <>
      <title>Restaurant Solutions - Sage Meal Planning Platform</title>
      <meta name="description" content="Enhance your restaurant's customer experience with Sage's AI-powered meal planning. Personalize menus, accommodate dietary needs, and build lasting customer relationships." />
      <meta property="og:title" content="Restaurant Solutions - Sage Meal Planning Platform" />
      <meta property="og:description" content="Enhance your restaurant's customer experience with Sage's AI-powered meal planning. Personalize menus, accommodate dietary needs, and build lasting customer relationships." />
      <meta property="og:image" content="/Sage-healthy-meal-plan-app-logo_1755077718089.png" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Restaurant Solutions - Sage Meal Planning Platform" />
      <meta name="twitter:description" content="Enhance your restaurant's customer experience with Sage's AI-powered meal planning. Personalize menus, accommodate dietary needs, and build lasting customer relationships." />
      <meta name="twitter:image" content="/Sage-healthy-meal-plan-app-logo_1755077718089.png" />
      
      <div className="min-h-screen bg-cream-50">
        <Navigation />
        <main>
          {/* Hero Section */}
          <section className="pt-40 pb-20 bg-gradient-to-br from-sage-50 to-cream-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                <div className="lg:col-span-6">
                  <div className="mb-6"></div>
                  <h1 className="text-4xl lg:text-5xl font-bold font-recoleta text-forest-900 leading-tight mb-6" data-testid="text-restaurant-title">
                    Create <span className="text-sage-500">Personalized</span> Dining Experiences
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Enhance customer satisfaction and loyalty with AI-powered menu recommendations that cater to individual preferences and dietary requirements.
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
                    src="/sage-ai-meal-planner.jpg" 
                    alt="Multi-generational family enjoying a meal together around dining table, showcasing personalized dining experience" 
                    className="rounded-2xl shadow-2xl w-full" 
                    data-testid="img-restaurant-hero"
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
                  Designed For Restaurant Success
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Transform how customers discover and enjoy your menu with intelligent personalization
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-sage-50 rounded-2xl p-8 text-center" data-testid="feature-menu-personalization">
                  <div className="w-16 h-16 bg-sage-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Star className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-forest-900 mb-4">Menu Personalization</h3>
                  <p className="text-gray-600">
                    Recommend dishes based on customer preferences, past orders, and dietary restrictions to create tailored dining experiences.
                  </p>
                </div>
                
                <div className="bg-sage-50 rounded-2xl p-8 text-center" data-testid="feature-dietary-accommodations">
                  <div className="w-16 h-16 bg-sage-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Heart className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-forest-900 mb-4">Dietary Accommodations</h3>
                  <p className="text-gray-600">
                    Automatically identify and suggest suitable options for customers with allergies, dietary restrictions, or health goals.
                  </p>
                </div>
                
                <div className="bg-sage-50 rounded-2xl p-8 text-center" data-testid="feature-loyalty-programs">
                  <div className="w-16 h-16 bg-sage-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Users className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-forest-900 mb-4">Loyalty Programs</h3>
                  <p className="text-gray-600">
                    Build deeper customer relationships with meal planning services that extend beyond the dining room into their daily lives.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-cream-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-forest-900 mb-6" data-testid="text-cta-title">
                Ready To Enhance Your Restaurant Experience?
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                Discover how leading restaurants are using Sage to create memorable dining experiences.
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
