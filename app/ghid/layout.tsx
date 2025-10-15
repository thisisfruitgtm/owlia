import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Ghid Buget Marketing Start‑Up Nation", template: "%s | OWLIA" },
  description:
    "Ghid complet: cât buget să aloci pentru marketing în primul an. Exemple pe industrii, greșeli comune și calculator interactiv.",
  alternates: { canonical: "/ghid" },
  openGraph: {
    type: "article",
    url: "/ghid",
    title: "Ghid Buget Marketing Start‑Up Nation",
    description:
      "Cât buget să aloci în primul an. Exemple reale + calculator interactiv.",
    siteName: "OWLIA",
    locale: "ro_RO",
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ghid Buget Marketing Start‑Up Nation",
    description:
      "Cât buget să aloci în primul an. Exemple reale + calculator interactiv.",
    images: ["/opengraph-image"],
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* JSON-LD: Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Ghid Buget Marketing Start‑Up Nation",
            description:
              "Ghid complet cu exemple pe industrii și calculator interactiv.",
            author: { "@type": "Organization", name: "OWLIA" },
            publisher: { "@type": "Organization", name: "OWLIA" },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://owlia.ro/ghid",
            },
          }),
        }}
      />
      {children}
    </>
  );
}


