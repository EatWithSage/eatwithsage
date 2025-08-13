import { Heart, Lightbulb, Rocket, TrendingUp, Microscope, Code, Building } from "lucide-react";

export default function AboutTimeline() {
  const timelineItems = [
    {
      year: "2018",
      title: "The Wake-Up Call",
      description: "Our founder's heart attack at 45 sparked a mission to make healthy eating accessible to busy families everywhere.",
      icon: Heart
    },
    {
      year: "2019", 
      title: "The Vision",
      description: "Realized that technology could bridge the gap between nutritional knowledge and practical meal planning for millions of people.",
      icon: Lightbulb
    },
    {
      year: "2020",
      title: "First Launch", 
      description: "Launched our MVP with 100 beta families, achieving 85% weekly engagement and transforming how they approached meal planning.",
      icon: Rocket
    },
    {
      year: "2023",
      title: "Enterprise Focus",
      description: "Pivoted to B2B, partnering with retailers to bring personalized meal planning directly to their customers at scale.",
      icon: TrendingUp
    }
  ];

  const credentials = [
    {
      icon: Microscope,
      title: "Research Credibility", 
      description: "Our algorithms are based on peer-reviewed nutrition research and validated by registered dietitians."
    },
    {
      icon: Code,
      title: "Tech Expertise",
      description: "Built by former engineers from Google, Amazon, and Meta with deep machine learning experience."
    },
    {
      icon: Building,
      title: "Enterprise Experience",
      description: "Successfully scaled consumer products to millions of users with enterprise-grade reliability."
    }
  ];

  const companies = ["Google", "Amazon", "Meta", "Stanford"];

  return (
    <section id="about" className="py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-recoleta text-forest-900 mb-6" data-testid="text-about-title">
            The Sage Story
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Born from a personal mission to make healthy eating accessible and enjoyable for everyone
          </p>
        </div>
        
        {/* Hero Image */}
        <div className="mb-20">
          <img 
            src="/sage-healthy-weekly-meal-planner.jpg" 
            alt="Family enjoying a home-cooked meal together, representing Sage's mission to make healthy eating accessible and enjoyable" 
            className="rounded-2xl shadow-2xl w-full max-w-4xl mx-auto" 
            data-testid="img-about-hero"
          />
        </div>
        
        {/* Timeline */}
        <div className="max-w-4xl mx-auto mb-20">
          <h3 className="text-2xl font-bold font-recoleta text-forest-900 mb-12 text-center" data-testid="text-timeline-title">
            Our Journey
          </h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-sage-300"></div>
            
            <div className="space-y-12">
              {timelineItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="relative flex items-start" data-testid={`timeline-item-${index}`}>
                    <div className="flex-shrink-0 w-16 h-16 bg-sage-500 rounded-full flex items-center justify-center z-10">
                      <IconComponent className="text-white w-6 h-6" />
                    </div>
                    <div className="ml-8">
                      <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h4 className="text-lg font-semibold font-recoleta text-forest-900 mb-2">
                          {item.year} - {item.title}
                        </h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Reasons to Believe */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold font-recoleta text-forest-900 mb-12 text-center" data-testid="text-credentials-title">
            Reasons to Believe
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {credentials.map((credential, index) => {
              const IconComponent = credential.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-sm" data-testid={`credential-${index}`}>
                  <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="text-sage-500 w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-semibold font-recoleta text-forest-900 mb-4">{credential.title}</h4>
                  <p className="text-gray-600">{credential.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Company Credentials */}
        <div>
          <h3 className="text-2xl font-bold text-forest-900 mb-12 text-center" data-testid="text-companies-title">
            Our Credentials
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
            {companies.map((company, index) => (
              <div 
                key={index} 
                className="bg-gray-200 rounded-xl w-32 h-20 flex items-center justify-center"
                data-testid={`company-logo-${index}`}
              >
                <span className="text-gray-500 font-semibold">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
