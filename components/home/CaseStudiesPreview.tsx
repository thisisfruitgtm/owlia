import CaseStudyCard from "@/components/ui/CaseStudyCard";

export default function CaseStudiesPreview() {
  return (
    <section className="py-20 bg-white" id="case-studies">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-navy mb-4 text-center">
          Cazuri de Succes
        </h2>
        <p className="text-lg text-gray mb-12 text-center">
          Rezultate reale pentru clienți reali
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <CaseStudyCard
            title="VipBebe.ro"
            industry="E-commerce - Produse Copii"
            metric="4 Milioane Lei Vânzări"
            description="Strategie completă: branding, website și marketing digital pentru un magazin online de la 0 la lider de piață în 2 ani."
            image="👶"
            slug="vipbebe"
          />
          <CaseStudyCard
            title="LaDaDa.ro"
            industry="HoReCa - Fast Food"
            metric="Dublu Trafic în 6 Luni"
            description="Website nou, Google Ads local și optimizare Google My Business pentru creștere rapidă a comenzilor online."
            image="🍔"
            slug="ladada"
          />
          <CaseStudyCard
            title="Atelierul de Business"
            industry="Servicii & Consultanță"
            metric="+45% Conversie Funnel"
            description="Redesign platformă, marketing automation și sales funnel automatizat pentru conversii crescute și timp economisit."
            image="💼"
            slug="atelier-de-business"
          />
        </div>
      </div>
    </section>
  );
}

