export default function ProblemSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-navy mb-4 text-center">
          3 Provocări ale Afacerilor Noi
        </h2>
        <p className="text-lg text-gray mb-12 text-center">
          Le cunoaștem bine pentru că le-am rezolvat pentru 100+ clienți
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "🔍",
              title: "Vizibilitate Zero",
              description:
                "Piață aglomerată, competiție mare, buget mic. Cum ieși în evidență când toată lumea se bate pentru atenție?",
            },
            {
              icon: "💰",
              title: "Buget Limitat",
              description:
                "Fiecare leu contează. Ai nevoie de rezultate rapide, dar nu-ți permiți să arunci bani pe experimente.",
            },
            {
              icon: "⏱️",
              title: "Timp Insuficient",
              description:
                "Ești ocupat cu business-ul real. Nu ai timp să înveți marketing, să coordonezi 5 furnizori diferiți și să te lupți cu algoritmi.",
            },
          ].map((problem, i) => (
            <div
              key={i}
              className="p-8 bg-cream rounded-2xl hover:-translate-y-1 transition-smooth"
            >
              <div className="text-5xl mb-6">{problem.icon}</div>
              <h3 className="text-2xl font-bold text-navy mb-4">
                {problem.title}
              </h3>
              <p className="text-gray leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

