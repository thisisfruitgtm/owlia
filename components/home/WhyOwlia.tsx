export default function WhyOwlia() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-navy mb-4 text-center">
          De Ce OWLIA?
        </h2>
        <p className="text-lg text-gray mb-12 text-center">
          4 diferențiatori care contează
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: "📈",
              title: "Rezultate Măsurabile",
              description:
                "Cifre concrete: 4M lei creștere VipBebe, +45% conversie Atelier. ROI transparent, rapoarte lunare.",
            },
            {
              icon: "🎯",
              title: "Full-Service",
              description:
                "Tot sub un acoperiș: brand, web, marketing. Nu mai alergi după 5 furnizori diferiți.",
            },
            {
              icon: "👥",
              title: "Echipă Internă Completă",
              description:
                "Design, development, marketing - totul intern. Zero outsourcing, calitate constantă.",
            },
            {
              icon: "⭐",
              title: "Experiență Dovedită",
              description:
                "16 ani pe piață, 100+ proiecte livrate. Știm ce funcționează pentru afaceri noi.",
            },
          ].map((why, i) => (
            <div
              key={i}
              className="p-8 bg-white rounded-2xl hover:-translate-y-1 transition-smooth text-center"
            >
              <div className="text-5xl mb-6">{why.icon}</div>
              <h3 className="text-xl font-bold text-navy mb-3">{why.title}</h3>
              <p className="text-gray leading-relaxed">{why.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

