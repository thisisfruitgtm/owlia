export default function WhatIsMarketing() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Dar ce e ăsta "marketing"? 🤔
          </h2>
          <p className="text-xl text-gray leading-relaxed">
            Ai un business de vis, un produs grozav sau un serviciu de care lumea are nevoie. 
            Super! <span className="font-semibold text-navy">Dar cum află oamenii de tine?</span>
          </p>
        </div>

        {/* Simple Explanation Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left: The Problem */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="text-5xl mb-4">🤷‍♂️</div>
            <h3 className="text-2xl font-bold text-navy mb-4">
              Fără Marketing
            </h3>
            <ul className="space-y-3 text-gray">
              <li className="flex items-start gap-3">
                <span className="text-red-500 flex-shrink-0">✗</span>
                <span>Nimeni nu știe că exiști</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 flex-shrink-0">✗</span>
                <span>Nu ai clienți, chiar dacă ai cel mai bun produs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 flex-shrink-0">✗</span>
                <span>Competiția îți ia clienții</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 flex-shrink-0">✗</span>
                <span>Business-ul nu crește</span>
              </li>
            </ul>
          </div>

          {/* Right: The Solution */}
          <div className="bg-navy rounded-2xl p-8 text-white shadow-lg">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-4">
              Cu Marketing Bun
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-400 flex-shrink-0">✓</span>
                <span>Lumea află de business-ul tău</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 flex-shrink-0">✓</span>
                <span>Clienții te găsesc când au nevoie de tine</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 flex-shrink-0">✓</span>
                <span>Te diferențiezi de competiție</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 flex-shrink-0">✓</span>
                <span>Vinzi mai mult, faci profit</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Simple Definition */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-navy to-blue-900 rounded-3xl p-10 text-white text-center mb-16">
          <div className="text-6xl mb-6">💡</div>
          <h3 className="text-3xl font-bold mb-4">
            Deci ce e marketingul?
          </h3>
          <p className="text-xl leading-relaxed mb-6 text-white/90">
            E <span className="font-bold underline decoration-cream">totul ce faci ca să te facă lumea să te cunoască, 
            să te placă și să cumpere de la tine</span> în loc de competiție.
          </p>
          <p className="text-lg text-white/80">
            Logo, website, postări pe social media, reclame, newsletters, design - 
            toate astea sunt marketing.
          </p>
        </div>

        {/* Real Examples */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-navy text-center mb-8">
            Exemple concrete 👇
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🎨</div>
              <h4 className="font-bold text-navy mb-2">Logo & Brand</h4>
              <p className="text-sm text-gray">
                Ca să arăți profesionist și să te recunoască lumea
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🌐</div>
              <h4 className="font-bold text-navy mb-2">Website</h4>
              <p className="text-sm text-gray">
                Vitrina ta online, disponibilă 24/7 pentru clienți
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">📱</div>
              <h4 className="font-bold text-navy mb-2">Social Media</h4>
              <p className="text-sm text-gray">
                Postări regulate ca să fii prezent în mintea oamenilor
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="font-bold text-navy mb-2">Ads / Reclame</h4>
              <p className="text-sm text-gray">
                Plătești ca să ajungi exact la oamenii care te caută
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">⭐</div>
              <h4 className="font-bold text-navy mb-2">Google Business</h4>
              <p className="text-sm text-gray">
                Să apari când cineva caută pe Google serviciul tău
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">📧</div>
              <h4 className="font-bold text-navy mb-2">Email Marketing</h4>
              <p className="text-sm text-gray">
                Să ții legătura cu clienții și să îi aduci înapoi
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-navy/10">
            <h3 className="text-2xl font-bold text-navy mb-4">
              🎓 Ai înțeles ce e marketingul?
            </h3>
            <p className="text-gray mb-6">
              Perfect! Acum hai să vedem cum te ajutăm noi să faci marketing 
              profesionist pentru business-ul tău, fără să te complici.
            </p>
            <a
              href="#pricing"
              className="inline-block px-8 py-4 bg-navy text-white rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-xl transition-smooth"
            >
              Vezi Pachetele Noastre →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

