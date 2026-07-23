import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Personalized",
    body: "Sage creates weekly food recommendations around each household's preferences, dietary needs, schedule and shopping behavior.",
  },
  {
    number: "02",
    title: "Shoppable",
    body: "Recommendations are connected to the grocer's assortment and transformed into a complete, editable ecommerce basket.",
  },
  {
    number: "03",
    title: "Monetizable",
    body: "Relevant products and brands can be integrated into the experience, creating new retailer-controlled media opportunities close to the point of purchase.",
  },
];

const flowSteps = [
  { label: "Household Needs" },
  { label: "Personalized Recommendations" },
  { label: "Relevant Product Opportunities" },
  { label: "Shoppable Basket" },
];

export default function HowSageWorks() {
  return (
    <section id="how-sage-works" className="py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sage-600 font-semibold text-sm tracking-widest uppercase mb-4">
            How Sage Works
          </p>
          <h2 className="text-4xl font-bold font-recoleta text-forest-900 leading-tight mb-6">
            From Weekly Food Decisions to Measurable Commerce
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Sage connects a useful shopper experience with ecommerce and new media
            opportunities—all under the retailer's brand.
          </p>
        </div>

        {/* Three-step cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((step) => (
            <div key={step.number} className="bg-white rounded-2xl p-8 border border-sage-100">
              <div className="text-3xl font-bold font-recoleta text-sage-200 mb-4 leading-none">
                {step.number}
              </div>
              <h3 className="text-xl font-bold font-recoleta text-forest-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>

        {/* Visual flow placeholder — fictional retailer-branded UI mockup */}
        {/* TODO: replace with approved retailer-branded design asset */}
        <div className="rounded-2xl overflow-hidden border border-sage-200 shadow-lg">

          {/* Fictional retailer browser chrome */}
          <div className="bg-forest-900 px-6 py-4 flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
            </div>
            <div className="flex-1 bg-white/10 rounded-md px-4 py-1.5 text-sm text-white/60 font-mono">
              freshmart.com/meal-planner
            </div>
          </div>

          {/* Fictional retailer top bar */}
          <div className="bg-sage-600 px-6 py-3 flex items-center justify-between">
            <span className="text-white font-bold font-recoleta text-lg tracking-wide">
              FreshMart
            </span>
            <span className="text-sage-100 text-sm">
              Weekly Meal Planner — Powered by your preferences
            </span>
          </div>

          {/* Four-stage flow */}
          <div className="bg-white p-8">
            <div className="flex flex-col sm:flex-row items-stretch gap-0">
              {flowSteps.map((step, i) => (
                <div key={step.label} className="flex items-center flex-1">
                  <div className="flex-1 bg-cream-50 border border-sage-100 rounded-xl p-5 text-center">
                    <div className="w-8 h-8 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-sage-700 font-bold text-sm">{i + 1}</span>
                    </div>
                    <p className="text-sm font-semibold text-forest-900 leading-snug">
                      {step.label}
                    </p>
                  </div>
                  {i < flowSteps.length - 1 && (
                    <div className="hidden sm:flex px-2 flex-shrink-0">
                      <ArrowRight className="w-5 h-5 text-sage-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-gray-400 mt-6">
              {/* TODO: replace with retailer-approved interface screenshot */}
              Visual placeholder — fictional retailer brand "FreshMart". No real retailer logo used.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
