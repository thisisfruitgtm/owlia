import type { Metadata } from "next";
import Navigation from "@/components/ui/Navigation";
import CTASection from "@/components/ui/CTASection";

export const metadata: Metadata = {
  title: { default: "Atelierul de Business - Caz de Succes", template: "%s | OWLIA" },
  description:
    "Cum am automatizat funnel-ul de vânzări pentru o platformă de training business. Redesign complet, strategie și conversie crescută.",
  alternates: { canonical: "/cazuri-de-succes/atelier-de-business" },
  openGraph: {
    type: "article",
    url: "/cazuri-de-succes/atelier-de-business",
    title: "Atelierul de Business - Caz de Succes | OWLIA",
    description: "Funnel automatizat și conversie crescută cu 45%.",
    siteName: "OWLIA",
    locale: "ro_RO",
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atelierul de Business - Caz de Succes | OWLIA",
    description: "Funnel automatizat și conversie crescută cu 45%.",
    images: ["/opengraph-image"],
  },
};

export default function AtelierDeBusinessPage() {
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
            headline: "Atelierul de Business - Caz de Succes în Consultanță",
            description: "Cum am crescut rata de conversie cu +45% prin redesign complet și funnel optimization pentru o firmă de consultanță business.",
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
              "@id": "https://owlia.ro/cazuri-de-succes/atelier-de-business",
            },
            image: "https://owlia.ro/opengraph-image",
          }),
        }}
      />

      {/* Hero */}
      <section className="mt-20 pt-24 pb-20 bg-gradient-to-b from-cream to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-8xl">💼</div>
            <div>
              <div className="text-sm font-semibold text-navy/70 mb-2 uppercase tracking-wide">
                Servicii & Consultanță
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-navy leading-tight">
                Atelierul de Business
              </h1>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-gray max-w-4xl leading-relaxed">
            Cum am automatizat complet funnel-ul de vânzări pentru o platformă de training antreprenorial
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">+45%</div>
              <div className="text-white/70">Conversie lead→client</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">70%</div>
              <div className="text-white/70">Timp economisit</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-white/70">Automatizare</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">3X</div>
              <div className="text-white/70">ROI marketing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-navy mb-6">Provocarea</h2>
          <p className="text-xl text-gray leading-relaxed mb-8">
            Atelierul de Business oferea training-uri de calitate, dar funnel-ul de vânzări era complet manual. Lead-urile se pierdeau, follow-up-ul era haotic și conversiile scăzute.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "📧",
                title: "Follow-up manual",
                description:
                  "Fiecare lead contactat manual prin email - multe lead-uri pierdute.",
              },
              {
                icon: "⏱️",
                title: "Timp imens alocat",
                description:
                  "Echipa pierdea 15+ ore/săptămână cu urmărirea lead-urilor.",
              },
              {
                icon: "📉",
                title: "Conversie scăzută",
                description:
                  "Doar 12% din lead-uri deveneau clienți plătitori.",
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
            Am reconstruit complet platforma și am automatizat tot funnel-ul: de la lead magnet până la client plătitor.
          </p>

          <div className="space-y-8">
            {[
              {
                phase: "Faza 1 - Redesign Platformă",
                duration: "Săptămâna 1-6",
                items: [
                  "Redesign complet website cu focus pe conversie",
                  "Landing pages optimizate pentru fiecare training",
                  "Checkout simplificat (3 pași, rate plată incluse)",
                  "Dashboard personalizat pentru cursanți",
                ],
              },
              {
                phase: "Faza 2 - Marketing Automation",
                duration: "Săptămâna 7-10",
                items: [
                  "Lead magnet (ghid gratuit) cu email sequence automatizat",
                  "Nurture campaigns: 12 email-uri pe 30 zile",
                  "Segmentare automată pe bază comportament (deschis, clic, etc)",
                  "Retargeting Facebook pentru cei care au vizitat dar nu s-au înscris",
                ],
              },
              {
                phase: "Faza 3 - Sales Funnel Automation",
                duration: "Săptămâna 11-12",
                items: [
                  "Webinar automatizat (evergreen) cu pitch la final",
                  "Reminder-e automate înainte de webinar și după",
                  "Ofertă limitată timp (scarcity) pentru creștere conversie",
                  "CRM integration: urmărire lead de la interes până la plată",
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
            Impact masurabil după implementare
          </p>

          <div className="space-y-6">
            {[
              {
                metric: "Conversie Lead → Client",
                before: "12%",
                after: "17.4%",
                impact: "+45% creștere conversie",
              },
              {
                metric: "Timp Alocat Follow-up",
                before: "15 ore/săptămână",
                after: "4.5 ore/săptămână",
                impact: "70% reducere timp manual",
              },
              {
                metric: "Cost Per Acquisition",
                before: "850 lei/client",
                after: "520 lei/client",
                impact: "39% reducere costuri",
              },
              {
                metric: "Rata de Răspuns Email",
                before: "8%",
                after: "24%",
                impact: "3X engagement crescut",
              },
            ].map((result, i) => (
              <div
                key={i}
                className="p-8 bg-cream rounded-2xl border-l-4 border-navy"
              >
                <h3 className="text-xl font-bold text-navy mb-4">
                  {result.metric}
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm text-gray mb-1">Înainte</div>
                    <div className="text-2xl font-bold text-gray">
                      {result.before}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray mb-1">După</div>
                    <div className="text-2xl font-bold text-navy">
                      {result.after}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray mb-1">Impact</div>
                    <div className="text-2xl font-bold text-green-600">
                      {result.impact}
                    </div>
                  </div>
                </div>
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
            "Automatizarea funnel-ului ne-a salvat 15 ore pe săptămână și a crescut conversiile cu aproape jumătate. ROI fantastic."
          </blockquote>
          <p className="text-white/70 text-lg">— Echipa Atelierul de Business</p>
        </div>
      </section>

      <CTASection
        title="Vrei un funnel automatizat?"
        description="Dacă vinzi servicii sau training-uri, te ajutăm să automatizezi vânzările. Consultanță gratuită 30 min."
        buttonText="Programează Consultanță"
        buttonHref="https://wa.me/40778767940?text=Bună!%20Am%20văzut%20cazul%20Atelierul%20de%20Business.%20Vreau%20automatizare."
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

