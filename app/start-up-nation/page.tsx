"use client";

import { useState } from "react";
import Navigation from "@/components/ui/Navigation";
import Calculator from "@/components/ui/Calculator";
import PricingSection from "@/components/ui/PricingSection";
import BreakdownSection from "@/components/ui/BreakdownSection";
import FAQ from "@/components/ui/FAQ";
import GuideModal from "@/components/ui/GuideModal";
import Link from "next/link";

export default function StartUpNationPage() {
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="mt-20 pt-24 pb-20 bg-gradient-to-b from-cream to-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-navy leading-tight tracking-tight mb-6">
            Urmează să primești Start-Up Nation?
            <br />
            Te ajutăm să aloci corect
            <br />
            bugetul de marketing
          </h1>
          <p className="text-xl md:text-2xl text-gray max-w-4xl mb-10 leading-relaxed">
            Îți calculăm exact cât să investești pe baza industriei tale, apoi implementăm totul pentru tine în următoarele 12 luni. 
            Primești rapoarte lunare pregătite pentru evaluatori - fără stres, fără confuzie.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="#pricing"
              className="inline-flex items-center gap-3 bg-navy text-white px-10 py-5 rounded-xl font-semibold text-lg hover:-translate-y-1 hover:shadow-xl transition-smooth"
            >
              Vreau să vă ocupați voi
            </Link>
            <Link
              href="#calculator"
              className="inline-flex items-center gap-3 bg-transparent text-navy px-10 py-5 rounded-xl font-semibold text-lg underline decoration-2 underline-offset-[6px] hover:bg-cream transition-smooth"
            >
              <span>📊</span>
              Calculează bugetul necesar
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-12 mt-16 pt-10 border-t border-gray-light">
            <div>
              <div className="text-4xl font-bold text-navy mb-1">50+</div>
              <div className="text-sm text-gray">Beneficiari Start-Up Nation</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-navy mb-1">2.5M+</div>
              <div className="text-sm text-gray">Lei fonduri gestionate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-navy mb-1">100%</div>
              <div className="text-sm text-gray">Raportări aprobate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-navy mb-4">De ce majoritatea pierd bani pe marketing?</h2>
          <p className="text-lg text-gray mb-12">Ai fondurile aprobate, dar nu știi concret ce să faci cu ele</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "⚠️",
                title: "Cât să pui în marketing?",
                description: "30.000 lei? 50.000 lei? Nimeni nu-ți spune exact cât e normal pentru un business ca al tău."
              },
              {
                icon: "⏰",
                title: "Ai termene limită",
                description: "Banii trebuie cheltuiți în timp - dacă întârzii sau greșești, îi pierzi pe toți."
              },
              {
                icon: "📋",
                title: "Hârtii peste hârtii",
                description: "Trebuie să trimiți rapoarte lunare la evaluatori - dacă nu-s bune, ai probleme mari."
              },
              {
                icon: "🎯",
                title: "5 furnizori diferiți",
                description: "Logo de undeva, site de aiurea, social media de altundeva - te înnebunești cu coordonarea."
              },
              {
                icon: "💸",
                title: "Cheltuieli neeligibile",
                description: "Pui bani în Google Ads sau Facebook Ads și descoperi că nu sunt eligibile - fondurile irosite."
              },
              {
                icon: "🤷",
                title: "Nu știi cum să măsori",
                description: "Ai cheltuit 50.000 lei dar nu știi câți clienți au venit de aici - nu poți dovedi ROI-ul."
              }
            ].map((problem, i) => (
              <div key={i} className="p-8 bg-cream rounded-2xl hover:-translate-y-1 transition-smooth">
                <div className="text-3xl mb-4">{problem.icon}</div>
                <h3 className="text-xl font-semibold text-navy mb-3">{problem.title}</h3>
                <p className="text-gray">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">Cum funcționează colaborarea?</h2>
          <p className="text-xl text-white/70 mb-12">Simplu: Ne spui ce afacere ai, îți calculăm bugetul optim și implementăm totul</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              {
                text: "Îți calculăm bugetul exact:",
                detail: "Pe baza industriei tale și a cifrei de afaceri proiectate în primul an"
              },
              {
                text: "Totul într-un singur loc:",
                detail: "Logo, website, materiale, rapoarte - nu mai alergi după mai mulți furnizori"
              },
              {
                text: "Respectăm termenele:",
                detail: "Știm când trebuie făcut fiecare lucru ca să nu pierzi fondurile"
              },
              {
                text: "Rapoarte gata făcute:",
                detail: "Primești lunar tot ce trebuie trimis la evaluatori, fără stres"
              }
            ].map((benefit, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-2xl flex-shrink-0">✓</span>
                <div>
                  <span className="font-semibold">{benefit.text}</span> {benefit.detail}
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "1",
                title: "Analiza afacerii tale",
                description: "Analizăm planul tău și concurența din piață. Îți calculăm exact cât trebuie să investești în marketing și cum să aloce bugetul în 12 luni."
              },
              {
                number: "2",
                title: "Implementare rapidă",
                description: "Logo, website, materiale pentru print, prezență online - totul gata în primele 1-2 luni."
              },
              {
                number: "3",
                title: "Management 12 luni",
                description: "Primești rapoarte lunare, actualizăm site-ul, răspundem la întrebări - ești acoperit tot anul."
              }
            ].map((step, i) => (
              <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-2xl">
                <div className="w-10 h-10 bg-white text-navy rounded-full flex items-center justify-center font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-navy mb-12 text-center">Cine suntem și de ce să ai încredere?</h2>
          
          <div className="text-center mb-16">
            <p className="text-lg text-gray mb-4 leading-relaxed">
              Bună! Sunt <strong>Mihail Petru Marincea</strong>, fondator și coordonator al echipei. Facem marketing digital și website-uri de 16 ani. Actual și formator pentru Start-Up Nation pregătind companiile cu noțiuni de competențe Antreprenoriale.
            </p>
            <p className="text-lg text-gray leading-relaxed">
              Am început în domeniu la 15 ani, când am dezvoltat primul sistem pentru compania în care lucram. De atunci, echipa noastră a livrat peste <strong>100 de proiecte</strong> - de la tech și retail, la restaurante, saloane, construcții - toate industriile pe care le vezi aici.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: "Owlia - Agenție de Marketing - Finanțat pe fornduri europene",
                description: "Pentru companiile la inceput de drum, divizia noastră pentru companiile la inceput de drum. Specialiști in marketing digital și strategie de marketing offline."
              },
              {
                name: "Fruit Creative",
                description: "Compania noastră principală unde lucrăm cu companiile care sunt mature pe piață și au o afacere stabilă."
              },
              {
                name: "Omnisfera",
                description: "Rețea de antreprenori din mai multe țări unde colaborăm la proiecte internaționale și oferim consultanță strategică."
              }
            ].map((company, i) => (
              <div key={i} className="p-8 bg-cream rounded-2xl hover:-translate-y-1 transition-smooth">
                <h3 className="text-xl font-bold text-navy mb-3">{company.name}</h3>
                <p className="text-gray leading-relaxed">{company.description}</p>
              </div>
            ))}
          </div>
          
          <h3 className="text-2xl font-bold text-navy mb-10 text-center">De ce să lucrezi cu echipa noastră?</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                number: "01",
                title: "Experiență Start-Up Nation",
                description: "Am lucrat cu peste 50 de beneficiari Start-Up Nation. Știm exact ce trebuie făcut, când și cum, pentru a respecta toate cerințele."
              },
              {
                number: "02",
                title: "Implementare rapidă",
                description: "Logo, site, materiale - totul gata în 4-6 săptămâni, nu în 3-4 luni. Avem procesele rodate."
              },
              {
                number: "03",
                title: "Rezultate măsurabile",
                description: "Primești raportări clare lunare: câți vizitatori pe site, câte apeluri primești, ce funcționează și ce nu."
              },
              {
                number: "04",
                title: "Comunicare directă",
                description: "Lucrezi direct cu echipa noastră, nu te direcționăm către juniori. Răspundem în 24h, avem o oră de consultanță lunară."
              },
              {
                number: "05",
                title: "Portofoliu variat",
                description: "Avem clienți din toate brașele - de la instituții și firme mari, la afaceri mici și start-up-uri. Știm ce funcționează în fiecare industrie."
              },
              {
                number: "06",
                title: "Echipă completă internă",
                description: "Nu subcontractăm nimic. Design, development, copywriting, strategie - toți oamenii sunt în echipa noastră, totul e coordonat perfect."
              }
            ].map((why, i) => (
              <div key={i} className="relative pt-16">
                <span className="absolute top-0 left-0 text-6xl font-bold text-cream leading-none">
                  {why.number}
                </span>
                <h4 className="text-lg font-semibold text-navy mb-2">{why.title}</h4>
                <p className="text-gray">{why.description}</p>
              </div>
            ))}
          </div>
          
          <div className="p-8 bg-navy rounded-2xl text-center">
            <p className="text-white text-lg">
              <strong>100+ proiecte livrate</strong> · <strong>16+ ani experiență</strong> · <strong>3 companii fondate</strong> · <strong>50+ beneficiari Start-Up Nation</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <Calculator />

      {/* Pricing */}
      <PricingSection />

      {/* Breakdown */}
      <BreakdownSection />

      {/* Guarantees */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-navy mb-4 text-center">Ce garanții ai?</h2>
          <p className="text-lg text-gray mb-12 text-center">Nu te lăsăm în clipa 2 după ce primești fondurile</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "📋",
                title: "Rapoarte gata făcute",
                description: "Îți oferim lunar toate documentele necesare, formatate corect pentru evaluatori."
              },
              {
                icon: "📊",
                title: "Contract clar 12 luni",
                description: "Știi ce primești și când. Dacă după 6 luni nu merge, poți renunța."
              },
              {
                icon: "⚡",
                title: "Răspundem repede",
                description: "Ai o întrebare? Răspundem în maxim 24h. Garantat."
              },
              {
                icon: "✅",
                title: "Toată documentația",
                description: "Primești toate documentele necesare pentru raportări la Start-Up Nation."
              }
            ].map((guarantee, i) => (
              <div key={i} className="p-8 bg-cream rounded-2xl text-center">
                <div className="text-5xl mb-4">{guarantee.icon}</div>
                <h3 className="text-xl font-semibold text-navy mb-3">{guarantee.title}</h3>
                <p className="text-gray">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section className="py-20 bg-navy text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">Descarcă ghidul gratuit</h2>
          <p className="text-xl text-white/90 mb-8">"Cât Buget să Aloci pentru Marketing în Primul An"</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-10 text-left">
            {[
              "Cât alocă fiecare industrie",
              "Calculator simplu",
              "Greșeli de evitat",
              "Ce e eligibil și ce nu"
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-white text-2xl">✓</span>
                <span className="text-white/90">{feature}</span>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => setIsGuideModalOpen(true)}
            className="inline-flex items-center gap-3 bg-white text-navy px-10 py-5 rounded-xl font-semibold text-lg hover:-translate-y-1 hover:shadow-2xl transition-smooth"
          >
            <span>📥</span>
            Descarcă Ghidul (Gratis)
          </button>
          
          <p className="text-sm mt-4 text-white/60">
            sau contactează-ne pe{" "}
            <a
              href="https://wa.me/40778767940?text=Bună!%20Vreau%20ghidul%20gratuit%20despre%20bugetul%20de%20marketing."
              className="text-white/90 underline"
            >
              WhatsApp
            </a>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* Final CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-navy mb-6">Gata să începem?</h2>
          <p className="text-xl text-gray mb-10">
            Solicită o consultanță gratuită de 30 de minute și află exact<br />
            cât buget să aloci pentru marketing în primul an.
          </p>
          <a
            href="https://wa.me/40778767940?text=Bună!%20Vreau%20o%20consultanță%20gratuită%20de%2030%20min%20pentru%20Start-Up%20Nation."
            className="inline-flex items-center gap-3 bg-navy text-white px-12 py-6 rounded-xl font-semibold text-xl hover:-translate-y-1 hover:shadow-2xl transition-smooth"
          >
            <span>💬</span>
            Solicită Consultanță Gratuită
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-dark text-white/70 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm">&copy; 2025 OWLIA - Echipa ta de Marketing. Toate drepturile rezervate.</p>
          <p className="text-xs mt-2">Acest model este proprietatea OWLIA și nu poate fi replicat fără consimțământ. Publicat: 8 Octombrie 2025</p>
        </div>
      </footer>

      {/* Guide Modal */}
      <GuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />
    </>
  );
}

