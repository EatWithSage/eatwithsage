import { RefreshCw, Database, Building2 } from "lucide-react";

const pillars = [
  {
    icon: RefreshCw,
    title: "A recurring, high-intent touchpoint",
    body:
      "Shoppers make food decisions every week. That predictable, need-driven engagement creates a digital relationship that doesn't depend on promotions or discounts to sustain itself.",
  },
  {
    icon: Database,
    title: "Household intent data at scale",
    body:
      "Every food decision surfaces real-time signals—what households buy, when, and why. Those signals belong to the retailer and form the foundation of a differentiated, first-party media offering.",
  },
  {
    icon: Building2,
    title: "A platform the retailer owns",
    body:
      "A white-labeled platform keeps the shopper relationship, the data, and the media inventory entirely inside the retailer's brand ecosystem—not shared with a third-party network.",
  },
];

export default function RetailMediaOpportunity() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sage-600 font-semibold text-sm tracking-widest uppercase mb-4">
            The Opportunity
          </p>
          <h2 className="text-4xl font-bold font-recoleta text-forest-900 leading-tight mb-6">
            The Weekly Shopping Journey Is Your Most Valuable Digital Asset
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Food decisions happen every week. Grocers who build the right platform around that
            recurring journey own the data, the relationship, and the media value that comes with it.
          </p>
        </div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-cream-50 rounded-2xl p-8 border border-sage-100"
              >
                <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-sage-600" />
                </div>
                <h3 className="text-xl font-bold font-recoleta text-forest-900 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{pillar.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
