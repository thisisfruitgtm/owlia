export default function ProcessSteps() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-navy mb-4 text-center">
          Cum Lucrăm?
        </h2>
        <p className="text-lg text-gray mb-12 text-center">
          4 pași către creștere sustenabilă
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              number: "1",
              title: "Analiză",
              description:
                "Consultanță gratuită 30 min. Înțelegem business-ul tău, targetul și obiectivele.",
            },
            {
              number: "2",
              title: "Strategie",
              description:
                "Plan personalizat cu buget, timeline și metrici clare de succes.",
            },
            {
              number: "3",
              title: "Implementare",
              description:
                "Echipa noastră internă execută tot: brand, website, marketing. Tu stai liniștit.",
            },
            {
              number: "4",
              title: "Creștere",
              description:
                "Monitorizare constantă, optimizare și scale. Rapoarte lunare cu metrici clare.",
            },
          ].map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-navy text-white rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-6">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">{step.title}</h3>
              <p className="text-gray leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

