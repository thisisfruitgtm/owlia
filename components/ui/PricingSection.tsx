"use client";

import { useState, useEffect } from "react";
import PackageModal from "./PackageModal";
import CustomPackageConfigurator from "./CustomPackageConfigurator";

interface Package {
  id: string;
  name: string;
  price: number;
  priceMonthly: number | null;
  description: string | null;
  features: Array<{ title: string; description?: string }>;
  active: boolean;
}

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
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCustomConfigurator, setShowCustomConfigurator] = useState(false);
  
  useEffect(() => {
    fetchPackages();
  }, []);

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

  const fetchPackages = async () => {
    try {
      const response = await fetch("/api/packages");
      const data = await response.json();
      setPackages((data.packages || []).filter((p: Package) => p.active));
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const openModal = (packageName: string, price: string) => {
    if (isLocked) return;
    
    setSelectedPackage({ name: packageName, price });
    setModalOpen(true);
  };

  const formatPrice = (price: number) => {
    return (price / 1000).toFixed(0) + ".000";
  };

  if (loading) {
    return (
      <section id="pricing" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-gray">Se încarcă pachete...</div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="pricing" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Lock Overlay */}
          {isLocked && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-3xl">
              <div className="text-center max-w-md">
                <div className="text-6xl mb-4">🔒</div>
                <h3 className="text-2xl font-bold text-navy mb-2">Prețurile sunt blocate</h3>
                <p className="text-gray">Completează calculatorul mai jos pentru a vedea prețurile și pachetul recomandat pentru tine</p>
                <a
                  href="#calculator"
                  className="inline-block mt-6 px-8 py-3 bg-navy text-white rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-xl transition-smooth"
                >
                  Calculează Bugetul →
                </a>
              </div>
            </div>
          )}
          
          <h2 className="text-4xl font-bold text-navy text-center mb-4">
            Selectează pachetul potrivit
          </h2>
          <p className="text-lg text-gray text-center mb-10">
            Tot ce ai nevoie pentru Start-Up Nation, într-un singur loc
          </p>
          
          {/* Annual/Semestrial Toggle */}
          <div className="flex justify-center items-center gap-4 mb-12">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-8 py-4 rounded-xl font-semibold transition-smooth ${
                !isAnnual ? 'bg-navy text-white' : 'bg-cream text-gray'
              }`}
            >
              Semestrial (2 plăți)
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-8 py-4 rounded-xl font-semibold transition-smooth relative ${
                isAnnual ? 'bg-navy text-white' : 'bg-cream text-gray'
              }`}
            >
              Anual (o plată)
              <span className="absolute -top-2 -right-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                Economisești
              </span>
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12 items-start">
            {packages.map((pkg, index) => {
              const isRecommended = !isLocked && recommendedPackage === pkg.name;
              const isPremium = pkg.name === "PREMIUM";
              
              return (
                <div
                  key={pkg.id}
                  className={`p-12 rounded-3xl transition-smooth relative ${
                    isPremium
                      ? 'bg-navy text-white border-2 border-navy'
                      : 'bg-cream border-2 border-transparent hover:border-navy'
                  } ${
                    isRecommended
                      ? 'ring-4 ring-navy/20 scale-105'
                      : 'hover:-translate-y-2'
                  }`}
                >
                  {isPremium && (
                    <div className="absolute -top-3 right-10 bg-white text-navy px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                      Cel mai ales
                    </div>
                  )}
                  
                  <h3 className={`text-2xl font-bold mb-2 ${isPremium ? 'text-white' : 'text-navy'}`}>
                    {pkg.name}
                  </h3>
                  <p className={`mb-6 ${isPremium ? 'text-white/70' : 'text-gray'}`}>
                    {pkg.description || "Pachet servicii"}
                  </p>
                  
                  <div className={`text-5xl font-bold mb-2 ${isPremium ? 'text-white' : 'text-navy'}`}>
                    {formatPrice(isAnnual ? pkg.price : (pkg.priceMonthly || pkg.price))}
                    <span className="text-2xl"> lei</span>
                  </div>
                  <div className={`text-sm mb-8 ${isPremium ? 'text-white/70' : 'text-gray'}`}>
                    {isAnnual ? 'Tot anul 1 (o plată)' : 'per 6 luni (2 plăți)'}
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {(pkg.features || []).map((feature, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-3 pb-3 ${
                          isPremium
                            ? 'border-white/10 text-white'
                            : 'text-gray-dark border-gray-light'
                        } border-b`}
                      >
                        <span className={isPremium ? 'text-white' : 'text-navy'}>✓</span>
                        <div>
                          <span className="font-medium">{feature.title}</span>
                          {feature.description && (
                            <p className={`text-sm mt-1 ${isPremium ? 'text-white/60' : 'text-gray'}`}>
                              {feature.description}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => openModal(pkg.name, formatPrice(isAnnual ? pkg.price : (pkg.priceMonthly || pkg.price)))}
                    disabled={isLocked}
                    className={`w-full text-center py-4 rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-xl transition-smooth disabled:opacity-50 disabled:cursor-not-allowed ${
                      isPremium
                        ? 'bg-white text-navy'
                        : 'bg-navy text-white'
                    }`}
                  >
                    Vreau {pkg.name}
                  </button>
                </div>
              );
            })}

            {/* PERSONALIZAT Card */}
            <div className="p-12 bg-gradient-to-br from-purple-600 to-purple-800 text-white border-2 border-purple-600 rounded-3xl transition-smooth hover:-translate-y-2">
              <h3 className="text-2xl font-bold mb-2">PERSONALIZAT</h3>
              <p className="text-white/70 mb-6">Configurează-ți pachetul</p>
              
              <div className="text-5xl font-bold mb-2">
                La cerere
              </div>
              <div className="text-sm text-white/70 mb-8">
                Plătești doar ce ai nevoie
              </div>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Alegi serviciile care te interesează',
                  'Vezi prețul calculat instant',
                  'Consultanță gratuită pentru optimizare',
                  'Flexibilitate 100%',
                  'Plată în 2 rate fără dobândă',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 border-b border-white/10 pb-3">
                    <span className="text-white">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => setShowCustomConfigurator(true)}
                disabled={isLocked}
                className="w-full text-center py-4 bg-white text-purple-600 rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-xl transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Configurează Pachetul
              </button>
            </div>
          </div>
        </div>
      </section>

      <PackageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        packageName={selectedPackage?.name || ""}
        packagePrice={selectedPackage?.price || ""}
        prefilledEmail={userEmail}
        leadId={leadId}
      />

      <CustomPackageConfigurator
        isOpen={showCustomConfigurator}
        onClose={() => setShowCustomConfigurator(false)}
      />
    </>
  );
}
