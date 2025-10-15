import type { Metadata } from "next";
import Navigation from "@/components/ui/Navigation";
import HeroSection from "@/components/home/HeroSection";
import ProblemSection from "@/components/home/ProblemSection";
import SolutionSection from "@/components/home/SolutionSection";
import ServicesGrid from "@/components/home/ServicesGrid";
import WhatIsMarketing from "@/components/home/WhatIsMarketing";
import ProcessSteps from "@/components/home/ProcessSteps";
import CaseStudiesPreview from "@/components/home/CaseStudiesPreview";
import WhyOwlia from "@/components/home/WhyOwlia";
import IndustriesSection from "@/components/home/IndustriesSection";
import CTASection from "@/components/ui/CTASection";

export const metadata: Metadata = {
  title: "OWLIA - Marketing pentru Afaceri Noi | Brand, Website, Digital Marketing",
  description:
    "Marketing full-service pentru companii 0-3 ani. De la strategie la rezultate măsurabile. 16 ani experiență, 100+ proiecte livrate, rezultate concrete.",
  openGraph: {
    title: "OWLIA - Marketing pentru Afaceri Noi",
    description: "Construim brand-uri profitabile pentru afaceri noi.",
    images: ["/og-image.jpg"],
  },
};

export default function HomePage() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ServicesGrid />
      <WhatIsMarketing />
      <ProcessSteps />
      <CaseStudiesPreview />
      <WhyOwlia />
      <IndustriesSection />
      <CTASection
        title="Gata să crești?"
        description="Programează o consultanță gratuită de 30 de minute și discutăm despre business-ul tău. Analizăm situația și îți arătăm planul de creștere."
        buttonText="Consultanță Gratuită"
        buttonHref="https://wa.me/40123456789?text=Bună!%20Vreau%20o%20consultanță%20gratuită."
      />

      {/* Footer */}
      <footer className="py-10 bg-gray-dark text-white/70 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm">
            &copy; 2025 OWLIA - Echipa ta de Marketing. Toate drepturile
            rezervate.
          </p>
        </div>
      </footer>
    </>
  );
}
