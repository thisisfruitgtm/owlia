"use client";

import { useState } from "react";
import GuideEmailGate from "@/components/GuideEmailGate";
import GuideTracker from "@/components/GuideTracker";
import Navigation from "@/components/ui/Navigation";

export default function GuidePage() {
  const [guideAccessId, setGuideAccessId] = useState<string | null>(null);

  const sections = [
    "intro",
    "industries",
    "calculator",
    "mistakes",
    "eligibility",
    "allocation",
    "checklist",
  ];

  return (
    <>
      <Navigation />

      {/* Email Gate Overlay */}
      {!guideAccessId && (
        <GuideEmailGate onUnlock={(id) => setGuideAccessId(id)} />
      )}

      {/* Tracking */}
      {guideAccessId && (
        <GuideTracker guideAccessId={guideAccessId} sections={sections} />
      )}

      {/* Guide Content */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Cover */}
        <section data-section-id="intro" className="bg-navy text-white p-16 rounded-2xl text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            Cât Buget să Aloci pentru Marketing în Primul An
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Ghid complet pentru Start-Up Nation 2025
          </p>
          <div className="inline-block bg-white/10 px-6 py-2 rounded-full text-sm font-semibold">
            📊 Calculator inclus + Exemple reale
          </div>
        </section>

        {/* Intro */}
        <section data-section-id="intro" className="mb-16">
          <h2 className="text-4xl font-bold text-navy mb-6 pb-4 border-b-4 border-navy">
            Introducere
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-dark text-lg mb-4">
              Dacă ești pe cale să primești finanțarea Start-Up Nation, probabil te gândești deja la cum 
              să investești banii eficient. Marketing-ul este esențial pentru creștere, dar <strong>cât ar trebui 
              să aloci realist pentru primul an?</strong>
            </p>
            <p className="text-gray-dark text-lg mb-4">
              În acest ghid, îți vom arăta:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-dark text-lg mb-6">
              <li>Cât alocă alte business-uri din industria ta</li>
              <li>Cum să calculezi bugetul optim pentru situația ta specifică</li>
              <li>Cele mai comune greșeli (și cum să le eviți)</li>
              <li>Ce servicii să incluzi în bugetul de marketing</li>
              <li>Checklist pentru evaluatori</li>
            </ul>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
              <p className="text-blue-900 font-semibold mb-2">💡 Bonus:</p>
              <p className="text-blue-800">
                La final găsești un <strong>calculator interactiv</strong> care îți calculează automat 
                bugetul recomandat pe baza veniturilor estimate și numărului de clienți țintă.
              </p>
            </div>
          </div>
        </section>

        {/* Industries Table */}
        <section data-section-id="industries" className="mb-16">
          <h2 className="text-4xl font-bold text-navy mb-6 pb-4 border-b-4 border-navy">
            Buget Marketing pe Industrii
          </h2>
          <p className="text-gray text-lg mb-6">
            Iată cât alocă în medie business-urile din diferite industrii pentru marketing în primul an:
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-cream rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="px-6 py-4 text-left font-semibold">Industrie</th>
                  <th className="px-6 py-4 text-left font-semibold">% din Buget Total</th>
                  <th className="px-6 py-4 text-left font-semibold">Suma (RON)</th>
                  <th className="px-6 py-4 text-left font-semibold">Focus Principal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-light">
                {[
                  { industry: 'E-commerce', percent: '15-20%', amount: '42.000 - 50.000', focus: 'Social media, Google Ads, Influenceri' },
                  { industry: 'HoReCa (Restaurante, Cafenele)', percent: '12-18%', amount: '35.000 - 45.000', focus: 'Google Business, Social media, Food delivery' },
                  { industry: 'Servicii Profesionale (Consultanță)', percent: '10-15%', amount: '28.000 - 38.000', focus: 'LinkedIn, Website SEO, Networking' },
                  { industry: 'Producție (Manufactură)', percent: '8-12%', amount: '22.000 - 32.000', focus: 'Târguri, B2B Marketing, Cataloage' },
                  { industry: 'Retail (Magazin fizic)', percent: '10-16%', amount: '28.000 - 42.000', focus: 'Local SEO, Social media, Google Business' },
                  { industry: 'IT & Software', percent: '18-25%', amount: '48.000 - 60.000', focus: 'Content marketing, LinkedIn, SEO' },
                  { industry: 'Beauty & Wellness', percent: '14-20%', amount: '38.000 - 50.000', focus: 'Instagram, TikTok, Google Ads, Influenceri' },
                  { industry: 'Educație & Training', percent: '12-18%', amount: '32.000 - 45.000', focus: 'Facebook Ads, Webinars, Content marketing' },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-white transition-smooth">
                    <td className="px-6 py-4 font-semibold text-navy">{item.industry}</td>
                    <td className="px-6 py-4 text-gray-dark">{item.percent}</td>
                    <td className="px-6 py-4 text-navy font-bold">{item.amount}</td>
                    <td className="px-6 py-4 text-gray">{item.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
            <p className="text-yellow-900 font-semibold mb-2">⚠️ Atenție:</p>
            <p className="text-yellow-800">
              Aceste procente sunt <strong>orientative</strong>. Bugetul tău real depinde de: 
              obiective, competiție, piața țintă, și stadiul business-ului.
            </p>
          </div>
        </section>

        {/* Calculator Section */}
        <section data-section-id="calculator" className="mb-16">
          <h2 className="text-4xl font-bold text-navy mb-6 pb-4 border-b-4 border-navy">
            Calculator Buget Marketing
          </h2>
          <p className="text-gray text-lg mb-6">
            Folosește calculatorul de pe <a href="/start-up-nation#calculator" className="text-navy underline font-semibold">
            pagina Start-Up Nation</a> pentru a afla bugetul recomandat pentru business-ul tău.
          </p>
          <div className="bg-gradient-to-br from-navy to-navy/80 text-white p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">🧮 Calculator Interactiv</h3>
            <p className="mb-6">
              Introdu datele despre business-ul tău și primești recomandări personalizate bazate pe:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <span>✓</span>
                <span>Industria ta specifică</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✓</span>
                <span>Venituri estimate anul 1</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✓</span>
                <span>Numărul de clienți țintă</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✓</span>
                <span>Competiție în piață</span>
              </li>
            </ul>
            <a
              href="/start-up-nation#calculator"
              className="inline-block bg-white text-navy px-8 py-4 rounded-xl font-bold hover:scale-105 transition-smooth"
            >
              Calculează Bugetul Tău →
            </a>
          </div>
        </section>

        {/* Common Mistakes */}
        <section data-section-id="mistakes" className="mb-16">
          <h2 className="text-4xl font-bold text-navy mb-6 pb-4 border-b-4 border-navy">
            Top 5 Greșeli la Alocare Buget
          </h2>
          <div className="space-y-6">
            {[
              {
                title: '1. Sub-investiție în Marketing (25-40% din fonduri)',
                description: 'Mulți antreprenori alocă doar 5-10% pentru marketing, apoi se miră de ce nu au clienți. Realist: minim 28.000-42.000 lei pentru primul an.',
                tip: '💡 Marketing nu e cheltuială, e investiție în achiziție de clienți.'
              },
              {
                title: '2. Așteptări Nerealiste de ROI',
                description: 'Marketing-ul are nevoie de timp. În primele 3-6 luni investești în brand awareness, nu în vânzări directe.',
                tip: '📈 ROI realist: Luna 1-3: -100%, Luna 4-6: Break-even, Luna 7-12: +50-200%'
              },
              {
                title: '3. Lipsa Strategiei (Improvizație)',
                description: 'Fără plan clar, arunci banii în Facebook Ads fără să știi dacă funcționează. Apoi rămâi fără buget și fără rezultate.',
                tip: '🎯 Strategie = Plan 12 luni cu obiective clare și buget alocat pe canale'
              },
              {
                title: '4. Alegerea Canalelor Greșite',
                description: 'B2B pe TikTok? Consultanță prin Facebook Ads? Fiecare industrie are canalele sale optime.',
                tip: '🎪 Research-ul de piață îți arată exact unde sunt clienții tăi'
              },
              {
                title: '5. Implementare DIY (Do It Yourself)',
                description: 'Marketing-ul arată simplu, dar cerere experiență, timp și tool-uri scumpe. DIY = bani și timp pierdut.',
                tip: '🤝 Externalizează către o agenție și concentrează-te pe business-ul tău'
              },
            ].map((mistake, idx) => (
              <div key={idx} className="bg-white border border-gray-light rounded-xl p-6 hover:shadow-lg transition-smooth">
                <h3 className="text-xl font-bold text-navy mb-3">{mistake.title}</h3>
                <p className="text-gray mb-4">{mistake.description}</p>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <p className="text-green-900">{mistake.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Eligibility */}
        <section data-section-id="eligibility" className="mb-16">
          <h2 className="text-4xl font-bold text-navy mb-6 pb-4 border-b-4 border-navy">
            Ce Poți Include în Bugetul de Marketing?
          </h2>
          <p className="text-gray text-lg mb-6">
            Start-Up Nation acceptă următoarele cheltuieli de marketing (conform ghidului oficial):
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">✅</span>
                Eligibile (Acceptate)
              </h3>
              <ul className="space-y-3">
                {[
                  'Website (design, dezvoltare, hosting)',
                  'Logo și identitate vizuală (branding)',
                  'Materiale print (cărți vizită, flyere, cataloage)',
                  'Social media marketing (strategie, content)',
                  'Google Ads și Facebook Ads',
                  'SEO (optimizare motoare de căutare)',
                  'Email marketing (platformă + campanii)',
                  'Foto/Video profesional',
                  'Consultanță marketing (strategie)',
                  'Uniforme personalizate cu logo',
                  'Wrapping autovehicule',
                  'Standuri expoziții (roll-up, bannere)',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-green-900">
                    <span className="mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">❌</span>
                Neeligibile (Respinse)
              </h3>
              <ul className="space-y-3">
                {[
                  'Reclame TV și Radio (prea scump vs. eficiență)',
                  'Sponsorizări evenimente (fără dovadă impact)',
                  'Cadouri promoționale (pix-uri, căni, etc.)',
                  'Abonamente premium rețele sociale',
                  'Tool-uri fără legătură directă cu marketing',
                  'Salarii angajați marketing (sunt la altă categorie)',
                  'Achiziție liste contacte/baze date',
                  'Servicii SEO "black hat" sau spam',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-red-900">
                    <span className="mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <p className="text-blue-900 font-semibold mb-2">📋 Important:</p>
            <p className="text-blue-800">
              Toate cheltuielile trebuie <strong>documentate cu facturi</strong> și să aibă 
              <strong> legătură clară cu promovarea afacerii</strong>. Păstrează tot ce înseamnă: 
              contracte, facturi, poze before/after, rapoarte de performanță.
            </p>
          </div>
        </section>

        {/* Budget Allocation */}
        <section data-section-id="allocation" className="mb-16">
          <h2 className="text-4xl font-bold text-navy mb-6 pb-4 border-b-4 border-navy">
            Cum să Împarți Bugetul?
          </h2>
          <p className="text-gray text-lg mb-6">
            Exemplu de alocare pentru un buget de <strong>42.000 lei</strong> (pachetul SMART):
          </p>

          <div className="space-y-4">
            {[
              { category: 'Branding & Identitate Vizuală', amount: '8.000', percent: '19%', items: 'Logo, culori, tipografie, ghid utilizare' },
              { category: 'Website Profesional', amount: '10.000', percent: '24%', items: 'Design, dezvoltare 8-10 pagini, responsive, SEO' },
              { category: 'Google Business & SEO Local', amount: '4.000', percent: '10%', items: 'Setup profil, optimizare, poze, reviews' },
              { category: 'Social Media (12 luni)', amount: '12.000', percent: '29%', items: 'Strategie, conținut lunar, design grafic, management' },
              { category: 'Consultanță & Strategie', amount: '4.000', percent: '10%', items: 'Analiză piață, plan marketing, consultanță' },
              { category: 'Foto/Video Profesional', amount: '2.000', percent: '5%', items: 'Poze produse, video prezentare' },
              { category: 'Raportare & Monitorizare', amount: '2.000', percent: '5%', items: 'Google Analytics, rapoarte lunare, dashboard' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-light rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-navy flex-1">{item.category}</h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-navy">{item.amount} lei</div>
                    <div className="text-sm text-gray">{item.percent}</div>
                  </div>
                </div>
                <p className="text-gray">{item.items}</p>
                <div className="mt-3 w-full bg-gray-light rounded-full h-2">
                  <div 
                    className="bg-navy h-2 rounded-full transition-all"
                    style={{ width: item.percent }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-navy text-white p-8 rounded-xl text-center">
            <div className="text-5xl font-bold mb-2">42.000 lei</div>
            <p className="text-white/80 text-lg">Buget Total Marketing An 1</p>
          </div>
        </section>

        {/* Checklist */}
        <section data-section-id="checklist" className="mb-16">
          <h2 className="text-4xl font-bold text-navy mb-6 pb-4 border-b-4 border-navy">
            Checklist pentru Evaluatori
          </h2>
          <p className="text-gray text-lg mb-6">
            Pentru a trece cu bine de evaluare, asigură-te că ai:
          </p>

          <div className="space-y-3">
            {[
              'Plan de marketing detaliat (12 luni) cu obiective clare',
              'Buget defalcat pe categorii și luni',
              'Oferte/Proforma de la furnizori (agentii, freelanceri)',
              'Dovadă că furnizorii sunt firme autorizate (CUI valid)',
              'Prezentare strategie: cine, ce, când, unde, cum?',
              'Indicatori de performanță (KPI-uri) măsurabili',
              'Plan de raportare (cum vei dovedi rezultatele?)',
              'Research piață (competiție, clienți țintă)',
              'Timeline realist de implementare',
              'Contingency plan (ce faci dacă ceva nu funcționează?)',
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-white border border-gray-light rounded-lg p-4 hover:border-navy/30 transition-smooth">
                <input 
                  type="checkbox" 
                  className="mt-1 w-5 h-5 rounded border-gray-light"
                />
                <span className="text-gray-dark">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
            <p className="text-green-900 font-semibold mb-2">💚 Pro Tip:</p>
            <p className="text-green-800">
              Evaluatorii apreciază <strong>planuri realiste și bine documentate</strong> mai mult 
              decât promisiuni grandioase. Arată că ai făcut research, că înțelegi piața, și că 
              ai un plan concret de implementare.
            </p>
          </div>
        </section>

        {/* CTA Final */}
        <section className="bg-gradient-to-br from-navy to-navy/90 text-white p-12 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ai nevoie de ajutor cu planul de marketing?</h2>
          <p className="text-xl text-white/80 mb-8">
            Echipa OWLIA te poate ajuta să creezi un plan complet, eligibil pentru Start-Up Nation, 
            și să implementăm totul pentru tine în următoarele 12 luni.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/start-up-nation#pricing"
              className="inline-flex items-center gap-2 bg-white text-navy px-8 py-4 rounded-xl font-bold hover:scale-105 transition-smooth"
            >
              Vezi Pachetele →
            </a>
            <a
              href="/start-up-nation#calculator"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-smooth border-2 border-white/30"
            >
              Calculează Bugetul
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

