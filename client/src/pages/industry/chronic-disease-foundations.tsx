import React from "react";
import { Navigation } from "@/components/layout/navigation";

export default function ChronicDiseaseFoundationsPage() {
  return (
    <>
      <title>Chronic Disease Foundations - Sage Meal Planning Platform</title>
      <meta name="description" content="Support your foundation's mission with Sage's AI-powered meal planning platform designed for chronic disease management and healthy living." />

      <div className="min-h-screen bg-cream-50">
        <Navigation />
        <main>
          {/* Hero Section */}
          <section className="pt-40 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <img 
                  src="/sage-healthy-weekly-meal-planner.jpg" 
                  alt="Sage for Chronic Disease Foundations" 
                  className="w-full max-w-4xl mx-auto mb-12 rounded-2xl shadow-2xl"
                />
                <h1 className="text-5xl md:text-6xl font-bold text-forest-900 mb-6 font-recoleta">
                  Coming Soon
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Support your foundation's mission with Sage's evidence-based meal planning platform. Help individuals manage chronic conditions through personalized nutrition guidance, medication-friendly meal suggestions, and lifestyle interventions that improve health outcomes while reducing healthcare costs.
                </p>
              </div>
            </div>
          </section>

          {/* Demo Section */}
          <section id="demo" className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl font-bold text-forest-900 mb-4 font-recoleta">
                See Sage In Action
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                Get a personalized demo tailored to your business needs
              </p>
              
              {/* HubSpot Meeting Embed */}
              <div 
                dangerouslySetInnerHTML={{
                  __html: `<!-- Start of Meetings Embed Script -->
<div class="meetings-iframe-container" data-src="https://meetings-na2.hubspot.com/dave-milliken?embed=true"></div>
<script type="text/javascript" src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"></script>
<!-- End of Meetings Embed Script -->`
                }}
              />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}