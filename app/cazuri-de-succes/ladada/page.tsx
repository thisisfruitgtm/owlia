import type { Metadata } from "next";
import Navigation from "@/components/ui/Navigation";
import CTASection from "@/components/ui/CTASection";

export const metadata: Metadata = {
  title: { default: "LaDaDa.ro - Caz de Succes", template: "%s | OWLIA" },
  description:
    "Cum am dublat traficul și comenzile online pentru un fast food local. Website nou, Google Ads local și strategie digitală completă.",
  alternates: { canonical: "/cazuri-de-succes/ladada" },
  openGraph: {
    type: "article",
    url: "/cazuri-de-succes/ladada",
    title: "LaDaDa.ro - Caz de Succes | OWLIA",
    description: "Dublu trafic în 6 luni pentru fast food local.",
    siteName: "OWLIA",
    locale: "ro_RO",
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LaDaDa.ro - Caz de Succes | OWLIA",
    description: "Dublu trafic în 6 luni pentru fast food local.",
    images: ["/opengraph-image"],
  },
};

export default function LaDaDaPage() {
  return (
    <>
      <Navigation />
      
      {/* JSON-LD: Case Study / Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "LaDaDa.ro - Caz de Succes în HoReCa",
            description: "Cum am dublat traficul pentru un restaurant în 6 luni prin website nou, Google Ads și social media.",
            author: {
              "@type": "Organization",
              name: "OWLIA",
              url: "https://owlia.ro",
            },
            publisher: {
              "@type": "Organization",
              name: "OWLIA",
              logo: {
                "@type": "ImageObject",
                url: "https://owlia.ro/logo_owlia_blue.svg",
              },
            },
            datePublished: "2024-01-01",
            dateModified: "2025-01-01",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://owlia.ro/cazuri-de-succes/ladada",
            },
            image: "https://owlia.ro/opengraph-image",
          }),
        }}
      />

      {/* Hero */}
      <section className="mt-20 pt-24 pb-20 bg-gradient-to-b from-cream to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-8xl">🍔</div>
            <div>
              <div className="text-sm font-semibold text-navy/70 mb-2 uppercase tracking-wide">
                HoReCa - Fast Food
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-navy leading-tight">
                LaDaDa.ro
              </h1>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-gray max-w-4xl leading-relaxed">
            Cum am transformat un fast food local într-o destinație de top cu comenzi online și dublare trafic în 6 luni
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">2X</div>
              <div className="text-white/70">Trafic în 6 luni</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">35%</div>
              <div className="text-white/70">Comenzi online</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">4.7★</div>
              <div className="text-white/70">Rating Google</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">180+</div>
              <div className="text-white/70">Review-uri pozitive</div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-navy mb-6">Provocarea</h2>
          <p className="text-xl text-gray leading-relaxed mb-8">
            LaDaDa era un fast food local bun, dar invizibil online. Fără website, fără comenzi online, fără prezență Google. Clienții sunau telefonic sau veneau direct - pierdeau multe comenzi.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "📞",
                title: "Comenzi telefonice",
                description:
                  "Doar telefon - pierdeau comenzi când liniile erau ocupate.",
              },
              {
                icon: "🔍",
                title: "Invizibilitate online",
                description:
                  "Fără prezență Google, oamenii nu-i găseau când căutau 'fast food [oraș]'.",
              },
              {
                icon: "📱",
                title: "Zero comenzi online",
                description:
                  "Clienții tineri vor comenzi online - nu găseau modalitatea.",
              },
            ].map((challenge, i) => (
              <div key={i} className="p-6 bg-cream rounded-2xl">
                <div className="text-4xl mb-3">{challenge.icon}</div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  {challenge.title}
                </h3>
                <p className="text-gray">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="mt-20 pt-16 md:pt-24 pb-20 bg-gradient-to-b from-cream to-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-navy mb-6">Soluția Noastră</h2>
          <p className="text-xl text-gray leading-relaxed mb-12">
            Am creat o prezență digitală completă: website cu comenzi online, vizibilitate Google și campanii locale țintite.
          </p>

          <div className="space-y-8">
            {[
              {
                phase: "Faza 1 - Website & Comenzi Online",
                duration: "Săptămâna 1-4",
                items: [
                  "Website responsive cu meniu interactiv și fotografii profesionale",
                  "Sistem comenzi online integrat direct cu bucătăria",
                  "Plată online (card) + opțiune plată la livrare",
                  "Zonă de livrare automată pe hartă",
                ],
              },
              {
                phase: "Faza 2 - Google My Business",
                duration: "Săptămâna 5-6",
                items: [
                  "Optimizare completă profil Google (poze, descriere, categorii)",
                  "Strategie recenzii pozitive (crescut de la 12 la 180+ review-uri)",
                  "Postări săptămânale cu oferte și produse noi",
                  "Răspuns la toate review-urile în maxim 24h",
                ],
              },
              {
                phase: "Faza 3 - Google Ads Local",
                duration: "Luna 2-12",
                items: [
                  "Campanii Google Ads hyper-locale (rază 5km)",
                  "Targeting pe evenimente locale (meci, festival)",
                  "Retargeting pentru cei care au vizitat site-ul",
                  "A/B testing constant pentru optimizare costuri",
                ],
              },
            ].map((phase, i) => (
              <div key={i} className="p-8 bg-white rounded-2xl">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-navy text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-navy mb-1">
                      {phase.phase}
                    </h3>
                    <p className="text-sm text-gray">{phase.duration}</p>
                  </div>
                </div>
                <ul className="space-y-3 ml-14">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="text-navy mt-1">✓</span>
                      <span className="text-gray">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-navy mb-6">Rezultate</h2>
          <p className="text-xl text-gray leading-relaxed mb-12">
            Creștere constantă în primele 6 luni
          </p>

          <div className="space-y-6">
            {[
              {
                period: "Luna 1",
                title: "Lansare Website",
                metrics:
                  "850 vizitatori • 22 comenzi online • Prima apariție în căutări Google",
              },
              {
                period: "Luna 2-3",
                title: "Google Ads & GMB",
                metrics:
                  "1.800 vizitatori • 68 comenzi online • 35+ review-uri Google",
              },
              {
                period: "Luna 4-6",
                title: "Optimizare & Scalare",
                metrics:
                  "3.200 vizitatori • 125 comenzi online • 4.7★ rating Google",
              },
              {
                period: "Luna 6+",
                title: "Rezultate Sustenabile",
                metrics:
                  "Comenzi online = 35% din total vânzări • Trafic dublat • Top 3 în zona locală",
              },
            ].map((result, i) => (
              <div
                key={i}
                className="p-8 bg-cream rounded-2xl border-l-4 border-navy"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-2xl font-bold text-navy">
                    {result.title}
                  </h3>
                  <span className="text-sm font-semibold text-navy/70 bg-white px-3 py-1 rounded-full">
                    {result.period}
                  </span>
                </div>
                <p className="text-lg text-gray">{result.metrics}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-navy text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-6xl mb-6">💬</div>
          <blockquote className="text-2xl font-semibold mb-6 leading-relaxed">
            "În 6 luni am trecut de la zero comenzi online la 35% din vânzări. Website-ul și campaniile Google funcționează perfect."
          </blockquote>
          <p className="text-white/70 text-lg">— Echipa LaDaDa</p>
        </div>
      </section>

      <CTASection
        title="Vrei să crești și tu local?"
        description="Dacă ai un business HoReCa sau local, vorbim despre strategia ta de creștere. Consultanță gratuită 30 min."
        buttonText="Programează Consultanță"
        buttonHref="https://wa.me/40778767940?text=Bună!%20Am%20văzut%20cazul%20LaDaDa.%20Vreau%20să%20cresc%20local."
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

