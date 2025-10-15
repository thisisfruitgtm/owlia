import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import { PostHogProvider } from "@/components/PostHogProvider";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://owlia.ro"),
  title: {
    default:
      "OWLIA - Marketing pentru Afaceri Noi | Brand, Website, Digital Marketing",
    template: "%s | OWLIA",
  },
  description:
    "Marketing full-service pentru companii 0-3 ani. De la strategie la rezultate măsurabile. 16 ani experiență, 100+ proiecte livrate, rezultate concrete.",
  applicationName: "OWLIA",
  alternates: { canonical: "/" },
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
  icons: { icon: "/favicon.png" },
  themeColor: "#0A2540",
  referrer: "origin-when-cross-origin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className={`${instrumentSans.className} antialiased`}>
        {/* JSON-LD: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "OWLIA",
              url: "https://owlia.ro",
              logo: "https://owlia.ro/logo_owlia_blue.svg",
              sameAs: [
                // Add social profiles when available
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  email: "contact@owlia.ro",
                  contactType: "customer service",
                  availableLanguage: ["ro", "en"],
                },
              ],
            }),
          }}
        />

        {/* JSON-LD: WebSite + SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "OWLIA",
              url: "https://owlia.ro",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://owlia.ro/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <PostHogProvider>
          <SessionProvider>{children}</SessionProvider>
        </PostHogProvider>

        {/* VideoAsk Widget */}
        <Script
          id="videoask-config"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.VIDEOASK_EMBED_CONFIG = {
                "kind": "widget",
                "url": "https://www.videoask.com/f48l4phj5",
                "options": {
                  "widgetType": "VideoThumbnailExtraLarge",
                  "text": "",
                  "backgroundColor": "#002185",
                  "position": "bottom-right",
                  "dismissible": true,
                  "videoPosition": "center center"
                }
              };
            `,
          }}
        />
        <Script
          src="https://www.videoask.com/embed/embed.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
