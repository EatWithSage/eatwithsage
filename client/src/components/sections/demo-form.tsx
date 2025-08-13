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
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Schedule Your Demo</h3>
                <p className="text-gray-600">Choose a time that works best for you and we'll send you a calendar invite.</p>
              </div>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Work Email *</label>
                  <input 
                    type="email" 
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                    placeholder="Enter your work email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                    placeholder="Enter your company name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent">
                    <option value="">Select company size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-1000">201-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent">
                    <option value="">Select preferred time</option>
                    <option value="morning">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                    <option value="evening">Evening (5 PM - 8 PM)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about your goals</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                    placeholder="What are you hoping to achieve with meal planning integration?"
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-sage-600 hover:bg-sage-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg tracking-wider"
                >
                  Request Demo
                </button>
              </form>
              
              <div className="text-center text-sm text-gray-500">
                <p>We'll contact you within 24 hours to schedule your personalized demo</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Secondary variant for final CTA
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12">
      <div 
        className="iframe-mask-container"
        style={{
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          height: '715px',
          padding: '8px',
          margin: '-8px'
        }}
      >
        <iframe 
          src="https://meetings-na2.hubspot.com/dave-milliken?embed=true"
          width="calc(100% + 16px)" 
          height="calc(100% + 16px)"
          data-hs-ignore="true" 
          style={{ 
            position: 'absolute',
            top: '-8px',
            left: '-8px',
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
    </div>
  );
}
