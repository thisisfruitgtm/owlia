"use client";

import { useState, FormEvent } from "react";

interface CalculatorResult {
  leadId: string;
  minBudget: number;
  maxBudget: number;
  packageName: string;
  packageInfo: string;
  whatsappMessage: string;
  email: string;
}

export default function Calculator() {
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const industry = formData.get("industry") as string;
    const revenue = parseFloat(formData.get("revenue") as string);
    const clients = parseInt(formData.get("clients") as string);
    const email = formData.get("email") as string;
    
    const industrySelect = e.currentTarget.querySelector('select[name="industry"]') as HTMLSelectElement;
    const industryName = industrySelect.options[industrySelect.selectedIndex].text;
    const marketingPercent = parseFloat(industrySelect.options[industrySelect.selectedIndex].dataset.percent || "6");
    
    const minBudget = Math.round((revenue * (marketingPercent - 1)) / 100);
    const maxBudget = Math.round((revenue * (marketingPercent + 1)) / 100);
    const avgBudget = Math.round((minBudget + maxBudget) / 2);
    
    // Save lead to database
    try {
      const response = await fetch('/api/leads/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          industry: industryName,
          revenue,
          targetClients: clients,
          recommendedBudget: `${minBudget}-${maxBudget}`,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save lead');
      }
      
      const { leadId } = await response.json();
    
    let packageName = '';
    let packageInfo = '';
    let whatsappMessage = '';
    let recommendedPackage = '';
    
    if (avgBudget < 42000) {
      packageName = 'Recomandăm Pachetul PERSONALIZAT';
      recommendedPackage = 'CUSTOM';
      packageInfo = `Pentru ${industryName} cu CA de ${revenue.toLocaleString('ro-RO')} lei, bugetul tău optim este ${minBudget.toLocaleString('ro-RO')} - ${maxBudget.toLocaleString('ro-RO')} lei. Îți recomandăm un pachet personalizat adaptat bugetului tău, care include elementele esențiale pentru Start-Up Nation.`;
      whatsappMessage = `Bună! Am calculat bugetul pentru afacerea mea:\n- Industrie: ${industryName}\n- CA An 1: ${revenue.toLocaleString('ro-RO')} lei\n- Target clienți: ${clients}\n- Buget recomandat: ${minBudget.toLocaleString('ro-RO')} - ${maxBudget.toLocaleString('ro-RO')} lei\n\nVreau o ofertă PERSONALIZATĂ adaptată bugetului meu.`;
    } else if (avgBudget >= 42000 && avgBudget < 55000) {
      packageName = 'Pachet SMART recomandat';
      recommendedPackage = 'SMART';
      packageInfo = `Pentru ${industryName} cu CA de ${revenue.toLocaleString('ro-RO')} lei și target de ${clients} clienți, pachetul SMART (42.000 lei) oferă focus digital optim și ROI maxim - perfect pentru bugetul tău.`;
      whatsappMessage = `Bună! Am calculat bugetul pentru afacerea mea:\n- Industrie: ${industryName}\n- CA An 1: ${revenue.toLocaleString('ro-RO')} lei\n- Target clienți: ${clients}\n- Buget recomandat: ${minBudget.toLocaleString('ro-RO')} - ${maxBudget.toLocaleString('ro-RO')} lei\n\nVreau informații despre Pachetul SMART (42.000 lei).`;
    } else if (avgBudget >= 55000 && avgBudget < 70000) {
      packageName = 'Pachet PREMIUM recomandat';
      recommendedPackage = 'PREMIUM';
      packageInfo = `Pentru ${industryName} cu CA de ${revenue.toLocaleString('ro-RO')} lei și target de ${clients} clienți, pachetul PREMIUM (55.000 lei) include tot ce ai nevoie: brand complet, digital și materiale fizice - ideal pentru bugetul tău.`;
      whatsappMessage = `Bună! Am calculat bugetul pentru afacerea mea:\n- Industrie: ${industryName}\n- CA An 1: ${revenue.toLocaleString('ro-RO')} lei\n- Target clienți: ${clients}\n- Buget recomandat: ${minBudget.toLocaleString('ro-RO')} - ${maxBudget.toLocaleString('ro-RO')} lei\n\nVreau informații despre Pachetul PREMIUM (55.000 lei).`;
    } else {
      packageName = 'Pachet PREMIUM + Campanii recomandat';
      recommendedPackage = 'PREMIUM_PLUS';
      packageInfo = `Pentru ${industryName} cu CA ambițioasă de ${revenue.toLocaleString('ro-RO')} lei și target de ${clients} clienți, recomandăm pachetul PREMIUM (55.000 lei) plus campanii Google/Facebook Ads susținute pentru a maximiza rezultatele.`;
      whatsappMessage = `Bună! Am calculat bugetul pentru afacerea mea:\n- Industrie: ${industryName}\n- CA An 1: ${revenue.toLocaleString('ro-RO')} lei\n- Target clienți: ${clients}\n- Buget recomandat: ${minBudget.toLocaleString('ro-RO')} - ${maxBudget.toLocaleString('ro-RO')} lei\n\nVreau o ofertă PREMIUM + Campanii de publicitate.`;
    }
    
    // Update lead with recommended package
    await fetch('/api/leads/calculator', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadId,
        recommendedPackage,
      }),
    });
    
    setResult({
      leadId,
      minBudget,
      maxBudget,
      packageName,
      packageInfo,
      whatsappMessage,
      email
    });
    
    setLoading(false);
    
    // Scroll to pricing section after showing result
    setTimeout(() => {
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Trigger pricing unlock event
        window.dispatchEvent(new CustomEvent('unlockPricing', { 
          detail: { 
            recommendedPackage,
            email,
            leadId
          } 
        }));
      }
    }, 500);
    
    } catch (error) {
      console.error('Error saving lead:', error);
      setLoading(false);
      alert('A apărut o eroare. Te rugăm să încerci din nou.');
    }
  };

  return (
    <section className="py-20 bg-cream" id="calculator">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-navy mb-4 text-center">Cât ar trebui să investești în marketing?</h2>
        <p className="text-lg text-gray mb-12 text-center">Completează 3 câmpuri și îți calculăm bugetul optim</p>
        
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-12 shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <label className="block text-sm font-semibold text-navy mb-2 uppercase tracking-wide">
                Ce faci? (industria)
              </label>
              <select
                name="industry"
                required
                className="w-full px-5 py-4 text-base border-2 border-gray-light rounded-xl focus:outline-none focus:border-navy transition-smooth"
              >
                <option value="">Alege ce faci</option>
                <option value="constructii" data-percent="5">Construcții & Instalații</option>
                <option value="horeca" data-percent="7">Restaurant / Cafenea / Hotel</option>
                <option value="it" data-percent="8">IT & Software</option>
                <option value="retail" data-percent="6">Magazin / Comerț</option>
                <option value="servicii-b2b" data-percent="6">Servicii pentru firme (consultanță, contabilitate)</option>
                <option value="servicii-b2c" data-percent="7">Servicii pentru oameni (salon, fitness, etc)</option>
                <option value="productie" data-percent="5">Producție</option>
                <option value="sanatate" data-percent="6">Sănătate & Wellness</option>
                <option value="educatie" data-percent="7">Educație & Training</option>
                <option value="transport" data-percent="4">Transport & Logistică</option>
              </select>
            </div>
            
            <div className="mb-8">
              <label className="block text-sm font-semibold text-navy mb-2 uppercase tracking-wide">
                Cifra de afaceri proiectată (primul an, în lei)
              </label>
              <input
                type="number"
                name="revenue"
                required
                min="0"
                step="1000"
                placeholder="Ex: 840.000 lei"
                className="w-full px-5 py-4 text-base border-2 border-gray-light rounded-xl focus:outline-none focus:border-navy transition-smooth"
              />
            </div>
            
            <div className="mb-8">
              <label className="block text-sm font-semibold text-navy mb-2 uppercase tracking-wide">
                Câți clienți/contracte vizezi în primul an?
              </label>
              <input
                type="number"
                name="clients"
                required
                min="1"
                placeholder="Ex: 30 clienți"
                className="w-full px-5 py-4 text-base border-2 border-gray-light rounded-xl focus:outline-none focus:border-navy transition-smooth"
              />
            </div>
            
            <div className="mb-8">
              <label className="block text-sm font-semibold text-navy mb-2 uppercase tracking-wide">
                Email (pentru rezultatul personalizat)
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="email@exemplu.ro"
                className="w-full px-5 py-4 text-base border-2 border-gray-light rounded-xl focus:outline-none focus:border-navy transition-smooth"
              />
              <p className="text-xs text-gray mt-2">
                💡 Vei primi rezultatul calculat și pe email
              </p>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-navy text-white rounded-xl text-base font-semibold hover:-translate-y-0.5 hover:shadow-xl transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Se calculează...' : '📊 Calculează Bugetul'}
            </button>
          </form>
          
          {result && (
            <div className="mt-10 p-10 bg-cream rounded-2xl border-2 border-navy text-center animate-slide-in">
              <div className="inline-block px-4 py-2 bg-navy text-white rounded-lg text-sm font-semibold mb-4">
                {result.packageName}
              </div>
              <div className="text-sm text-gray font-semibold uppercase tracking-wide mb-2">
                Bugetul tău recomandat de marketing:
              </div>
              <div className="text-5xl font-bold text-navy mb-4">
                {result.minBudget.toLocaleString('ro-RO')} - {result.maxBudget.toLocaleString('ro-RO')} lei
              </div>
              <p className="text-base text-gray leading-relaxed mb-6">
                {result.packageInfo}
              </p>
              <a
                href={`https://wa.me/40123456789?text=${encodeURIComponent(result.whatsappMessage)}`}
                className="inline-flex items-center gap-2 bg-navy text-white px-8 py-4 rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-xl transition-smooth"
              >
                <span>💬</span>
                Vreau Analiză Detaliată
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

