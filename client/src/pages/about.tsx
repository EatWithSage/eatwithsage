import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import AboutTimeline from "@/components/sections/about-timeline";
import FinalCTA from "@/components/sections/final-cta";

export default function About() {
  return (
    <>
      <title>About Us - The Sage Story</title>
      <meta name="description" content="Learn about Sage's mission to make healthy eating accessible through AI-powered meal planning. Founded from personal experience to transform how families approach nutrition." />

      
      <div className="min-h-screen bg-cream-50">
        <Navigation />
        <main>
          <AboutTimeline />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
