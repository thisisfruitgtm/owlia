import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="mt-20 pt-24 pb-20 bg-gradient-to-b from-cream to-white">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-navy leading-tight tracking-tight mb-6">
          Construim Brand-uri Profitabile
          <br />
          pentru Afaceri Noi
        </h1>
        <p className="text-xl md:text-2xl text-gray max-w-4xl mb-10 leading-relaxed">
          Marketing full-service pentru companii 0-3 ani. De la strategie la rezultate măsurabile. Nu facem marketing pentru like-uri - facem marketing pentru vânzări.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://wa.me/40123456789?text=Bună!%20Vreau%20o%20consultanță%20gratuită."
            className="inline-flex items-center gap-3 bg-navy text-white px-10 py-5 rounded-xl font-semibold text-lg hover:-translate-y-1 hover:shadow-xl transition-smooth"
          >
            💬 Consultanță Gratuită 30 min
          </a>
          <Link
            href="#case-studies"
            className="inline-flex items-center gap-3 bg-transparent text-navy px-10 py-5 rounded-xl font-semibold text-lg underline decoration-2 underline-offset-[6px] hover:bg-cream transition-smooth"
          >
            <span>🚀</span>
            Vezi Cazurile de Succes
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap gap-12 mt-16 pt-10 border-t border-gray-light">
          <div>
            <div className="text-4xl font-bold text-navy mb-1">100+</div>
            <div className="text-sm text-gray">Proiecte livrate</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-navy mb-1">16 ani</div>
            <div className="text-sm text-gray">Experiență</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-navy mb-1">4M+ lei</div>
            <div className="text-sm text-gray">Creștere clienți (VipBebe)</div>
          </div>
        </div>
      </div>
    </section>
  );
}

