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
      // Target all possible HubSpot elements
      const selectors = [
        'iframe[src*="hubspot"]',
        'iframe[src*="meetings"]',
        '.meetings-iframe-container iframe',
        '.meetings-iframe-container > div',
        '.meetings-iframe-container',
        '[data-testid="hubspot-meeting-scheduler"] iframe',
        '[data-testid="hubspot-meeting-scheduler-secondary"] iframe',
        '.hs-meeting-embed',
        '.hs-meeting-widget'
      ];
      
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          element.style.border = 'none';
          element.style.borderRadius = '0';
          element.style.boxShadow = 'none';
          element.style.outline = 'none';
          element.style.margin = '-1px';
          element.style.padding = '0';
          
          // Also try to access iframe content if same origin
          try {
            if (element.tagName === 'IFRAME' && element.contentDocument) {
              const iframeBody = element.contentDocument.body;
              if (iframeBody) {
                iframeBody.style.border = 'none';
                iframeBody.style.margin = '0';
                iframeBody.style.padding = '0';
              }
            }
          } catch (e) {
            // Cross-origin iframe, can't access content
          }
        });
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
            <div className="overflow-hidden" style={{ margin: '-2px', padding: '2px' }}>
              <div 
                className="meetings-iframe-container border-0" 
                data-src="https://meetings-na2.hubspot.com/dave-milliken?embed=true&hide_branding=true"
                data-testid="hubspot-meeting-scheduler"
                style={{ 
                  border: 'none !important', 
                  borderRadius: '0 !important', 
                  boxShadow: 'none !important',
                  margin: '-1px',
                  transform: 'scale(1.002)'
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Secondary variant for final CTA
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12">
      <div className="overflow-hidden" style={{ margin: '-2px', padding: '2px' }}>
        <div 
          className="meetings-iframe-container border-0" 
          data-src="https://meetings-na2.hubspot.com/dave-milliken?embed=true&hide_branding=true"
          data-testid="hubspot-meeting-scheduler-secondary"
          style={{ 
            border: 'none !important', 
            borderRadius: '0 !important', 
            boxShadow: 'none !important',
            margin: '-1px',
            transform: 'scale(1.002)'
          }}
        ></div>
      </div>
    </div>
  );
}
