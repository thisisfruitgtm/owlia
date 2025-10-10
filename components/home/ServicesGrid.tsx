import ServiceCard from "@/components/ui/ServiceCard";

export default function ServicesGrid() {
  return (
    <section className="py-20 bg-white" id="servicii">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-navy mb-4 text-center">
          Servicii
        </h2>
        <p className="text-lg text-gray mb-12 text-center">
          3 piloni pentru creșterea ta
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard
            icon="📊"
            title="Marketing Digital"
            description="SEO, Google Ads, Social Media și Email Marketing. Trafic calificat care generează vânzări, nu doar vizite."
            href="/servicii/marketing-digital"
          />
          <ServiceCard
            icon="💻"
            title="Web Design & Development"
            description="Website-uri rapide, responsive și optimizate pentru conversie. Construite cu tehnologie modernă."
            href="/servicii/web-design"
          />
          <ServiceCard
            icon="🎨"
            title="Branding Complet"
            description="Logo, identitate vizuală și materiale print. Brand memorabil care te diferențiază de concurență."
            href="/servicii/branding"
          />
        </div>
      </div>
    </section>
  );
}

