import type { Metadata } from "next";
import Navigation from "@/components/ui/Navigation";
import CTASection from "@/components/ui/CTASection";

export const metadata: Metadata = {
  title: {
    default: "Despre | Echipa Ta de Creștere",
    template: "%s | OWLIA",
  },
  description:
    "16 ani experiență în marketing digital, web design și branding. Echipă internă completă care ajută afaceri noi să crească rapid și sustenabil.",
  alternates: { canonical: "/despre" },
  openGraph: {
    type: "website",
    url: "/despre",
    title: "Despre | Echipa Ta de Creștere",
    description:
      "16 ani experiență, 100+ proiecte livrate, rezultate măsurabile.",
    siteName: "OWLIA",
    locale: "ro_RO",
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Despre | OWLIA",
    description:
      "16 ani experiență, 100+ proiecte livrate, rezultate măsurabile.",
    images: ["/opengraph-image"],
  },
};

export default function DesprePage() {
  return (
    <>
      <Navigation />

      {/* Hero */}
      <section className="mt-20 pt-24 pb-20 bg-gradient-to-b from-cream to-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-navy leading-tight tracking-tight mb-6">
            Echipa Ta de Creștere
          </h1>
          <p className="text-xl md:text-2xl text-gray max-w-4xl mx-auto leading-relaxed">
            Nu suntem o agenție clasică. Suntem partenerul tău strategic care înțelege provocările afacerilor noi și știe exact cum să le depășească.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-navy mb-6 text-center">
            Povestea Noastră
          </h2>

          <div className="max-w-3xl mx-auto space-y-6 text-lg text-gray leading-relaxed">
            <p>
              Bună! Sunt <strong className="text-navy">Mihail Petru Marincea</strong>, fondator și coordonator al echipei OWLIA. Facem marketing digital și website-uri de <strong className="text-navy">16 ani</strong>.
            </p>

            <p>
              Am început în domeniu la 15 ani, când am dezvoltat primul sistem pentru compania în care lucram. De atunci, echipa noastră a livrat peste <strong className="text-navy">100 de proiecte</strong> - de la tech și retail, la restaurante, saloane, construcții - toate industriile pe care le vezi pe site.
            </p>

            <p>
              În 2024, am devenit și <strong className="text-navy">formator oficial pentru Start-Up Nation</strong>, pregătind companii cu noțiuni de competențe antreprenoriale. Am văzut în detaliu provocările cu care se confruntă afacerile noi și am decis să creăm OWLIA - o divizie dedicată 100% companiilor la început de drum.
            </p>

            <p>
              Nu facem marketing pentru like-uri. Facem marketing pentru <strong className="text-navy">clienți reali și vânzări măsurabile</strong>. Asta ne diferențiază.
            </p>
          </div>
        </div>
      </section>

      {/* Companies */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-navy mb-4 text-center">
            Companiile Noastre
          </h2>
          <p className="text-lg text-gray mb-12 text-center">
            3 branduri, aceeași echipă de experți
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "OWLIA",
                tagline: "Pentru afaceri noi (0-3 ani)",
                description:
                  "Divizia noastră specializată pentru companii la început de drum. Te ajutăm să aloci corect bugetul, să construiești brand-ul și să generezi primii clienți.",
                color: "bg-navy text-white",
              },
              {
                name: "Fruit Creative",
                tagline: "Pentru companii mature",
                description:
                  "Compania noastră principală unde lucrăm cu afaceri stabilite pe piață care vor să scaleze sau să se reinventeze.",
                color: "bg-white text-navy",
              },
              {
                name: "Omnisfera",
                tagline: "Proiecte internaționale",
                description:
                  "Rețea de antreprenori din mai multe țări unde colaborăm la proiecte internaționale și oferim consultanță strategică.",
                color: "bg-white text-navy",
              },
            ].map((company, i) => (
              <div
                key={i}
                className={`p-10 rounded-2xl hover:-translate-y-2 transition-smooth ${company.color}`}
              >
                <h3 className="text-3xl font-bold mb-2">{company.name}</h3>
                <div className={`text-sm font-semibold mb-4 ${i === 0 ? "text-white/70" : "text-navy/60"} uppercase tracking-wide`}>
                  {company.tagline}
                </div>
                <p className={`leading-relaxed ${i === 0 ? "text-white/90" : "text-gray"}`}>
                  {company.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-navy mb-4 text-center">
            Echipa Internă
          </h2>
          <p className="text-lg text-gray mb-12 text-center">
            Specialiști cu experiență, nu freelanceri ocazionali
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🎨",
                role: "Design",
                description: "Brand identity, UI/UX, materiale print",
              },
              {
                icon: "💻",
                role: "Development",
                description: "Website-uri, platforme, e-commerce",
              },
              {
                icon: "📊",
                role: "Marketing Digital",
                description: "SEO, Google Ads, Social Media",
              },
              {
                icon: "✍️",
                role: "Copywriting",
                description: "Conținut persuasiv, landing pages",
              },
              {
                icon: "📈",
                role: "Strategie",
                description: "Analiză piață, planning, consultanță",
              },
              {
                icon: "🎥",
                role: "Media",
                description: "Foto, video, producție conținut",
              },
            ].map((role, i) => (
              <div
                key={i}
                className="p-6 bg-cream rounded-2xl text-center hover:-translate-y-1 transition-smooth"
              >
                <div className="text-5xl mb-4">{role.icon}</div>
                <h3 className="text-xl font-bold text-navy mb-2">
                  {role.role}
                </h3>
                <p className="text-gray">{role.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-cream rounded-2xl text-center">
            <p className="text-lg text-gray">
              <strong className="text-navy">Zero outsourcing.</strong> Toți oamenii sunt în echipa noastră internă. Asta înseamnă calitate constantă, comunicare rapidă și coordonare perfectă.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Valorile Noastre
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Transparență Totală",
                description:
                  "Îți arătăm exact ce facem, când și de ce. Rapoarte clare, metrici măsurabile, fără bullshit.",
              },
              {
                icon: "📈",
                title: "Rezultate, Nu Promisiuni",
                description:
                  "Nu-ți garantăm vânzări cosmice. Îți arătăm ce-am făcut pentru alții și construim împreună un plan realist.",
              },
              {
                icon: "🤝",
                title: "Parteneriat pe Termen Lung",
                description:
                  "Nu facem proiecte one-off. Vrem să creștem împreună cu tine și să fim acolo când ai nevoie.",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="p-8 bg-white/5 border border-white/10 rounded-2xl text-center"
              >
                <div className="text-6xl mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-white/80 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold text-navy mb-2">100+</div>
              <div className="text-gray">Proiecte Livrate</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-navy mb-2">16 ani</div>
              <div className="text-gray">Experiență</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-navy mb-2">3</div>
              <div className="text-gray">Companii Fondate</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-navy mb-2">50+</div>
              <div className="text-gray">Beneficiari Start-Up Nation</div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Hai să vorbim!"
        description="Programează o consultanță gratuită de 30 de minute și discutăm despre business-ul tău."
        buttonText="Programează Consultanță"
        buttonHref="https://wa.me/40123456789?text=Bună!%20Vreau%20o%20consultanță%20gratuită."
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

