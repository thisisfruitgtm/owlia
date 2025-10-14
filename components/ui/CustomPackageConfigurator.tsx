"use client";

import { useState } from "react";
import { X, Check } from "lucide-react";
import Button from "./Button";
import PackageModal from "./PackageModal";

interface Feature {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
}

const availableFeatures: Feature[] = [
  // Strategy & Planning
  { id: "strategy", title: "Analiză & Strategie Marketing", description: "Audit industrie, competiție, plan 12 luni", price: 2500, category: "Strategie & Consultanță" },
  { id: "consult", title: "Consultanță Lunară (12 luni)", description: "Call-uri strategice, ajustări plan, recomandări", price: 1500, category: "Strategie & Consultanță" },
  
  // Branding
  { id: "logo-digital", title: "Logo Digital", description: "3 variante, culori brand, PNG/SVG toate mărimile", price: 1000, category: "Branding & Design" },
  { id: "logo-full", title: "Logo + Brand Manual Complet", description: "Brand book 15-20 pagini, templates Office/Social", price: 3500, category: "Branding & Design" },
  
  // Digital
  { id: "website-basic", title: "Website 5-6 Pagini", description: "Landing page responsive, SEO basic, formular", price: 2500, category: "Web & Digital" },
  { id: "website-full", title: "Website 8-10 Pagini", description: "Site complet, SEO avansat, Analytics, blog", price: 4500, category: "Web & Digital" },
  { id: "google-business", title: "Google Business Profile", description: "Setup complet, 10 poze, descriere optimizată", price: 800, category: "Web & Digital" },
  { id: "seo", title: "SEO (12 luni)", description: "Optimizare, tracking poziții, raport lunar", price: 2400, category: "Web & Digital" },
  
  // Social Media
  { id: "sm-basic", title: "Social Media Basic (8 postări/lună)", description: "FB/IG, Canva templates, programare - 12 luni", price: 4800, category: "Social Media" },
  { id: "sm-pro", title: "Social Media Pro (12 postări/lună)", description: "Design custom, copywriting, Stories - 12 luni", price: 7200, category: "Social Media" },
  { id: "sm-premium", title: "Social Media Premium (16 postări/lună)", description: "Design pro, Reels, engagement activ - 12 luni", price: 9600, category: "Social Media" },
  { id: "community", title: "Community Management (12 luni)", description: "Răspuns comentarii 3x/săptămână, inbox", price: 2400, category: "Social Media" },
  
  // Content
  { id: "video-basic", title: "Video Prezentare 30-60sec", description: "Filmare + montaj pentru social media", price: 1500, category: "Content & Media" },
  { id: "foto", title: "Sesiune Foto (10-15 poze)", description: "Poze produse/servicii, editare profesională", price: 800, category: "Content & Media" },
  { id: "reels", title: "Reels/TikTok (5 buc/lună)", description: "Producție video scurtă - 12 luni", price: 4800, category: "Content & Media" },
  
  // Print & Materials
  { id: "carti-vizita", title: "Cărți de Vizită (500 buc)", description: "Design + print + livrare curier inclusă", price: 400, category: "Materiale Print" },
  { id: "flyere", title: "Flyere A5 (1000 buc)", description: "Design + print color + livrare curier", price: 600, category: "Materiale Print" },
  { id: "brosuri", title: "Broșuri A4 (500 buc)", description: "Design + print color + livrare curier", price: 1200, category: "Materiale Print" },
  { id: "uniforms", title: "Uniforme Personalizate (6 seturi)", description: "Tricouri/Polos brodare logo + livrare", price: 1800, category: "Materiale Print" },
  { id: "wrapping", title: "Wrapping Autovehicul", description: "Design folie + print + montaj profesional", price: 2500, category: "Materiale Print" },
  { id: "rollup", title: "Roll-up Standuri (2 buc)", description: "200x85cm + husă transport + livrare", price: 800, category: "Materiale Print" },
  { id: "banner", title: "Banner Events (1 buc)", description: "300x200cm outdoor + livrare", price: 600, category: "Materiale Print" },
  
  // Reports & Support
  { id: "reports", title: "Rapoarte Lunare PDF (12 luni)", description: "Stats trafic, social, insights, recomandări", price: 1200, category: "Raportare & Support" },
  { id: "analytics", title: "Google Analytics Setup", description: "Configurare + dashboard personalizat + training", price: 500, category: "Raportare & Support" },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomPackageConfigurator({ isOpen, onClose }: Props) {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showLeadModal, setShowLeadModal] = useState(false);

  if (!isOpen) return null;

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const calculateTotal = () => {
    return selectedFeatures.reduce((total, id) => {
      const feature = availableFeatures.find((f) => f.id === id);
      return total + (feature?.price || 0);
    }, 0);
  };

  const total = calculateTotal();

  const categories = Array.from(
    new Set(availableFeatures.map((f) => f.category))
  );

  const handleContinue = () => {
    if (selectedFeatures.length === 0) {
      alert("Selectează cel puțin un serviciu");
      return;
    }
    setShowLeadModal(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full my-8">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-light sticky top-0 bg-white rounded-t-2xl z-10">
            <div>
              <h2 className="text-2xl font-bold text-navy">
                Pachet Personalizat
              </h2>
              <p className="text-gray">Alege exact ce ai nevoie</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-smooth"
            >
              <X size={24} className="text-navy" />
            </button>
          </div>

          {/* Features by Category */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {categories.map((category) => (
              <div key={category} className="mb-8">
                <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-navy rounded-full" />
                  {category}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {availableFeatures
                    .filter((f) => f.category === category)
                    .map((feature) => {
                      const isSelected = selectedFeatures.includes(feature.id);
                      return (
                        <button
                          key={feature.id}
                          onClick={() => toggleFeature(feature.id)}
                          className={`text-left p-4 rounded-xl border-2 transition-all ${
                            isSelected
                              ? "border-navy bg-navy/5 shadow-md"
                              : "border-gray-light hover:border-navy/30"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                isSelected
                                  ? "bg-navy border-navy"
                                  : "border-gray-light"
                              }`}
                            >
                              {isSelected && <Check size={14} className="text-white" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="font-semibold text-navy">
                                  {feature.title}
                                </h4>
                                <span className="text-sm font-bold text-navy whitespace-nowrap">
                                  {(feature.price / 1000).toFixed(0)}K
                                </span>
                              </div>
                              <p className="text-sm text-gray">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer with Total */}
          <div className="border-t border-gray-light p-6 bg-gray-50 rounded-b-2xl sticky bottom-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray">
                  {selectedFeatures.length}{" "}
                  {selectedFeatures.length === 1 ? "serviciu selectat" : "servicii selectate"}
                </p>
                <p className="text-3xl font-bold text-navy">
                  {(total / 1000).toFixed(0)}.000 lei
                </p>
                <p className="text-sm text-gray">
                  sau {(total / 2 / 1000).toFixed(0)}.000 lei x 2 rate
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-light rounded-xl font-semibold text-gray hover:bg-gray-100 transition-smooth"
                >
                  Anulează
                </button>
                <Button onClick={handleContinue} disabled={selectedFeatures.length === 0}>
                  Continuă →
                </Button>
              </div>
            </div>

            {total > 0 && (
              <div className="text-xs text-gray text-center">
                💡 Includem consultanță gratuită pentru a personaliza pachetul perfect pentru tine
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lead Capture Modal */}
      {showLeadModal && (
        <PackageModal
          isOpen={showLeadModal}
          onClose={() => {
            setShowLeadModal(false);
            onClose();
          }}
          packageName="PERSONALIZAT"
          packagePrice={`${(total / 1000).toFixed(0)}.000`}
          customFeatures={selectedFeatures.map(
            (id) => availableFeatures.find((f) => f.id === id)?.title || ""
          )}
        />
      )}
    </>
  );
}

