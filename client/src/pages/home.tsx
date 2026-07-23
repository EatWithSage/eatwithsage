import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import DemoForm from "@/components/sections/demo-form";
import RetailMediaOpportunity from "@/components/sections/homepage/retail-media-opportunity";
// Stage 2
import HowSageWorks from "@/components/sections/homepage/how-sage-works";
import EcommerceEngine from "@/components/sections/homepage/ecommerce-engine";
// Stage 3
import RetailerOutcomes from "@/components/sections/homepage/retailer-outcomes";
import ShopperExperience from "@/components/sections/homepage/shopper-experience";
import ShopperInsights from "@/components/sections/homepage/shopper-insights";
// Stage 4
import WhiteLabelPlatform from "@/components/sections/homepage/white-label-platform";
import HomepageFinalCTA from "@/components/sections/homepage/homepage-final-cta";

export default function Home() {
  return (
    <>
      <title>Sage | White-Labeled Retail Media Platform for Grocers</title>
      <meta
        name="description"
        content="Sage helps grocers turn weekly food decisions into personalized, shoppable and monetizable digital experiences under their own brand."
      />

      <div className="min-h-screen bg-cream-50">
        <Navigation showDemoCta={true} />
        <main>
          {/* §2 Hero */}
          <Hero />

          {/* §3 Retail media opportunity */}
          <RetailMediaOpportunity />

          {/* §4 How Sage works — Stage 2 */}
          <HowSageWorks />

          {/* §5 Ecommerce engine — Stage 2 */}
          <EcommerceEngine />

          {/* §6 Four retailer outcomes — Stage 3 */}
          <RetailerOutcomes />

          {/* §7 Shopper experience — Stage 3 */}
          <ShopperExperience />

          {/* §8 Shopper insights — Stage 3 */}
          <ShopperInsights />

          {/* §9 White-label platform — Stage 4 */}
          <WhiteLabelPlatform />

          {/* §10 Final CTA — Stage 4 */}
          <HomepageFinalCTA />

          {/* Primary demo form / scheduler */}
          <DemoForm />
        </main>
        <Footer />
      </div>
    </>
  );
}
