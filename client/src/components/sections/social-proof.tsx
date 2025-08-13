import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { socialProofData } from "@/data/social-proof";

export default function SocialProof() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const totalTestimonials = socialProofData.length;

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % totalTestimonials);
  };

  const previousTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + totalTestimonials) % totalTestimonials);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-forest-900 mb-4" data-testid="text-social-proof-title">
            Beloved by Users: See What Consumers Say About Their Sage Experience
          </h2>
          <p className="text-xl text-gray-600">Real families sharing how Sage transformed their meal planning</p>
        </div>
        
        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500" 
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              data-testid="testimonial-slider"
            >
              {socialProofData.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-sage-50 rounded-2xl p-8 lg:p-12 text-center">
                    <div className="mb-6">
                      <Quote className="text-sage-500 w-8 h-8 mx-auto" />
                    </div>
                    <blockquote className="text-xl text-gray-700 mb-8 leading-relaxed" data-testid={`testimonial-quote-${index}`}>
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center justify-center">
                      <div className="mr-4">
                        <img 
                          src={testimonial.avatar} 
                          alt={`${testimonial.name} profile`} 
                          className="w-16 h-16 rounded-full" 
                          data-testid={`testimonial-avatar-${index}`}
                        />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-forest-900" data-testid={`testimonial-name-${index}`}>
                          {testimonial.name}
                        </div>
                        <div className="text-gray-600" data-testid={`testimonial-title-${index}`}>
                          {testimonial.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            onClick={previousTestimonial}
            data-testid="button-previous-testimonial"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            onClick={nextTestimonial}
            data-testid="button-next-testimonial"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </Button>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {socialProofData.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-sage-500' : 'bg-gray-300'
                }`}
                onClick={() => goToTestimonial(index)}
                data-testid={`button-testimonial-dot-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
