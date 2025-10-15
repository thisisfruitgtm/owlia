"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Care pachet e pentru mine?",
    answer: "Folosește calculatorul de mai sus - îți arată automat. Sau contactează-ne pe WhatsApp și discutăm 30 min gratuit să vedem ce-ți trebuie exact."
  },
  {
    question: "Se califică pentru Start-Up Nation?",
    answer: "Da! Tot ce facem intră la Start-Up Nation: logo, site, materiale, consultanță. Îți oferim facturile împărțite cum trebuie și toate documentele pentru raportări."
  },
  {
    question: "Cât durează până e gata?",
    answer: "Logo, site, materiale - toate în prima lună-două. După aceea te urmărim 12 luni cu rapoarte și actualizări. Totul e sincronizat cu termenele Start-Up Nation."
  },
  {
    question: "Dacă nu-mi place ce-ați făcut?",
    answer: "După 6 luni, dacă nu vezi rezultate (telefoane, vizitatori pe site, clienți), poți renunța. Plus că discutăm lunar o oră să ajustăm ce nu merge."
  },
  {
    question: "Pot pune și reclame pe Google/Facebook?",
    answer: "Da! Reclamele le adaugi separat, costă 1.000-2.000 lei/lună. Recomandăm să le pornești după lună 2-3, când ai deja site-ul și tot ce trebuie."
  },
  {
    question: "Ne ajutați să depunem dosarul Start-Up Nation?",
    answer: "Dacă nu l-ai depus încă, îți revizuim gratis partea de marketing. Pentru depunerea completă, te punem în legătură cu consultanții cu care colaborăm."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="mt-20 pt-16 md:pt-24 pb-20 bg-gradient-to-b from-cream to-white">
      {/* JSON-LD: FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-navy mb-4 text-center">Întrebări pe care le primim des</h2>
        <p className="text-lg text-gray mb-12 text-center">Probabil te întrebi și tu de astea</p>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden">
              <button
                onClick={() => toggle(index)}
                className="w-full px-6 py-6 text-left font-semibold text-lg text-navy flex justify-between items-center hover:text-gray transition-smooth"
              >
                <span>{faq.question}</span>
                <span className={`text-2xl transition-transform duration-300 ${activeIndex === index ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6 text-base text-gray leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

