import { Zap, Clock, ShoppingCart } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "0-Touch Meal Planning",
    body: "Sage automatically prepares a personalized week of meals with little or no planning required from the shopper.",
  },
  {
    icon: Clock,
    title: "Everyday Convenience",
    body: "Households spend less time deciding what to eat, finding recipes and assembling a grocery list.",
  },
  {
    icon: ShoppingCart,
    title: "A Better Grocery Ecommerce Experience",
    body: "Shoppers move from personalized recommendations to a complete, editable basket without searching for every ingredient individually.",
  },
];

const mockMeals = [
  { day: "Monday", meal: "Roasted chicken with seasonal vegetables" },
  { day: "Wednesday", meal: "Pasta with tomato and fresh herbs" },
  { day: "Friday", meal: "Grilled fish with a side salad" },
];

export default function ShopperExperience() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sage-600 font-semibold text-sm tracking-widest uppercase mb-4">
            Shopper Experience
          </p>
          <h2 className="text-4xl font-bold font-recoleta text-forest-900 leading-tight mb-6">
            A Better Shopping Experience. Not Just More Advertising.
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            The media opportunity only works when the underlying shopper experience is
            genuinely useful.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">

          {/* Left: feature cards + callout */}
          <div>
            <div className="space-y-6 mb-10">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-5 bg-cream-50 rounded-2xl p-6 border border-sage-100"
                  >
                    <div className="w-10 h-10 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-sage-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-recoleta text-forest-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Featured shopper-facing callout */}
            <div className="bg-sage-500 rounded-2xl p-8 text-white">
              <p className="text-2xl font-bold font-recoleta leading-snug mb-3">
                Your Week Planned and Ready to Shop
              </p>
              <p className="text-sage-100 leading-relaxed">
                Personalized for your household. Connected to your grocer. Ready when you are.
              </p>
            </div>
          </div>

          {/* Right: visual placeholder — fictional retailer-branded weekly plan interface */}
          {/* TODO: replace with approved retailer-branded design asset */}
          <div className="mt-12 lg:mt-0">
            <div className="rounded-2xl overflow-hidden border border-sage-200 shadow-lg">

              {/* Fictional retailer header */}
              <div className="bg-sage-600 px-5 py-3 flex items-center justify-between">
                <span className="text-white font-bold font-recoleta">Harvest &amp; Main</span>
                <span className="text-sage-100 text-sm">Your Week</span>
              </div>

              {/* Mock weekly plan */}
              <div className="bg-white p-6">
                <p className="text-xs font-semibold text-sage-600 uppercase tracking-widest mb-4">
                  This Week's Plan
                </p>
                <div className="space-y-3 mb-6">
                  {mockMeals.map((item) => (
                    <div
                      key={item.day}
                      className="flex items-center gap-4 bg-cream-50 rounded-xl px-4 py-3 border border-sage-100"
                    >
                      <span className="text-xs font-bold text-sage-600 w-16 flex-shrink-0">
                        {item.day}
                      </span>
                      <span className="text-sm text-forest-900">{item.meal}</span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="w-full bg-sage-500 text-white rounded-xl py-3 text-sm font-semibold font-recoleta"
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  Build My Basket
                </button>
                <p className="text-center text-xs text-gray-400 mt-4">
                  {/* TODO: replace with retailer-approved interface screenshot */}
                  Visual placeholder — fictional retailer brand "Harvest &amp; Main". No real retailer logo used.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
