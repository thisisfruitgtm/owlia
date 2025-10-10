import Link from "next/link";

export default function IndustriesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-navy mb-4 text-center">
          Industrii
        </h2>
        <p className="text-lg text-gray mb-12 text-center">
          Experiență dovedită în:
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              emoji: "🛒",
              title: "Retail & E-commerce",
              example: "VipBebe.ro - 4M lei vânzări",
              href: "/cazuri-de-succes/vipbebe",
            },
            {
              emoji: "🍽️",
              title: "HoReCa",
              example: "LaDaDa.ro - Dublu trafic",
              href: "/cazuri-de-succes/ladada",
            },
            {
              emoji: "💼",
              title: "Servicii & Consultanță",
              example: "Atelier - +45% conversie",
              href: "/cazuri-de-succes/atelier-de-business",
            },
          ].map((industry, i) => (
            <Link key={i} href={industry.href}>
              <div className="p-8 bg-cream rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-smooth text-center group">
                <div className="text-6xl mb-4">{industry.emoji}</div>
                <h3 className="text-xl font-bold text-navy mb-2 group-hover:underline">
                  {industry.title}
                </h3>
                <p className="text-gray text-sm">{industry.example}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xl text-gray mb-6">
            <strong className="text-navy">Adaptabilă oricărei industrii</strong>
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-cream rounded-xl">
            <span className="text-2xl">✓</span>
            <span className="text-gray">
              Experiență cu finanțări europene (Start-Up Nation)
            </span>
          </div>
          <div className="mt-6">
            <Link
              href="/start-up-nation"
              className="inline-flex items-center gap-2 text-navy font-semibold hover:underline"
            >
              Vezi pachete Start-Up Nation
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

