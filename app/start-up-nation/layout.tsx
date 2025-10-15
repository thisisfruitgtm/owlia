import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Start‑Up Nation: Buget Marketing, Pachete, Calculator", template: "%s | OWLIA" },
  description:
    "Calculăm bugetul de marketing pentru Start‑Up Nation și implementăm totul 12 luni: branding, website, social media, rapoarte pentru evaluatori.",
  alternates: { canonical: "/start-up-nation" },
  openGraph: {
    type: "website",
    url: "/start-up-nation",
    title: "Start‑Up Nation: Buget Marketing, Pachete, Calculator",
    description:
      "Buget corect + implementare completă 12 luni. Pachete + calculator.",
    siteName: "OWLIA",
    locale: "ro_RO",
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Start‑Up Nation: Buget Marketing, Pachete, Calculator",
    description:
      "Buget corect + implementare completă 12 luni. Pachete + calculator.",
    images: ["/opengraph-image"],
  },
};

export default function StartUpNationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* JSON-LD: WebPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Start‑Up Nation: Buget Marketing, Pachete, Calculator",
            description:
              "Calculăm bugetul și implementăm 12 luni: branding, website, social media, rapoarte.",
            url: "https://owlia.ro/start-up-nation",
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Acasă", item: "https://owlia.ro/" },
                { "@type": "ListItem", position: 2, name: "Start‑Up Nation", item: "https://owlia.ro/start-up-nation" },
              ],
            },
          }),
        }}
      />
      {children}
    </>
  );
}


