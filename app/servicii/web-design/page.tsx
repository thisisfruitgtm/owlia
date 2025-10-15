import type { Metadata } from "next";
import Navigation from "@/components/ui/Navigation";
import CTASection from "@/components/ui/CTASection";

export const metadata: Metadata = {
  title: { default: "Web Design & Development", template: "%s | OWLIA" },
  description:
    "Website-uri responsive care convertesc vizitatori în clienți. Next.js, React, design modern. Optimizate pentru viteză și conversie.",
  alternates: { canonical: "/servicii/web-design" },
  openGraph: {
    type: "website",
    url: "/servicii/web-design",
    title: "Web Design & Development | OWLIA",
    description: "Website-uri care convertesc vizitatori în clienți.",
    siteName: "OWLIA",
    locale: "ro_RO",
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design & Development | OWLIA",
    description: "Website-uri care convertesc vizitatori în clienți.",
    images: ["/opengraph-image"],
  },
};

export default function WebDesignPage() {
  return (
    <>
      <Navigation />
      {/* JSON-LD: Service (Web Design) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Web Design & Development",
            provider: {
              "@type": "Organization",
              name: "OWLIA",
              url: "https://owlia.ro",
            },
            areaServed: "RO",
            serviceType: "Web Design",
            url: "https://owlia.ro/servicii/web-design",
            description:
              "Website-uri responsive care convertesc vizitatori în clienți.",
          }),
        }}
      />

      {/* Hero */}
      <section className="mt-20 pt-24 pb-20 bg-gradient-to-b from-cream to-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-navy leading-tight tracking-tight mb-6">
            Website-uri Care
            <br />
            Convertesc Vizitatori în Clienți
          </h1>
          <p className="text-xl md:text-2xl text-gray max-w-4xl mb-10 leading-relaxed">
            Un site frumos nu ajunge. Îți construim website-uri rapide, optimizate pentru Google și designate să transforme vizitatorii în clienți plătitori.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/40123456789?text=Bună!%20Vreau%20o%20ofertă%20pentru%20un%20website."
              className="inline-flex items-center gap-3 bg-navy text-white px-10 py-5 rounded-xl font-semibold text-lg hover:-translate-y-1 hover:shadow-xl transition-smooth"
            >
              💬 Solicită Ofertă
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-navy mb-4 text-center">
            De Ce Website-urile Noastre Funcționează?
          </h2>
          <p className="text-lg text-gray mb-12 text-center">
            Nu facem site-uri să arate bine. Le facem să vândă.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "📱",
                title: "Responsive",
                description:
                  "Perfect pe telefon, tabletă și desktop. Majoritatea clienților tăi navighează de pe mobil.",
              },
              {
                icon: "⚡",
                title: "Rapid",
                description:
                  "Sub 2 secunde încărcare. Google penalizează site-urile lente.",
              },
              {
                icon: "🔍",
                title: "SEO Optimizat",
                description:
                  "Structură perfectă pentru Google. Te găsesc clienții când caută.",
              },
              {
                icon: "🎯",
                title: "Conversion-Focused",
                description:
                  "Design bazat pe psihologie. Butoane, culori și mesaje care converg.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 bg-cream rounded-2xl hover:-translate-y-1 transition-smooth"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-navy mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-navy mb-4">
            Tehnologie Modernă
          </h2>
          <p className="text-lg text-gray mb-12">
            Folosim cele mai bune tool-uri pentru performanță maximă
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Next.js & React",
                description:
                  "Framework modern pentru site-uri rapide și SEO-friendly.",
              },
              {
                name: "Tailwind CSS",
                description:
                  "Design system profesionist, consistent și ușor de întreținut.",
              },
              {
                name: "PostgreSQL",
                description:
                  "Bază de date robustă pentru platforme complexe și aplicații web.",
              },
            ].map((tech, i) => (
              <div key={i} className="p-8 bg-white rounded-2xl">
                <h3 className="text-xl font-bold text-navy mb-3">{tech.name}</h3>
                <p className="text-gray">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-navy mb-4 text-center">
            Website-uri Create de Noi
          </h2>
          <p className="text-lg text-gray mb-12 text-center">
            Portofoliu variat: e-commerce, HoReCa, servicii
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                emoji: "👶",
                name: "VipBebe.ro",
                industry: "E-commerce",
                description: "Magazin online produse copii - 4M lei vânzări anuale",
              },
              {
                emoji: "🍔",
                name: "LaDaDa.ro",
                industry: "Fast Food",
                description: "Website + comenzi online pentru fast food local",
              },
              {
                emoji: "💼",
                name: "Atelier de Business",
                industry: "Consultanță",
                description: "Platform de training cu funnel automatizat",
              },
            ].map((project, i) => (
              <div
                key={i}
                className="p-8 bg-cream rounded-2xl hover:-translate-y-1 transition-smooth"
              >
                <div className="text-6xl mb-4 text-center">{project.emoji}</div>
                <div className="text-sm font-semibold text-navy/60 mb-1 uppercase tracking-wide text-center">
                  {project.industry}
                </div>
                <h3 className="text-xl font-bold text-navy mb-3 text-center">
                  {project.name}
                </h3>
                <p className="text-gray text-center">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-navy mb-4">Cât Costă?</h2>
          <p className="text-lg text-gray mb-12">
            Investiție unică, rezultate pe termen lung
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 bg-white rounded-2xl">
              <h3 className="text-2xl font-bold text-navy mb-2">Landing Page</h3>
              <div className="text-4xl font-bold text-navy mb-4">
                De la 2.500 lei
              </div>
              <ul className="text-left space-y-3 mb-8">
                {[
                  "1 pagină optimizată",
                  "Design personalizat",
                  "Responsive (mobil + desktop)",
                  "Formular de contact",
                  "SEO basic",
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
              <h3 className="text-2xl font-bold mb-2">Website Complet</h3>
              <div className="text-4xl font-bold mb-4">De la 7.500 lei</div>
              <ul className="text-left space-y-3 mb-8">
                {[
                  "8-10 pagini",
                  "Design & branding personalizat",
                  "CMS (actualizezi singur conținutul)",
                  "SEO complet",
                  "Integrări (Google Analytics, etc)",
                  "Training 1 oră",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-white">✓</span>
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-10 bg-white rounded-2xl">
              <h3 className="text-2xl font-bold text-navy mb-2">E-Commerce</h3>
              <div className="text-4xl font-bold text-navy mb-4">La cerere</div>
              <ul className="text-left space-y-3 mb-8">
                {[
                  "Magazin online complet",
                  "Plăți online (card, PayPal)",
                  "Gestiune produse & stocuri",
                  "Comenzi & facturare",
                  "Integrări curierat",
                  "Suport tehnic 6 luni",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-navy">✓</span>
                    <span className="text-gray">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-gray text-sm mt-8">
            * Prețurile includ design, development, hosting primul an și suport tehnic 3 luni
          </p>
        </div>
      </section>

      <CTASection
        title="Gata să ai un website de top?"
        description="Trimite-ne un mesaj și discutăm despre proiectul tău. Îți facem o ofertă personalizată în 24h."
        buttonText="Solicită Ofertă"
        buttonHref="https://wa.me/40123456789?text=Bună!%20Vreau%20o%20ofertă%20pentru%20website."
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

