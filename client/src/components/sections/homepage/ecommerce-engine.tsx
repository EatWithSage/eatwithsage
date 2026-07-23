import { ArrowRight, ShoppingCart } from "lucide-react";

const processSteps = [
  "Understand household needs",
  "Recommend a personalized week",
  "Match ingredients to the retailer's assortment",
  "Let shoppers review or replace products",
  "Continue into the retailer's existing ecommerce journey",
];

const basketFlow = [
  { label: "Recommendation" },
  { label: "Ingredients" },
  { label: "Product selection" },
  { label: "Editable basket" },
  { label: "Retailer checkout" },
];

export default function EcommerceEngine() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sage-600 font-semibold text-sm tracking-widest uppercase mb-4">
            Ecommerce Engine
          </p>
          <h2 className="text-4xl font-bold font-recoleta text-forest-900 leading-tight mb-6">
            Media That Helps Build the Basket
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Most digital advertising ends with a click. Sage is designed to connect personalized
            food recommendations, relevant product discovery and the retailer's ecommerce experience.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">

          {/* Left: numbered process steps */}
          <div>
            <ol className="space-y-5">
              {processSteps.map((step, i) => (
                <li key={step} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-sage-700">{i + 1}</span>
                  </div>
                  <p className="text-lg text-forest-900 leading-snug pt-1.5">{step}</p>
                </li>
              ))}
            </ol>

            {/* Featured statement */}
            <div className="mt-10 bg-sage-50 border-l-4 border-sage-500 rounded-r-xl px-6 py-5">
              <p className="text-forest-900 font-semibold text-lg font-recoleta leading-snug">
                Sage does not simply send shoppers to ecommerce.{" "}
                <span className="text-sage-600">It helps create the basket.</span>
              </p>
            </div>
          </div>

          {/* Right: basket-building flow visual placeholder */}
          {/* TODO: replace with approved retailer-branded design asset */}
          <div className="mt-12 lg:mt-0">

            {/* Fictional retailer UI frame */}
            <div className="rounded-2xl overflow-hidden border border-sage-200 shadow-lg">

              {/* Fictional retailer header */}
              <div className="bg-sage-600 px-5 py-3 flex items-center justify-between">
                <span className="text-white font-bold font-recoleta">FreshMart</span>
                <div className="flex items-center gap-2 text-sage-100 text-sm">
                  <ShoppingCart className="w-4 h-4" />
                  <span>4 items</span>
                </div>
              </div>

              {/* 5-step basket flow */}
              <div className="bg-white p-6">
                <div className="space-y-2">
                  {basketFlow.map((step, i) => (
                    <div key={step.label}>
                      <div
                        className={`rounded-lg px-4 py-3 flex items-center justify-between text-sm font-medium ${
                          i === basketFlow.length - 1
                            ? "bg-sage-500 text-white"
                            : i === basketFlow.length - 2
                            ? "bg-sage-100 text-sage-800 border border-sage-200"
                            : "bg-cream-50 text-forest-900 border border-gray-100"
                        }`}
                      >
                        <span>{step.label}</span>
                        <span className="text-xs opacity-60">Step {i + 1}</span>
                      </div>
                      {i < basketFlow.length - 1 && (
                        <div className="flex justify-center py-1">
                          <ArrowRight className="w-4 h-4 text-sage-300 rotate-90" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-center text-xs text-gray-400 mt-5">
                  {/* TODO: replace with retailer-approved interface screenshot */}
                  Visual placeholder — fictional retailer brand "FreshMart". No real retailer logo used.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
