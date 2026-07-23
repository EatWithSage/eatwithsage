import { RefreshCw, Database, Building2 } from "lucide-react";

const pillars = [
  {
    icon: RefreshCw,
    title: "A Recurring High-Intent Occasion",
    body:
      "Shoppers make food decisions every week. That recurring, need-driven occasion gives grocers an opportunity to build engagement around usefulness—not only promotions and discounts.",
  },
  {
    icon: Database,
    title: "Richer Household Intent Signals",
    body:
      "Meal and shopping decisions can reveal preferences, occasions and unmet needs that transaction data alone may not explain. Sage helps grocers turn those signals into more relevant shopper experiences and media opportunities.",
  },
  {
    icon: Building2,
    title: "A Platform Under the Retailer's Brand",
    body:
      "The white-labeled experience keeps the grocer at the center of the shopper relationship while creating retailer-controlled opportunities for product discovery, ecommerce and media integration.",
  },
];

export default function RetailMediaOpportunity() {
  return (
    <section id="retail-media-opportunity" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sage-600 font-semibold text-sm tracking-widest uppercase mb-4">
            The Opportunity
          </p>
          <h2 className="text-4xl font-bold font-recoleta text-forest-900 leading-tight mb-6">
            Turn the Weekly Shopping Journey Into a New Media Opportunity
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Food decisions happen every week. Sage helps grocers build a more useful digital
            experience around that recurring journey—creating new opportunities for engagement,
            ecommerce and relevant brand participation.
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
