import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import ProductOverview from "@/components/sections/product-overview";
import DemoForm from "@/components/sections/demo-form";

export default function Product() {
  return (
    <>
      <title>Product Overview - Sage Meal Planning Platform</title>
      <meta name="description" content="Discover how Sage's AI-powered meal planning platform transforms retail experiences with personalized recommendations, smart shopping lists, and cooking guidance." />
      
      <div className="min-h-screen bg-cream-50">
        <Navigation />
        <main>
          <ProductOverview />
          <DemoForm />
        </main>
        <Footer />
      </div>
    </>
  );
}
