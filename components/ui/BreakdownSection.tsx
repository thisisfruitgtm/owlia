"use client";

import { useState } from "react";

type BreakdownItem = {
  title: string;
  description?: string;
  subitems?: string[];
};

const tabs: Array<{
  id: string;
  label: string;
  items: BreakdownItem[];
}> = [
  {
    id: "etapa1",
    label: "Etapa 1: Analiză & Strategie",
    items: [
      {
        title: "✓ Analiza planului de afaceri",
        description: "Studiem în detaliu planul tău pentru a înțelege obiectivele și resursele disponibile."
      },
      {
        title: "✓ Research concurență în nișa ta",
        description: "Analizăm competitorii din Iași/România pentru a identifica oportunități și diferențiatori."
      },
      {
        title: "✓ Calcul buget optim marketing",
        description: "Determinăm % ideal din CA proiectat bazat pe industrie și obiective."
      },
      {
        title: "✓ Strategie 12 luni cu milestone-uri",
        description: "Plan detaliat lunar cu obiective măsurabile și termene clare."
      },
      {
        title: "✓ Bonus: Revizuire secțiune marketing",
        description: "Dacă e înainte de depunere, îți optimizăm secțiunea de marketing din planul de afaceri."
      }
    ]
  },
  {
    id: "etapa2",
    label: "Etapa 2: Setup Complet",
    items: [
      {
        title: "Identitate de Brand",
        subitems: [
          "Logo profesional + manual identitate vizuală",
          "Uniformă personalizată (design + 6 seturi)",
          "Wrapping complet autovehicul (design + aplicare)",
          "Cărți vizită + flyere + roll-up (design + producție)",
          "Template-uri documente (oferte, contracte, rapoarte)"
        ]
      },
      {
        title: "Digital Hub",
        subitems: [
          "Website 8-10 pagini (responsive, optimizat SEO local)",
          "Setup Google Business + optimizare completă",
          "Strategie social media (Facebook/Instagram/LinkedIn)",
          "Training echipă 3h (cum să folosești instrumentele)"
        ]
      },
      {
        title: "Materiale Marketing",
        subitems: [
          "Brosură servicii A4 (design + 500 buc)",
          "Banner exterior (design + producție)",
          "Prezentare PowerPoint B2B"
        ]
      }
    ]
  },
  {
    id: "etapa3",
    label: "Etapa 3: Management 12 Luni",
    items: [
      {
        title: "Lunar (12 luni)",
        subitems: [
          "2 postări Google Business",
          "Raportare detaliată (leads, trafic, apeluri, ROI)",
          "Consultanță 1h (ajustări strategie)",
          "Răspunsuri recenzii + monitoring online",
          "Actualizări website (2/lună)"
        ]
      },
      {
        title: "Trimestrial (4x/an)",
        subitems: [
          "Analiză competiție (ce fac alții nou)",
          "Optimizare SEO",
          "A/B testing mesaje marketing"
        ]
      },
      {
        title: "Opțional (la cerere, în buget)",
        subitems: [
          "Campanii Google/Facebook Ads (buget separat 1.000-2.000 lei/lună)",
          "Fotografii profesionale șantiere/locații (3-4/an)",
          "Video testimoniale clienți (2-3/an)"
        ]
      }
    ]
  }
];

export default function BreakdownSection() {
  const [activeTab, setActiveTab] = useState("etapa1");

  return (
    <section className="mt-20 pt-16 md:pt-24 pb-20 bg-gradient-to-b from-cream to-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-navy mb-4 text-center">Ce primești exact în pachet?</h2>
        <p className="text-lg text-gray mb-10 text-center">Detalii complete pentru fiecare etapă</p>
        
        <div className="flex gap-4 mb-10 border-b-2 border-gray-light overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-4 text-base font-semibold whitespace-nowrap border-b-3 transition-smooth ${
                activeTab === tab.id
                  ? 'text-navy border-navy'
                  : 'text-gray border-transparent hover:text-navy'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="space-y-4">
          {tabs.find(tab => tab.id === activeTab)?.items.map((item, index) => (
            <div key={index} className="p-6 bg-white rounded-xl">
              <h4 className="text-lg font-semibold text-navy mb-2">{item.title}</h4>
              {'description' in item && item.description && (
                <p className="text-gray">{item.description}</p>
              )}
              {'subitems' in item && item.subitems && (
                <ul className="mt-3 space-y-2">
                  {item.subitems.map((subitem, i) => (
                    <li key={i} className="text-gray pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-navy">
                      {subitem}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

