import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { UserCircle, Calendar, ShoppingCart, Lightbulb } from "lucide-react";
import DemoForm from "./demo-form";

export default function ProductOverview() {
  const workflowSteps = [
    {
      number: "1",
      title: "Profile Setup",
      description: "Customer completes preferences and dietary requirements"
    },
    {
      number: "2", 
      title: "AI Planning",
      description: "Algorithm generates personalized weekly meal plan"
    },
    {
      number: "3",
      title: "Smart Shopping", 
      description: "Optimized shopping list drives store visits"
    },
    {
      number: "4",
      title: "Cooking Support",
      description: "Step-by-step guidance ensures success"
    }
  ];

  return (
    <section id="product" className="py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-forest-900 mb-6" data-testid="text-product-title">
            Transform Macro Health Trends Into Brand Loyalty
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Consumers are more focused than ever on their health. Sage's white-labeled meal planning service makes weekly meal planning and buying easier than ever. Are you ready to be your customers' health hero with the best meal planning app?
          </p>
        </div>
        
        {/* Product Screenshots */}
        <div className="mb-20 flex justify-center">
          <img 
            src="/sage-healthy-meal-plans-app.jpg" 
            alt="Sage healthy meal planning app interface showing personalized weekly meal plans and nutrition tracking" 
            className="rounded-2xl shadow-2xl max-w-4xl w-full h-auto" 
            data-testid="img-product-screenshot"
          />
        </div>
        
        {/* What Sage Does Accordion */}
        <div className="max-w-4xl mx-auto mb-20">
          <h3 className="text-2xl font-bold text-forest-900 mb-8 text-center" data-testid="text-accordion-title">
            Sage Magic Meal Plans
          </h3>
          
          <Accordion type="single" collapsible defaultValue="gets-to-know" className="space-y-4">
            <AccordionItem value="gets-to-know" className="bg-white rounded-xl shadow-sm overflow-hidden border-0">
              <AccordionTrigger className="px-6 py-6 hover:bg-gray-50 transition-colors [&[data-state=open]>div>svg]:rotate-180" data-testid="button-accordion-gets-to-know">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center mr-4">
                    <UserCircle className="text-sage-500 w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-forest-900">Gets to Know Your Customers</h4>
                    <p className="text-gray-600">Understand customer preferences and dietary needs</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6" data-testid="content-accordion-gets-to-know">
                <p className="text-gray-600 leading-relaxed">
                  Sage uses cutting-edge AI tools to analyze shopping patterns, dietary restrictions, and personal preferences to build detailed customer profiles. Our meal planning app gets wiser with each food decision and recipe rating, creating better healthy meal plans over time.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="meal-planning" className="bg-white rounded-xl shadow-sm overflow-hidden border-0">
              <AccordionTrigger className="px-6 py-6 hover:bg-gray-50 transition-colors" data-testid="button-accordion-meal-planning">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center mr-4">
                    <Calendar className="text-sage-500 w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-forest-900">0-Touch Meal Plans</h4>
                    <p className="text-gray-600">The fastest possible meal plans plus easy online ordering</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6" data-testid="content-accordion-meal-planning">
                <p className="text-gray-600 leading-relaxed">
                  Sage automatically generates personalized weekly meal plans for your customers based on budget, preference, and schedule. Our meal planner pushes ingredients directly into online grocery shopping carts with your preferred brands.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="execution" className="bg-white rounded-xl shadow-sm overflow-hidden border-0">
              <AccordionTrigger className="px-6 py-6 hover:bg-gray-50 transition-colors" data-testid="button-accordion-execution">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center mr-4">
                    <ShoppingCart className="text-sage-500 w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-forest-900">Easy Execution</h4>
                    <p className="text-gray-600">Seamless shopping and cooking guidance</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6" data-testid="content-accordion-execution">
                <p className="text-gray-600 leading-relaxed">
                  Sage uses the power of AI to provide step-by-step cooking instructions, prep guidance, and pairing combos to ensure success.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="advice" className="bg-white rounded-xl shadow-sm overflow-hidden border-0">
              <AccordionTrigger className="px-6 py-6 hover:bg-gray-50 transition-colors" data-testid="button-accordion-advice">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center mr-4">
                    <Lightbulb className="text-sage-500 w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-forest-900">Your Personal Health Coach</h4>
                    <p className="text-gray-600">Ongoing health and nutrition guidance</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6" data-testid="content-accordion-advice">
                <p className="text-gray-600 leading-relaxed">
                  Your customers can use Sage's proprietary languance AI model at anytime to get diet, exercise and health advice driving deeper engagement with your brand.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* How Sage Makes Meal Magic */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-forest-900 mb-12 text-center" data-testid="text-workflow-title">
            How Sage Makes Meal Magic
          </h3>
          <div className="flex justify-center">
            <img 
              src="/sage-meal-planning-magic-workflow.png" 
              alt="Sage meal planning workflow showing the circular process: Consumer Health Profiles leading to AI Meal Plans, then Smart Shopping, Sage Assistant, Continuous Improvement, and back to profiles" 
              className="rounded-2xl shadow-lg max-w-5xl w-full h-auto" 
              data-testid="img-workflow-diagram"
            />
          </div>
        </div>

        {/* Secondary Demo Form */}
        <DemoForm />
      </div>
    </section>
  );
}
