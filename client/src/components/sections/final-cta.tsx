import DemoForm from "./demo-form";

export default function FinalCTA() {
  return (
    <section className="py-20 bg-forest-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6 text-white" data-testid="text-final-cta-title">
          Ready To Transform Your Customer Experience?
        </h2>
        <p className="text-xl mb-12 text-gray-200">
          Join leading retailers who are already using Sage to drive customer engagement and sales growth.
        </p>
        
        <DemoForm variant="secondary" />
      </div>
    </section>
  );
}
