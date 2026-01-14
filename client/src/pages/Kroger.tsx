import React, { useEffect } from "react";
import { Navigation } from "@/components/layout/navigation";
import SocialProof from "@/components/sections/social-proof";

export default function KrogerPage() {
  useEffect(() => {
    document.title = "Kroger's Recipe for Brand Loyalty - Sage";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "See how Kroger uses Sage's AI-powered meal planning platform to drive brand loyalty and customer engagement.",
      );
    }

    const script = document.createElement("script");
    script.src =
      "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-cream-50">
      <Navigation />
      <main>
        <section className="pt-40 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-forest-900 mb-12 font-recoleta">
                Kroger's Recipe for<br />Brand Loyalty
              </h1>

              <div className="w-full max-w-4xl mx-auto mb-16">
                <div className="relative" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl"
                    src="https://www.youtube.com/embed/_2XVIk4YFU4?enablejsapi=1&origin=https%3A%2F%2Featwithsage.com"
                    title="Sage - Kroger's Recipe for Brand Loyalty"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    data-testid="video-kroger-demo"
                  ></iframe>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-4xl font-bold text-forest-900 mb-4 font-recoleta">
                  See Sage In Action
                </h2>
                <p className="text-xl text-gray-600">
                  Get a personalized demo tailored to your business needs
                </p>
              </div>

              <div className="w-full max-w-4xl mx-auto">
                <div
                  className="meetings-iframe-container"
                  data-src="https://meetings-na2.hubspot.com/dave-milliken?embed=true"
                  data-testid="hubspot-embed-above"
                ></div>
              </div>
            </div>
          </div>
        </section>

        <SocialProof />

        <section className="py-20 bg-sage-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-forest-900 mb-12 text-center font-recoleta">
              Sage Magic Meal Plans
            </h2>
            <div className="max-w-5xl mx-auto">
              <img
                src="/sage-meal-planning-magic-workflow.png"
                alt="Sage meal planning workflow"
                className="w-full rounded-2xl shadow-lg"
                data-testid="img-workflow"
              />
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-forest-900 mb-4 font-recoleta">
              See Sage In Action
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Get a personalized demo tailored to your business needs
            </p>

            <div className="w-full max-w-4xl mx-auto">
              <div
                className="meetings-iframe-container"
                data-src="https://meetings-na2.hubspot.com/dave-milliken?embed=true"
                data-testid="hubspot-embed-below"
              ></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
