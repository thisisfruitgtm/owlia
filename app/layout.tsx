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
  title: "Owlia - Marketing pentru Start-Up Nation",
  description: "Te ajutăm să aloci corect bugetul de marketing pentru Start-Up Nation. Calculator buget, pachete complete și management 12 luni.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className={`${instrumentSans.className} antialiased`}>
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
