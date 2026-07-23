const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function HomepageFinalCTA() {
  return (
    <section className="py-24 bg-forest-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold font-recoleta text-white leading-tight mb-6">
          Turn Your Weekly Shopper Experience Into a New Media Opportunity
        </h2>
        <p className="text-xl text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto">
          See how Sage can help your grocery brand create new media opportunities, strengthen
          ecommerce, deepen shopper relationships and uncover new sources of shopper insight.
        </p>
        <button
          onClick={() => scrollTo("demo")}
          className="inline-block bg-sage-500 text-white px-12 py-5 rounded-xl font-bold font-recoleta text-lg hover:bg-sage-400 transition-colors"
          data-testid="button-final-cta-request-demo"
        >
          Request a Retailer Demo
        </button>
      </div>
    </section>
  );
}
