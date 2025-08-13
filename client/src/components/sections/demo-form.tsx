import { useEffect } from "react";

interface DemoFormProps {
  variant?: "primary" | "secondary";
  className?: string;
}

export default function DemoForm({ variant = "primary", className = "" }: DemoFormProps) {
  useEffect(() => {
    // Load HubSpot meetings embed script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
    script.async = true;
    document.head.appendChild(script);

    // Remove borders from HubSpot iframes after they load
    const removeBorders = () => {
      const iframes = document.querySelectorAll('iframe[src*="hubspot"], iframe[src*="meetings"], .meetings-iframe-container iframe');
      iframes.forEach((iframe) => {
        iframe.style.border = 'none';
        iframe.style.borderRadius = '0';
        iframe.style.boxShadow = 'none';
        iframe.style.outline = 'none';
      });
      
      const containers = document.querySelectorAll('.meetings-iframe-container');
      containers.forEach((container) => {
        container.style.border = 'none';
        container.style.borderRadius = '0';
        container.style.boxShadow = 'none';
      });
    };

    // Run border removal immediately and on intervals
    const interval = setInterval(removeBorders, 1000);
    setTimeout(removeBorders, 2000);
    setTimeout(removeBorders, 5000);

    return () => {
      clearInterval(interval);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

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
            <div 
              className="meetings-iframe-container border-0" 
              data-src="https://meetings-na2.hubspot.com/dave-milliken?embed=true&hide_branding=true"
              data-testid="hubspot-meeting-scheduler"
              style={{ border: 'none !important', borderRadius: '0 !important', boxShadow: 'none !important' }}
            ></div>
          </div>
        </div>
      </section>
    );
  }

  // Secondary variant for final CTA
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12">
      <div 
        className="meetings-iframe-container border-0" 
        data-src="https://meetings-na2.hubspot.com/dave-milliken?embed=true&hide_branding=true"
        data-testid="hubspot-meeting-scheduler-secondary"
        style={{ border: 'none !important', borderRadius: '0 !important', boxShadow: 'none !important' }}
      ></div>
    </div>
  );
}
