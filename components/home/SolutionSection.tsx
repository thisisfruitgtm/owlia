export default function SolutionSection() {
  return (
    <section className="py-20 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Full-Service Marketing
        </h2>
        <p className="text-xl text-white/70 mb-12 text-center">
          Tot ce ai nevoie sub un singur acoperiș
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              number: "1",
              title: "Strategie",
              description:
                "Analizăm concurența din industria ta, identificăm targetul ideal și construim planul de marketing pe 12 luni.",
            },
            {
              number: "2",
              title: "Implementare",
              description:
                "Brand complet, website optimizat, campanii digital marketing - tot ce trebuie pentru vizibilitate și clienți.",
            },
            {
              number: "3",
              title: "Rezultate",
              description:
                "Metrici clare, rapoarte lunare, ROI transparent. Știi exact ce funcționează și unde investești fiecare leu.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="p-8 bg-white/5 border border-white/10 rounded-2xl"
            >
              <div className="w-12 h-12 bg-white text-navy rounded-full flex items-center justify-center font-bold text-xl mb-6">
                {step.number}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-white/80 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

