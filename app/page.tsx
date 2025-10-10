import Navigation from "@/components/ui/Navigation";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="mt-20 pt-24 pb-20 bg-gradient-to-b from-cream to-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-navy leading-tight tracking-tight mb-6">
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
              className="inline-flex items-center gap-3 bg-navy text-white px-10 py-5 rounded-xl font-semibold text-lg hover:opacity-90 transition-smooth"
            >
              Vreau să vă ocupați voi
            </Link>
            <Link
              href="#calculator"
              className="inline-flex items-center gap-3 bg-transparent text-navy px-10 py-5 rounded-xl font-semibold text-lg underline underline-offset-8 hover:bg-cream transition-smooth"
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

      {/* Placeholder for other sections */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray">Mai multe secțiuni vor fi adăugate în curând...</p>
          <p className="text-sm text-gray mt-2">Landing page complet în dezvoltare</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-dark text-white/70 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm">&copy; 2025 OWLIA - Echipa ta de Marketing. Toate drepturile rezervate.</p>
          <p className="text-xs mt-2">Acest model este proprietatea OWLIA și nu poate fi replicat fără consimțământ. Publicat: 8 Octombrie 2025</p>
        </div>
      </footer>
    </>
  );
}
