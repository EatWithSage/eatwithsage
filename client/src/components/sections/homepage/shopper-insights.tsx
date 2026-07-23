const signals = [
  "Household food preferences",
  "Dietary requirements",
  "Meal occasions",
  "Convenience needs",
  "Product and ingredient interest",
  "Accepted and rejected recommendations",
  "Substitutions",
  "Future purchase intent",
];

export default function ShopperInsights() {
  return (
    <section className="py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">

          {/* Left: copy */}
          <div>
            <p className="text-sage-600 font-semibold text-sm tracking-widest uppercase mb-4">
              Shopper Insights
            </p>
            <h2 className="text-4xl font-bold font-recoleta text-forest-900 leading-tight mb-6">
              Understand the Decisions Behind the Basket
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-10">
              Transaction data can show what a shopper purchased. Sage can help reveal the
              needs and intentions that shaped the purchase.
            </p>

            {/* Signal types */}
            <p className="text-sm font-semibold text-forest-900 uppercase tracking-wider mb-4">
              Potential signals may include
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {signals.map((signal) => (
                <li
                  key={signal}
                  className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-sage-100 text-sm text-forest-900"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-400 flex-shrink-0" />
                  {signal}
                </li>
              ))}
            </ul>

            {/* Featured statement */}
            <div className="bg-white border-l-4 border-sage-500 rounded-r-xl px-6 py-5 mb-6">
              <p className="text-forest-900 font-semibold text-lg font-recoleta leading-snug">
                Move from knowing what shoppers bought to understanding what they are trying
                to accomplish.
              </p>
            </div>

            {/* Privacy statement */}
            <p className="text-sm text-gray-500 leading-relaxed">
              Designed to operate within the retailer's customer, consent and
              data-governance framework.
            </p>
          </div>

          {/* Right: visual placeholder — fictional retailer signals interface */}
          {/* TODO: replace with approved retailer-branded design asset */}
          <div className="mt-12 lg:mt-0">
            <div className="rounded-2xl overflow-hidden border border-sage-200 shadow-lg">

              {/* Fictional retailer header */}
              <div className="bg-sage-600 px-5 py-3 flex items-center justify-between">
                <span className="text-white font-bold font-recoleta">Harvest &amp; Main</span>
                <span className="text-sage-100 text-sm">Shopper Signals</span>
              </div>

              {/* Signal category visualization — no metrics or fabricated numbers */}
              <div className="bg-white p-6">
                <p className="text-xs font-semibold text-sage-600 uppercase tracking-widest mb-5">
                  Signal categories available
                </p>
                <div className="space-y-3">
                  {[
                    "Food preferences",
                    "Meal occasions",
                    "Dietary needs",
                    "Ingredient interest",
                    "Purchase intent signals",
                  ].map((category) => (
                    <div
                      key={category}
                      className="flex items-center gap-3 rounded-lg bg-cream-50 border border-sage-100 px-4 py-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-sage-400 flex-shrink-0" />
                      <span className="text-sm text-forest-900">{category}</span>
                    </div>
                  ))}
                </div>
                <p className="text-center text-xs text-gray-400 mt-6">
                  {/* TODO: replace with retailer-approved interface screenshot */}
                  Visual placeholder — fictional retailer brand "Harvest &amp; Main". No real retailer logo used. No performance metrics shown.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
