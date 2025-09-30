import React, { useEffect } from "react";
import { Navigation } from "@/components/layout/navigation";

export default function ShopRitePage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <title>ShopRite's Recipe for Brand Loyalty - Sage</title>
      <meta name="description" content="See how ShopRite uses Sage's AI-powered meal planning platform to drive brand loyalty and customer engagement." />

      <div className="min-h-screen bg-cream-50">
        <Navigation />
        <main>
          {/* Above the Fold Section */}
          <section className="pt-40 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-bold text-forest-900 mb-12 font-recoleta">
                  ShopRite's Recipe for Brand Loyalty
                </h1>
                
                {/* YouTube Video Embed */}
                <div className="w-full max-w-6xl mx-auto mb-16">
                  <div className="relative" style={{ paddingBottom: '56.25%' }}>
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl"
                      src="https://www.youtube.com/embed/5k2Ijsakxzk" 
                      title="Sage - ShopRite's Recipe for Brand Loyalty" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                      data-testid="video-shoprite-demo"
                    ></iframe>
                  </div>
                </div>

                {/* HubSpot Meeting Embed - Above Fold */}
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

          {/* Beloved by Users Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl md:text-5xl font-bold text-forest-900 mb-12 text-center font-recoleta">
                Beloved by Users: See What Consumers Say About Their Sage Experience
              </h2>
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-xl text-gray-600 leading-relaxed" data-testid="text-user-feedback">
                  Content coming soon - User testimonials and feedback will be displayed here.
                </p>
              </div>
            </div>
          </section>

          {/* Sage Magic Meal Plans Section */}
          <section className="py-20 bg-sage-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl md:text-5xl font-bold text-forest-900 mb-12 text-center font-recoleta">
                Sage Magic Meal Plans
              </h2>
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-xl text-gray-600 leading-relaxed" data-testid="text-meal-plans">
                  Content coming soon - Sage Magic Meal Plans information will be displayed here.
                </p>
              </div>
            </div>
          </section>

          {/* Final HubSpot Meeting Embed */}
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl font-bold text-forest-900 mb-4 font-recoleta">
                See Sage In Action
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                Get a personalized demo tailored to your business needs
              </p>
              
              {/* HubSpot Meeting Embed - Below Fold */}
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
    </>
  );
}
