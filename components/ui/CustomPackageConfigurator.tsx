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
  { id: "strategy", title: "Analiză & Strategie Marketing", description: "Audit complet, plan 12 luni", price: 4000, category: "Strategie" },
  
  // Branding
  { id: "logo-digital", title: "Logo Digital", description: "3 variante, culori, PNG/SVG", price: 5000, category: "Branding" },
  { id: "logo-full", title: "Logo + Brand Manual", description: "Brand book complet 20 pagini", price: 10000, category: "Branding" },
  
  // Digital
  { id: "website", title: "Website 8-10 Pagini", description: "Responsive, SEO, Analytics", price: 10000, category: "Digital" },
  { id: "google-business", title: "Google Business", description: "Setup + optimizare + 10 poze", price: 4000, category: "Digital" },
  { id: "seo", title: "SEO Monitoring (12 luni)", description: "Tracking + optimizări lunare", price: 3000, category: "Digital" },
  
  // Social Media
  { id: "sm-basic", title: "Social Media Basic (8 postări/lună)", description: "FB/IG, Canva design, 12 luni", price: 8000, category: "Social Media" },
  { id: "sm-advanced", title: "Social Media Advanced (16 postări/lună)", description: "Design custom, stories, 12 luni", price: 14000, category: "Social Media" },
  { id: "community", title: "Community Management", description: "Răspuns comentarii, engagement, 12 luni", price: 4000, category: "Social Media" },
  
  // Content
  { id: "video", title: "Video 60sec", description: "Filmare + montaj profesional", price: 3000, category: "Content" },
  { id: "foto", title: "Fotografie Produse (10 poze)", description: "Poze profesionale pentru catalog", price: 2000, category: "Content" },
  
  // Print
  { id: "print-basic", title: "Print Basic", description: "500 cărți vizită + 1000 flyere", price: 2500, category: "Print" },
  { id: "uniforms", title: "Uniforme (6 seturi)", description: "Tricouri/Polos brodare logo", price: 2500, category: "Print" },
  { id: "wrapping", title: "Wrapping Auto", description: "Design + print + montaj folie", price: 3500, category: "Print" },
  { id: "rollup", title: "Roll-up + Banner", description: "2 roll-up + 1 banner standuri", price: 2000, category: "Print" },
  
  // Support
  { id: "reports", title: "Rapoarte Lunare (12 luni)", description: "Stats, insights, recomandări PDF", price: 2000, category: "Support" },
  { id: "support", title: "Support & Consultanță (12 luni)", description: "Email/WhatsApp, call-uri lunare", price: 2000, category: "Support" },
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

