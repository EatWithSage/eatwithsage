import React from 'react';
import Navigation from '@/components/layout/navigation';
import { Button } from '@/components/ui/button';

interface ComingSoonPageProps {
  title: string;
  description: string;
  headerImage: string;
  imageAlt: string;
}

export function ComingSoonPage({ title, description, headerImage, imageAlt }: ComingSoonPageProps) {
  return (
    <>
      <title>{title} - Sage Meal Planning Platform</title>
      <meta name="description" content={description} />

      <div className="min-h-screen bg-cream-50">
        <Navigation />
        <main>
          {/* Hero Section */}
          <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center">
                {/* Header Image */}
                <div className="mb-12">
                  <img 
                    src={headerImage}
                    alt={imageAlt}
                    className="w-full max-w-4xl mx-auto h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>

                {/* Coming Soon Content */}
                <div className="max-w-3xl mx-auto">
                  <h1 className="text-5xl md:text-6xl font-bold text-forest-900 mb-8 font-recoleta">
                    {title}
                  </h1>
                  
                  <div className="bg-sage-100 border-2 border-sage-300 rounded-xl p-12 mb-12">
                    <h2 className="text-4xl font-bold text-sage-800 mb-6 font-recoleta">
                      Coming Soon
                    </h2>
                    <p className="text-xl text-sage-700 leading-relaxed">
                      {description}
                    </p>
                  </div>

                  {/* See Sage In Action Section */}
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <h3 className="text-3xl font-bold text-forest-900 mb-4 font-recoleta">
                      See Sage In Action
                    </h3>
                    <p className="text-lg text-gray-600 mb-8">
                      Get a personalized demo tailored to your business needs
                    </p>
                    
                    {/* HubSpot Meetings Embed */}
                    <div 
                      className="meetings-iframe-container" 
                      data-src="https://meetings-na2.hubspot.com/dave-milliken?embed=true"
                    ></div>
                    <script 
                      type="text/javascript" 
                      src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
                    ></script>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}