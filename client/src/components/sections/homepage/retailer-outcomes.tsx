import { Tv2, ShoppingCart, Users, BarChart2 } from "lucide-react";

const supporting = [
  {
    icon: ShoppingCart,
    title: "Ecommerce Engine",
    body: "Connect personalized recommendations with the retailer's assortment and ecommerce journey.",
  },
  {
    icon: Users,
    title: "Shopper Loyalty",
    body: "Give households a useful reason to return to the grocer's digital experience every week.",
  },
  {
    icon: BarChart2,
    title: "New Shopper Insights",
    body: "Learn more about household preferences, meal occasions, unmet needs and future purchase intent.",
  },
];

export default function RetailerOutcomes() {
  return (
    <section className="py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sage-600 font-semibold text-sm tracking-widest uppercase mb-4">
            Retailer Value
          </p>
          <h2 className="text-4xl font-bold font-recoleta text-forest-900 leading-tight mb-6">
            One Platform. Four Sources of Value.
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Sage turns a more useful weekly shopping experience into new opportunities across
            media, ecommerce, loyalty and shopper understanding.
          </p>
        </div>

        {/* New Media Platform — dominant featured card */}
        <div className="bg-forest-900 rounded-2xl p-10 mb-6 flex flex-col lg:flex-row lg:items-center lg:gap-12">
          <div className="flex-1 mb-8 lg:mb-0">
            <div className="inline-flex items-center gap-3 bg-sage-500/20 rounded-xl px-4 py-2 mb-6">
              <Tv2 className="w-5 h-5 text-sage-300" />
              <span className="text-sage-300 font-semibold text-sm tracking-wide">
                New Media Platform
              </span>
            </div>
            <h3 className="text-3xl font-bold font-recoleta text-white leading-tight mb-4">
              Create retailer-controlled media opportunities around high-intent weekly food decisions.
            </h3>
          </div>
          <div className="lg:w-64 lg:flex-shrink-0">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <p className="text-sage-300 text-sm font-semibold uppercase tracking-widest mb-3">
                Why it matters
              </p>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-sage-400 mt-0.5">→</span>
                  High-intent, weekly engagement
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sage-400 mt-0.5">→</span>
                  Retailer-branded experience
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sage-400 mt-0.5">→</span>
                  Close to the point of purchase
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Three supporting outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supporting.map((outcome) => {
            const Icon = outcome.icon;
            return (
              <div
                key={outcome.title}
                className="bg-white rounded-2xl p-8 border border-sage-100"
              >
                <div className="w-11 h-11 bg-sage-100 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-sage-600" />
                </div>
                <h3 className="text-lg font-bold font-recoleta text-forest-900 mb-3">
                  {outcome.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">{outcome.body}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
