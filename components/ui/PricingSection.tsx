"use client";

import { useState, useEffect } from "react";
import PackageModal from "./PackageModal";

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [recommendedPackage, setRecommendedPackage] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{
    name: string;
    price: string;
  } | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const [leadId, setLeadId] = useState<string>("");
  
  useEffect(() => {
    const handleUnlock = (event: any) => {
      setIsLocked(false);
      setRecommendedPackage(event.detail.recommendedPackage);
      setUserEmail(event.detail.email || "");
      setLeadId(event.detail.leadId || "");
    };
    
    window.addEventListener('unlockPricing', handleUnlock);
    
    return () => {
      window.removeEventListener('unlockPricing', handleUnlock);
    };
  }, []);
  
  const openModal = (packageName: string, price: string) => {
    if (isLocked) return;
    
    setSelectedPackage({ name: packageName, price });
    setModalOpen(true);
  };

  return (
    <>
      <section className="py-20 bg-white relative" id="pricing">
        {/* Lock Overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="text-center max-w-md px-6">
              <div className="text-6xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-navy mb-3">
                Calculează mai întâi bugetul recomandat
              </h3>
              <p className="text-gray mb-6">
                Pentru a vedea pachetele potrivite pentru tine, completează calculatorul de mai sus și află cât ar trebui să investești în marketing.
              </p>
              <button
                onClick={() => {
                  const calculator = document.getElementById('calculator');
                  calculator?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="inline-flex items-center gap-2 bg-navy text-white px-8 py-4 rounded-xl font-semibold hover:-translate-y-1 hover:shadow-xl transition-smooth"
              >
                <span>📊</span>
                Mergi la Calculator
              </button>
            </div>
          </div>
        )}
        
        <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-navy mb-4 text-center">Cât costă?</h2>
        <p className="text-lg text-gray mb-10 text-center">3 variante - alegi ce ți se potrivește</p>
        
        <div className="flex justify-center items-center gap-4 mb-12">
          <span className={`text-base font-semibold ${!isAnnual ? 'text-navy' : 'text-gray'} transition-smooth`}>
            Plată la 6 luni
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative w-15 h-8 rounded-full transition-smooth ${isAnnual ? 'bg-navy' : 'bg-gray-light'}`}
          >
            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${isAnnual ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
          <span className={`text-base font-semibold ${isAnnual ? 'text-navy' : 'text-gray'} transition-smooth`}>
            Plată anuală
            <span className="ml-2 inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-xl">
              -5%
            </span>
          </span>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {/* SMART */}
          <div className={`p-12 bg-cream border-2 rounded-3xl transition-smooth ${
            !isLocked && recommendedPackage === 'SMART' 
              ? 'border-navy ring-4 ring-navy/20 scale-105' 
              : 'border-transparent hover:-translate-y-2 hover:border-navy'
          }`}>
            <h3 className="text-2xl font-bold text-navy mb-2">SMART</h3>
            <p className="text-gray mb-6">Doar digital (fără print)</p>
            <div className="text-5xl font-bold text-navy mb-2">
              {isAnnual ? '42.000' : '22.105'}
              <span className="text-2xl"> lei</span>
            </div>
            <div className="text-sm text-gray mb-8">
              {isAnnual ? 'Tot anul 1 (o plată)' : 'per 6 luni (2 plăți = 44.210 lei)'}
            </div>
            <ul className="space-y-3 mb-8">
              {[
                'Îți calculăm bugetul',
                'Logo digital',
                'Website 8-10 pagini',
                'Google Business',
                'Strategie social media',
                'Management 12 luni',
                'Rapoarte lunare'
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-dark border-b border-gray-light pb-3">
                  <span className="text-navy">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => openModal('SMART', isAnnual ? '42.000' : '22.105')}
              disabled={isLocked}
              className="w-full text-center py-4 bg-navy text-white rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-xl transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Vreau SMART
            </button>
          </div>
          
          {/* PREMIUM */}
          <div className={`p-12 bg-navy text-white border-2 border-navy rounded-3xl transition-smooth relative ${
            !isLocked && (recommendedPackage === 'PREMIUM' || recommendedPackage === 'PREMIUM_PLUS')
              ? 'ring-4 ring-white/30 scale-105' 
              : 'hover:-translate-y-2'
          }`}>
            <div className="absolute -top-3 right-10 bg-white text-navy px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
              Cel mai ales
            </div>
            <h3 className="text-2xl font-bold mb-2">PREMIUM</h3>
            <p className="text-white/70 mb-6">Totul inclus (digital + print)</p>
            <div className="text-5xl font-bold mb-2">
              {isAnnual ? '55.000' : '28.947'}
              <span className="text-2xl"> lei</span>
            </div>
            <div className="text-sm text-white/70 mb-8">
              {isAnnual ? 'Tot anul 1 (o plată)' : 'per 6 luni (2 plăți = 57.894 lei)'}
            </div>
            <ul className="space-y-3 mb-8">
              {[
                'Tot ce e la SMART +',
                'Logo complet + manual',
                'Uniforme (6 seturi)',
                'Folie pe mașină',
                'Cărți vizită, flyere',
                'Roll-up + Banner',
                'Training 3 ore pentru echipa ta'
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 border-b border-white/10 pb-3">
                  <span className="text-white">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => openModal('PREMIUM', isAnnual ? '55.000' : '28.947')}
              disabled={isLocked}
              className="w-full text-center py-4 bg-white text-navy rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-xl transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Vreau PREMIUM
            </button>
          </div>
          
          {/* PERSONALIZAT */}
          <div className={`p-12 bg-cream border-2 rounded-3xl transition-smooth ${
            !isLocked && recommendedPackage === 'CUSTOM'
              ? 'border-navy ring-4 ring-navy/20 scale-105' 
              : 'border-transparent hover:-translate-y-2 hover:border-navy'
          }`}>
            <h3 className="text-2xl font-bold text-navy mb-2">PERSONALIZAT</h3>
            <p className="text-gray mb-6">Calculat special pentru tine</p>
            <div className="text-5xl font-bold text-navy mb-2">La cerere</div>
            <div className="text-sm text-gray mb-8">Cost analiză: 1.500 lei</div>
            <ul className="space-y-3 mb-8">
              {[
                'Analiză detaliată a planului tău (1.500 lei)',
                'Research competiție în nișă',
                'Calcul buget exact pentru industria ta',
                'Ofertă personalizată adaptată',
                'Flexibilitate 100%',
                'Adaptăm serviciile pe parcurs',
                'Documentație la cerere'
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-dark border-b border-gray-light pb-3">
                  <span className="text-navy">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => openModal('PERSONALIZAT', '1.500')}
              disabled={isLocked}
              className="w-full text-center py-4 bg-navy text-white rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-xl transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Vreau Ofertă
            </button>
          </div>
        </div>
      </div>
    </section>
    
    {/* Package Modal */}
    {selectedPackage && (
      <PackageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        packageName={selectedPackage.name}
        packagePrice={selectedPackage.price}
        prefilledEmail={userEmail}
        leadId={leadId}
      />
    )}
    </>
  );
}

