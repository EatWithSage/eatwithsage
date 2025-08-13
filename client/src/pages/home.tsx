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
