import type { Metadata } from "next";
import Navigation from "@/components/ui/Navigation";
import CTASection from "@/components/ui/CTASection";
import CaseStudyCard from "@/components/ui/CaseStudyCard";

export const metadata: Metadata = {
  title: { default: "Marketing Digital", template: "%s | OWLIA" },
  description:
    "Marketing digital care generează vânzări reale. SEO, Google Ads, Social Media și Email Marketing pentru afaceri 0-3 ani. Rezultate măsurabile.",
  alternates: { canonical: "/servicii/marketing-digital" },
  openGraph: {
    type: "website",
    url: "/servicii/marketing-digital",
    title: "Marketing Digital | OWLIA",
    description: "Marketing digital care generează vânzări reale pentru afaceri noi.",
    siteName: "OWLIA",
    locale: "ro_RO",
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing Digital | OWLIA",
    description: "Marketing digital care generează vânzări reale pentru afaceri noi.",
    images: ["/opengraph-image"],
  },
};

export default function MarketingDigitalPage() {
  return (
    <>
      <Navigation />
      {/* JSON-LD: Service (Marketing Digital) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Marketing Digital",
            provider: {
              "@type": "Organization",
              name: "OWLIA",
              url: "https://owlia.ro",
            },
            areaServed: "RO",
            serviceType: "Marketing Digital",
            url: "https://owlia.ro/servicii/marketing-digital",
            description:
              "SEO, Google Ads, Social Media și Email Marketing pentru afaceri noi.",
          }),
        }}
      />

      {/* Hero */}
      <section className="mt-20 pt-24 pb-20 bg-gradient-to-b from-cream to-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-navy leading-tight tracking-tight mb-6">
            Marketing Digital
            <br />
            Care Generează Vânzări
          </h1>
          <p className="text-xl md:text-2xl text-gray max-w-4xl mb-10 leading-relaxed">
            Nu facem marketing pentru like-uri. Facem marketing pentru clienți reali și vânzări măsurabile. SEO, Google Ads, Social Media - totul coordonat să-ți aducă rezultate.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/40123456789?text=Bună!%20Vreau%20să%20discutăm%20despre%20marketing%20digital."
              className="inline-flex items-center gap-3 bg-navy text-white px-10 py-5 rounded-xl font-semibold text-lg hover:-translate-y-1 hover:shadow-xl transition-smooth"
            >
              💬 Consultanță Gratuită
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-navy mb-4 text-center">
            Ce Servicii Oferim?
          </h2>
          <p className="text-lg text-gray mb-12 text-center">
            Tot ce ai nevoie pentru vizibilitate online
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🔍",
                title: "SEO",
                description:
                  "Optimizare pentru Google. Trafic organic calificat, fără costuri de publicitate.",
              },
              {
                icon: "📢",
                title: "Google Ads",
                description:
                  "Campanii publicitare care aduc clienți cu intenție de cumpărare.",
              },
              {
                icon: "📱",
                title: "Social Media",
                description:
                  "Facebook, Instagram, LinkedIn - conținut care convertește, nu doar distrage.",
              },
              {
                icon: "📧",
                title: "Email Marketing",
                description:
                  "Campanii automatizate care transformă leaduri în clienți fideli.",
              },
            ].map((service, i) => (
              <div
                key={i}
                className="p-8 bg-cream rounded-2xl hover:-translate-y-1 transition-smooth"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-navy mb-3">
                  {service.title}
                </h3>
                <p className="text-gray">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-navy mb-4 text-center">
            Cum Funcționează?
          </h2>
          <p className="text-lg text-gray mb-12 text-center">
            4 pași către rezultate măsurabile
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                number: "1",
                title: "Research",
                description:
                  "Analizăm concurența, targetul tău și comportamentul clienților din industria ta.",
              },
              {
                number: "2",
                title: "Setup",
                description:
                  "Configurăm Google Analytics, pixeli de tracking și campaniile tale de marketing.",
              },
              {
                number: "3",
                title: "Launch",
                description:
                  "Lansăm campaniile și începem să aducem trafic calificat către business-ul tău.",
              },
              {
                number: "4",
                title: "Optimize",
                description:
                  "Monitorizăm zilnic, testăm variante și îmbunătățim constant rezultatele.",
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

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-navy mb-4">Cât Costă?</h2>
          <p className="text-lg text-gray mb-12">
            Pachete flexibile adaptate bugetului tău
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-10 bg-cream rounded-2xl">
              <h3 className="text-2xl font-bold text-navy mb-2">Starter</h3>
              <div className="text-4xl font-bold text-navy mb-4">
                De la 1.500 lei
                <span className="text-xl">/lună</span>
              </div>
              <ul className="text-left space-y-3 mb-8">
                {[
                  "SEO On-Page",
                  "Google My Business",
                  "Social Media (1 platformă)",
                  "Raportare lunară",
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
                Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Growth</h3>
              <div className="text-4xl font-bold mb-4">
                De la 3.500 lei
                <span className="text-xl">/lună</span>
              </div>
              <ul className="text-left space-y-3 mb-8">
                {[
                  "Tot ce e la Starter +",
                  "Google Ads (buget inclus)",
                  "Social Media (2 platforme)",
                  "Email Marketing",
                  "Analize săptămânale",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-white">✓</span>
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-10 bg-cream rounded-2xl">
              <h3 className="text-2xl font-bold text-navy mb-2">Scale</h3>
              <div className="text-4xl font-bold text-navy mb-4">La cerere</div>
              <ul className="text-left space-y-3 mb-8">
                {[
                  "Tot ce e la Growth +",
                  "Campanii complexe multi-canal",
                  "Marketing automation",
                  "Consultanță strategică lunară",
                  "Dashboard personalizat",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-navy">✓</span>
                    <span className="text-gray">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-gray text-sm">
            * Prețurile nu includ bugetul de publicitate (Google Ads, Facebook Ads)
          </p>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-navy mb-4 text-center">
            Cazuri de Succes
          </h2>
          <p className="text-lg text-gray mb-12 text-center">
            Rezultate reale pentru clienții noștri
          </p>

          <div className="max-w-md mx-auto">
            <CaseStudyCard
              title="LaDaDa.ro"
              industry="HoReCa - Fast Food"
              metric="Dublu Trafic în 6 Luni"
              description="Strategie digitală completă: website nou, Google Ads local și optimizare Google My Business pentru comenzi online."
              image="🍔"
              slug="ladada"
            />
          </div>
        </div>
      </section>

      <CTASection
        title="Gata să începi?"
        description="Programează o consultanță gratuită de 30 de minute și află cum putem să-ți creștem business-ul."
        buttonText="Consultanță Gratuită"
        buttonHref="https://wa.me/40123456789?text=Bună!%20Vreau%20o%20consultanță%20despre%20marketing%20digital."
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

