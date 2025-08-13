import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import DemoForm from "@/components/sections/demo-form";
import ProductOverview from "@/components/sections/product-overview";
import SocialProof from "@/components/sections/social-proof";
import IndustryShowcase from "@/components/sections/industry-showcase";
import FinalCTA from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <title>Sage - AI-Powered Meal Planning App for Retailers | Your Recipe for Brand Loyalty</title>
      <meta name="description" content="Transform health trends into brand loyalty with Sage's white-labeled meal planning app. AI-powered weekly meal planner with healthy meal plans for retailers who want to be their customers' health hero." />
      <meta property="og:title" content="Sage - White-Label Meal Planning App for Retailers" />
      <meta property="og:description" content="AI-powered meal planning service that helps retailers build brand loyalty through personalized healthy meal plans and weekly meal planning." />
      <meta property="og:image" content="/Sage-healthy-meal-plan-app-logo_1755077718089.png" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Sage - White-Label Meal Planning App for Retailers" />
      <meta name="twitter:description" content="AI-powered meal planning service that helps retailers build brand loyalty through personalized healthy meal plans and weekly meal planning." />
      <meta name="twitter:image" content="/Sage-healthy-meal-plan-app-logo_1755077718089.png" />
      
      <div className="min-h-screen bg-cream-50">
        <Navigation />
        <main>
          <Hero />
          <DemoForm />
          <ProductOverview />
          <SocialProof />
          <IndustryShowcase />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
