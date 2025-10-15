import type { Metadata } from "next";
import Navigation from "@/components/ui/Navigation";
import CTASection from "@/components/ui/CTASection";

export const metadata: Metadata = {
  title: { default: "VipBebe.ro - Caz de Succes", template: "%s | OWLIA" },
  description:
    "Cum am transformat VipBebe într-un magazin online de 4 milioane lei. Strategie completă de branding, web design și marketing digital.",
  alternates: { canonical: "/cazuri-de-succes/vipbebe" },
  openGraph: {
    type: "article",
    url: "/cazuri-de-succes/vipbebe",
    title: "VipBebe.ro - Caz de Succes | OWLIA",
    description: "De la 0 la 4 milioane lei vânzări în 2 ani.",
    siteName: "OWLIA",
    locale: "ro_RO",
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VipBebe.ro - Caz de Succes | OWLIA",
    description: "De la 0 la 4 milioane lei vânzări în 2 ani.",
    images: ["/opengraph-image"],
  },
};

export default function VipBebePage() {
  return (
    <>
      <Navigation />

      {/* Hero */}
      <section className="mt-20 pt-24 pb-20 bg-gradient-to-b from-cream to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-8xl">👶</div>
            <div>
              <div className="text-sm font-semibold text-navy/70 mb-2 uppercase tracking-wide">
                E-commerce - Produse Copii
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-navy leading-tight">
                VipBebe.ro
              </h1>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-gray max-w-4xl leading-relaxed">
            Cum am transformat un magazin online nou într-un lider de piață cu 4 milioane lei vânzări anuale
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">4M+ lei</div>
              <div className="text-white/70">Vânzări anuale</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">12.000+</div>
              <div className="text-white/70">Comenzi procesate</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">2 ani</div>
              <div className="text-white/70">De la 0 la lider</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">4.2★</div>
              <div className="text-white/70">Rating Google</div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-navy mb-6">Provocarea</h2>
          <p className="text-xl text-gray leading-relaxed mb-8">
            VipBebe a pornit cu o idee simplă: să ofere produse premium pentru copii în România. Dar piața era deja aglomerată cu competitori mari și buget de marketing limitat.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎯",
                title: "Piață competitivă",
                description:
                  "Jucători mari deja stabiliți cu bugete uriașe de marketing.",
              },
              {
                icon: "💰",
                title: "Buget limitat",
                description:
                  "Start-up nou, resurse financiare restricționate pentru promovare.",
              },
              {
                icon: "🔍",
                title: "Zero vizibilitate",
                description:
                  "Brand nou, fără trafic organic, fără comunitate, fără recunoaștere.",
              },
            ].map((challenge, i) => (
              <div
                key={i}
                className="p-6 bg-cream rounded-2xl"
              >
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
            Am construit o strategie completă pe 3 piloni: branding memorabil, platformă optimizată conversie și marketing digital țintit.
          </p>

          <div className="space-y-8">
            {[
              {
                phase: "Faza 1 - Branding & Identitate",
                duration: "Săptămâna 1-3",
                items: [
                  "Logo profesional cu identitate vizuală completă",
                  "Paletă de culori prietenoasă, specific pentru copii și părinți",
                  "Manual de brand pentru consistență",
                  "Packaging personalizat pentru experiență premium",
                ],
              },
              {
                phase: "Faza 2 - Platformă E-commerce",
                duration: "Săptămâna 4-8",
                items: [
                  "Website responsive optimizat pentru mobil (65% trafic mobil)",
                  "UX/UI design focusat pe conversie (checkout în 3 pași)",
                  "SEO on-page pentru toate categoriile de produse",
                  "Integrare plăți online (card, PayPal) și curierat automat",
                ],
              },
              {
                phase: "Faza 3 - Marketing Digital",
                duration: "Luna 3-24",
                items: [
                  "Campanii Google Ads țintite pe intenție de cumpărare",
                  "Facebook & Instagram Ads pentru mame 25-40 ani",
                  "Strategie SEO pe termen lung (blog, ghiduri pentru părinți)",
                  "Email marketing automation (abandoned cart, recomandări)",
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
            Timeline cu metrici clare pe 24 luni
          </p>

          <div className="space-y-6">
            {[
              {
                period: "Luna 1-3",
                title: "Lansare & Setup",
                metrics: "500 vizitatori/lună • 15 comenzi • 18.000 lei vânzări",
              },
              {
                period: "Luna 4-6",
                title: "Creștere Organică",
                metrics: "2.500 vizitatori/lună • 85 comenzi • 95.000 lei vânzări",
              },
              {
                period: "Luna 7-12",
                title: "Accelerare",
                metrics: "8.000 vizitatori/lună • 320 comenzi • 380.000 lei vânzări",
              },
              {
                period: "Anul 2",
                title: "Scalare & Maturitate",
                metrics:
                  "25.000 vizitatori/lună • 1.000+ comenzi/lună • 4M lei/an",
              },
            ].map((result, i) => (
              <div key={i} className="p-8 bg-cream rounded-2xl border-l-4 border-navy">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-2xl font-bold text-navy">{result.title}</h3>
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
            "Echipa OWLIA nu doar că a livrat un site frumos, ci a gândit întregul funnel de vânzare. Am ajuns de la zero la lider de piață în 2 ani."
          </blockquote>
          <p className="text-white/70 text-lg">
            — Echipa VipBebe
          </p>
        </div>
      </section>

      <CTASection
        title="Vrei rezultate similare?"
        description="Discutăm despre business-ul tău și îți arătăm cum putem ajuta. Consultanță gratuită 30 min."
        buttonText="Programează Consultanță"
        buttonHref="https://wa.me/40123456789?text=Bună!%20Am%20văzut%20cazul%20VipBebe.%20Vreau%20și%20eu%20rezultate%20similare."
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

