import { useEffect } from "react";

interface DemoFormProps {
  variant?: "primary" | "secondary";
  className?: string;
}

export default function DemoForm({ variant = "primary", className = "" }: DemoFormProps) {
  // No need for HubSpot script with direct iframe approach

  if (variant === "primary") {
    return (
      <section id="demo" className={`py-16 bg-white ${className}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-forest-900 mb-4" data-testid="text-demo-title">
              See Sage In Action
            </h2>
            <p className="text-xl text-gray-600">Get a personalized demo tailored to your business needs</p>
          </div>
          
          <div className="bg-gradient-to-r from-sage-50 to-cream-100 rounded-2xl p-8 lg:p-12">
            <iframe 
              src="https://meetings-na2.hubspot.com/dave-milliken?embed=true"
              width="100%" 
              data-hs-ignore="true" 
              style={{ 
                minWidth: '312px', 
                minHeight: '615px', 
                height: '715px', 
                border: 'none',
                borderWidth: '0',
                borderStyle: 'none',
                boxShadow: 'none',
                outline: 'none',
                margin: '0',
                padding: '0'
              }}
              frameBorder="0"
              data-testid="hubspot-meeting-scheduler"
            ></iframe>
          </div>
        </div>
      </section>
    );
  }

  // Secondary variant for final CTA
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12">
      <iframe 
        src="https://meetings-na2.hubspot.com/dave-milliken?embed=true"
        width="100%" 
        data-hs-ignore="true" 
        style={{ 
          minWidth: '312px', 
          minHeight: '615px', 
          height: '715px', 
          border: 'none',
          borderWidth: '0',
          borderStyle: 'none',
          boxShadow: 'none',
          outline: 'none',
          margin: '0',
          padding: '0'
        }}
        frameBorder="0"
        data-testid="hubspot-meeting-scheduler-secondary"
      ></iframe>
    </div>
  );
}
