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

                  {/* HubSpot Meeting Embed */}
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-forest-900 mb-6 font-recoleta">
                      Ready to Learn More?
                    </h3>
                    <p className="text-lg text-gray-600 mb-8">
                      Schedule a personalized demo to see how Sage can transform your business.
                    </p>
                    
                    {/* HubSpot Meetings Embed */}
                    <div className="hubspot-meeting-embed">
                      <iframe 
                        src="https://meetings.hubspot.com/sage-demo/discovery-call"
                        width="100%" 
                        height="600"
                        frameBorder="0"
                        className="rounded-lg"
                        title="Schedule a meeting with Sage"
                      ></iframe>
                    </div>
                    
                    {/* Fallback Button */}
                    <div className="mt-8">
                      <Button 
                        className="bg-sage-600 hover:bg-sage-700 text-white px-12 py-6 text-lg font-recoleta tracking-wider"
                        onClick={() => window.open('https://meetings.hubspot.com/sage-demo/discovery-call', '_blank')}
                        data-testid="button-schedule-demo"
                      >
                        Schedule Demo
                      </Button>
                    </div>
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