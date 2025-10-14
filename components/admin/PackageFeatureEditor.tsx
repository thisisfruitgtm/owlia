"use client";

import { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import Input from "@/components/ui/Input";

interface Feature {
  title: string;
  description?: string;
}

interface Props {
  features: Feature[];
  onChange: (features: Feature[]) => void;
}

export default function PackageFeatureEditor({ features, onChange }: Props) {
  const addFeature = () => {
    onChange([...features, { title: "", description: "" }]);
  };

  const updateFeature = (index: number, field: keyof Feature, value: string) => {
    const updated = [...features];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeFeature = (index: number) => {
    onChange(features.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-gray">
          Features (titlu + descriere opțională)
        </label>
        <button
          type="button"
          onClick={addFeature}
          className="flex items-center gap-2 text-sm bg-navy text-white px-3 py-1.5 rounded-lg hover:bg-navy/90 transition-smooth"
        >
          <Plus size={16} />
          Adaugă Feature
        </button>
      </div>

      {features.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-light">
          <p className="text-gray text-sm">Niciun feature încă. Click "Adaugă Feature" pentru a începe.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-4 border border-gray-light"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 cursor-move text-gray">
                  <GripVertical size={20} />
                </div>
                
                <div className="flex-1 space-y-3">
                  <Input
                    type="text"
                    placeholder="Titlu feature (ex: Website 8-10 pagini)"
                    value={feature.title}
                    onChange={(e) => updateFeature(index, "title", e.target.value)}
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Descriere opțională (ex: Responsive, optimizat SEO)"
                    value={feature.description || ""}
                    onChange={(e) => updateFeature(index, "description", e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-smooth"
                >
                  <Trash2 size={20} className="text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

