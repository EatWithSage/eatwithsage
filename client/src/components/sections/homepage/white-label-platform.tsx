import { Check } from "lucide-react";

const points = [
  "Retailer-branded shopper experience",
  "Retailer assortment and product catalog",
  "Connection to the retailer's ecommerce journey",
  "Configurable content and media opportunities",
  "Designed to complement existing loyalty and retail media programs",
  "Consistent with the retailer's brand and customer experience",
];

// Three clearly fictional grocery retailer names.
// None are known active grocery banners.
// TODO: replace mock brand names and colors with approved retailer-branded assets.
const retailers = [
  {
    name: "Retailer Brand A",
    sub: "Weekly Meal Planner",
    headerBg: "bg-sage-600",
    accentBg: "bg-sage-500",
    pillBg: "bg-sage-100",
    pillText: "text-sage-700",
    meals: ["Herb-roasted chicken", "Pasta primavera", "Grilled salmon"],
  },
  {
    name: "Retailer Brand B",
    sub: "Your Weekly Plan",
    headerBg: "bg-amber-700",
    accentBg: "bg-amber-500",
    pillBg: "bg-amber-50",
    pillText: "text-amber-800",
    meals: ["Seasonal grain bowl", "Vegetable stir-fry", "Lentil soup"],
  },
  {
    name: "Retailer Brand C",
    sub: "Shop Your Week",
    headerBg: "bg-slate-700",
    accentBg: "bg-slate-500",
    pillBg: "bg-slate-100",
    pillText: "text-slate-700",
    meals: ["Roasted root vegetables", "Grain bowls", "Baked salmon"],
  },
];

export default function WhiteLabelPlatform() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sage-600 font-semibold text-sm tracking-widest uppercase mb-4">
            White-Label Platform
          </p>
          <h2 className="text-4xl font-bold font-recoleta text-forest-900 leading-tight mb-6">
            Built by Sage Branded as You
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Sage works behind the scenes so the grocer remains at the center of the customer
            relationship.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start mb-16">

          {/* Left: supporting points + featured statement */}
          <div>
            <ul className="space-y-4 mb-10">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-sage-600" />
                  </div>
                  <span className="text-gray-700 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            {/* Featured statement */}
            <div className="bg-forest-900 rounded-2xl px-8 py-7">
              <p className="text-white text-xl font-recoleta font-semibold leading-snug">
                Shoppers engage with their grocer—not with a separate Sage destination.
              </p>
            </div>
          </div>

          {/* Right: three-brand visual placeholder */}
          {/* TODO: replace with approved retailer-branded design assets */}
          <div className="mt-12 lg:mt-0">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 text-center">
              One platform. Three retailer brands.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {retailers.map((retailer) => (
                <div
                  key={retailer.name}
                  className="rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                >
                  {/* Retailer-branded header */}
                  <div className={`${retailer.headerBg} px-3 py-2.5`}>
                    <p className="text-white font-bold font-recoleta text-xs leading-tight">
                      {retailer.name}
                    </p>
                    <p className="text-white/70 text-[10px] mt-0.5">{retailer.sub}</p>
                  </div>

                  {/* Same underlying meal plan UI structure */}
                  <div className="bg-white p-3 space-y-1.5">
                    {retailer.meals.map((meal) => (
                      <div
                        key={meal}
                        className={`${retailer.pillBg} ${retailer.pillText} rounded-md px-2 py-1.5 text-[10px] leading-tight`}
                      >
                        {meal}
                      </div>
                    ))}
                    <div className={`${retailer.accentBg} rounded-md px-2 py-1.5 text-center`}>
                      <span className="text-white text-[10px] font-semibold">Build Basket</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-gray-400 mt-5">
              {/* TODO: replace with approved retailer-branded interface screenshots */}
              Visual placeholder showing three example retailer brands. No real retailer logos used.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
