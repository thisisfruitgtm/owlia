import type { Metadata } from "next";
import Navigation from "@/components/ui/Navigation";
import CTASection from "@/components/ui/CTASection";
import CaseStudyCard from "@/components/ui/CaseStudyCard";

export const metadata: Metadata = {
  title: { default: "Branding", template: "%s | OWLIA" },
  description:
    "Brand memorabil care te diferențiază. Logo, identitate vizuală, manual de brand. Creăm branduri profesionale pentru afaceri noi.",
  alternates: { canonical: "/servicii/branding" },
  openGraph: {
    type: "website",
    url: "/servicii/branding",
    title: "Branding | OWLIA",
    description: "Brand memorabil care te diferențiază de concurență.",
    siteName: "OWLIA",
    locale: "ro_RO",
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Branding | OWLIA",
    description: "Brand memorabil care te diferențiază de concurență.",
    images: ["/opengraph-image"],
  },
};

export default function BrandingPage() {
  return (
    <>
      <Navigation />
      {/* JSON-LD: Service (Branding) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Servicii Branding",
            provider: {
              "@type": "Organization",
              name: "OWLIA",
              url: "https://owlia.ro",
            },
            areaServed: "RO",
            serviceType: "Branding",
            url: "https://owlia.ro/servicii/branding",
            description:
              "Brand memorabil: logo, identitate vizuală, manual de brand pentru afaceri noi.",
          }),
        }}
      />

      {/* Hero */}
      <section className="mt-20 pt-24 pb-20 bg-gradient-to-b from-cream to-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-navy leading-tight tracking-tight mb-6">
            Brand Memorabil
            <br />
            Care Te Diferențiază
          </h1>
          <p className="text-xl md:text-2xl text-gray max-w-4xl mb-10 leading-relaxed">
            Nu-ți trebuie doar un logo. Îți trebuie o identitate vizuală completă care să te facă să ieși în evidență și să inspire încredere din prima secundă.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/40123456789?text=Bună!%20Vreau%20să%20discutăm%20despre%20branding."
              className="inline-flex items-center gap-3 bg-navy text-white px-10 py-5 rounded-xl font-semibold text-lg hover:-translate-y-1 hover:shadow-xl transition-smooth"
            >
              💬 Începe Proiectul
            </a>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-navy mb-4 text-center">
            Ce Primești?
          </h2>
          <p className="text-lg text-gray mb-12 text-center">
            Identitate vizuală completă, gata de folosit
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎨",
                title: "Logo Profesional",
                description:
                  "Logo principal + variante (color, mono, invers) în toate formatele.",
              },
              {
                icon: "📘",
                title: "Manual de Identitate",
                description:
                  "Ghid complet: culori, fonturi, cum să folosești logo-ul corect.",
              },
              {
                icon: "💳",
                title: "Cărți de Vizită",
                description:
                  "Design personalizat, gata de print. Format pentru tipografie.",
              },
              {
                icon: "📄",
                title: "Documente",
                description:
                  "Template-uri pentru facturi, oferte, contracte cu branding-ul tău.",
              },
              {
                icon: "📱",
                title: "Social Media Kit",
                description:
                  "Cover-e Facebook, Instagram, LinkedIn cu dimensiuni exacte.",
              },
              {
                icon: "🖼️",
                title: "Materiale Print",
                description:
                  "Flyere, pliante, roll-up - tot ce ai nevoie pentru offline.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 bg-cream rounded-2xl hover:-translate-y-1 transition-smooth"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-navy mb-3">{item.title}</h3>
                <p className="text-gray">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-navy mb-4 text-center">
            Cum Lucrăm?
          </h2>
          <p className="text-lg text-gray mb-12 text-center">
            Proces colaborativ, transparent, cu revizii incluse
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                number: "1",
                title: "Discovery",
                description:
                  "Discutăm despre viziunea ta, valori, concurență și clientul ideal.",
              },
              {
                number: "2",
                title: "Concepts",
                description:
                  "Îți prezentăm 3 direcții creative diferite. Alegi ce rezonează.",
              },
              {
                number: "3",
                title: "Refinement",
                description:
                  "Lucrăm împreună la varianta aleasă. 2 runde de revizii incluse.",
              },
              {
                number: "4",
                title: "Delivery",
                description:
                  "Primești toate fișierele + manualul de identitate. Gata de folosit.",
              },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-navy text-white rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">
                  {step.title}
                </h3>
                <p className="text-gray">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-navy mb-4 text-center">
            Transformare de Brand
          </h2>
          <p className="text-lg text-gray mb-12 text-center">
            Cum am ajutat VipBebe să devină lider de piață
          </p>

          <div className="max-w-md mx-auto">
            <CaseStudyCard
              title="VipBebe.ro"
              industry="E-commerce - Produse Copii"
              metric="4 Milioane Lei Vânzări"
              description="Branding complet de la zero: logo, identitate vizuală, packaging și materiale pentru un magazin online care a ajuns la 4M lei vânzări anuale."
              image="👶"
              slug="vipbebe"
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-navy mb-4">Cât Costă?</h2>
          <p className="text-lg text-gray mb-12">
            Investiție în imaginea profesionistă a business-ului tău
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 bg-white rounded-2xl">
              <h3 className="text-2xl font-bold text-navy mb-2">Logo Simple</h3>
              <div className="text-4xl font-bold text-navy mb-4">
                De la 1.500 lei
              </div>
              <ul className="text-left space-y-3 mb-8">
                {[
                  "Logo profesional",
                  "3 concepte inițiale",
                  "2 runde revizii",
                  "Toate formatele (PNG, SVG, PDF)",
                  "Ghid rapid de utilizare",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-navy">✓</span>
                    <span className="text-gray">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-10 bg-navy text-white rounded-2xl relative scale-105">
              <div className="absolute -top-3 right-10 bg-white text-navy px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                Recomandat
              </div>
              <h3 className="text-2xl font-bold mb-2">Identitate Completă</h3>
              <div className="text-4xl font-bold mb-4">De la 4.500 lei</div>
              <ul className="text-left space-y-3 mb-8">
                {[
                  "Logo + toate variantele",
                  "Manual de identitate vizuală",
                  "Cărți de vizită",
                  "Template-uri documente",
                  "Social media kit",
                  "3 runde revizii",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-white">✓</span>
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-10 bg-white rounded-2xl">
              <h3 className="text-2xl font-bold text-navy mb-2">Brand Full</h3>
              <div className="text-4xl font-bold text-navy mb-4">La cerere</div>
              <ul className="text-left space-y-3 mb-8">
                {[
                  "Tot ce e la Identitate Completă +",
                  "Packaging design",
                  "Materiale print (flyere, roll-up)",
                  "Uniforma și merchandising",
                  "Strategia de brand",
                  "Sesiune foto produse/echipă",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-navy">✓</span>
                    <span className="text-gray">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Gata să construim un brand memorabil?"
        description="Discutăm despre viziunea ta și îți trimitem o ofertă personalizată în 24h."
        buttonText="Începe Proiectul"
        buttonHref="https://wa.me/40123456789?text=Bună!%20Vreau%20să%20discutăm%20despre%20branding."
      />

      {/* Footer */}
      <footer className="py-10 bg-gray-dark text-white/70 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm">
            &copy; 2025 OWLIA - Echipa ta de Marketing. Toate drepturile
            rezervate.
          </p>
        </div>
      </footer>
    </>
  );
}

