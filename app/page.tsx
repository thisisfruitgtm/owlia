import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL("https://owlia.ro"),
  title: {
    default:
      "OWLIA - Marketing pentru Afaceri Noi | Brand, Website, Digital Marketing",
    template: "%s | OWLIA",
  },
  description:
    "Marketing full-service pentru companii 0-3 ani. De la strategie la rezultate măsurabile. 16 ani experiență, 100+ proiecte livrate, rezultate concrete.",
  keywords: [
    "marketing pentru afaceri noi",
    "branding",
    "web design",
    "marketing digital",
    "strategie de marketing",
    "agenție marketing",
    "creștere afaceri",
    "lead generation",
    "SEO",
    "PPC",
    "social media",
    "site web",
  ],
  applicationName: "OWLIA",
  authors: [{ name: "OWLIA", url: "https://owlia.ro" }],
  creator: "OWLIA",
  publisher: "OWLIA",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "OWLIA - Marketing pentru Afaceri Noi",
    description:
      "Marketing full-service pentru companii 0-3 ani. De la strategie la rezultate măsurabile. 16 ani experiență, 100+ proiecte livrate, rezultate concrete.",
    siteName: "OWLIA",
    locale: "ro_RO",
    images: [
      {
        url: "/logo_owlia_blue.svg",
        width: 1200,
        height: 630,
        alt: "OWLIA - Marketing pentru Afaceri Noi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OWLIA - Marketing pentru Afaceri Noi",
    description:
      "Marketing full-service pentru companii 0-3 ani. De la strategie la rezultate măsurabile. 16 ani experiență, 100+ proiecte livrate, rezultate concrete.",
    images: ["/logo_owlia_blue.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  referrer: "origin-when-cross-origin",
};

export const viewport: Viewport = {
  themeColor: "#0A2540",
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
        buttonHref="https://wa.me/40778767940?text=Bună!%20Vreau%20o%20consultanță%20gratuită."
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
