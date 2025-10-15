import type { Metadata } from "next";
import Navigation from "@/components/ui/Navigation";
import Link from "next/link";

export const metadata: Metadata = {
  title: { default: "Politica de Confidențialitate", template: "%s | OWLIA" },
  description:
    "Cum colectăm, folosim și protejăm datele personale pe owlia.ro. Drepturi GDPR și contact.",
  alternates: { canonical: "/politica-confidentialitate" },
  openGraph: {
    type: "article",
    url: "/politica-confidentialitate",
    title: "Politica de Confidențialitate | OWLIA",
    description:
      "Informații despre colectarea și protecția datelor personale conform GDPR.",
    siteName: "OWLIA",
    locale: "ro_RO",
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Politica de Confidențialitate | OWLIA",
    description:
      "Informații despre colectarea și protecția datelor personale conform GDPR.",
    images: ["/opengraph-image"],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navigation />
      
      <div className="mt-20 pt-24 pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-navy mb-6">
            Politica de Confidențialitate
          </h1>
          
          <p className="text-gray mb-8">
            Ultima actualizare: Ianuarie 2025
          </p>
          
          <div className="prose prose-lg max-w-none space-y-6 text-gray">
            <section>
              <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
                1. Introducere
              </h2>
              <p>
                OWLIA ("noi", "al nostru") respectă confidențialitatea
                vizitatorilor site-ului nostru și a utilizatorilor serviciilor
                noastre. Această Politică de Confidențialitate explică cum
                colectăm, folosim, dezvăluim și protejăm informațiile
                dumneavoastră personale.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
                2. Informații pe care le colectăm
              </h2>
              <p>Colectăm următoarele tipuri de informații:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Informații de identificare:</strong> nume, adresă de
                  email, număr de telefon
                </li>
                <li>
                  <strong>Informații despre business:</strong> industrie,
                  venituri estimative, număr de clienți țintă
                </li>
                <li>
                  <strong>Date tehnice:</strong> adresă IP, tip browser, sistem
                  de operare
                </li>
                <li>
                  <strong>Date de utilizare:</strong> pagini vizitate, timp
                  petrecut pe site, interacțiuni cu conținutul
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
                3. Cum folosim informațiile
              </h2>
              <p>
                Folosim informațiile colectate pentru următoarele scopuri:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Pentru a vă oferi servicii de marketing și consultanță
                </li>
                <li>
                  Pentru a vă trimite materiale informative (ghiduri, articole)
                </li>
                <li>
                  Pentru a îmbunătăți experiența pe site-ul nostru
                </li>
                <li>
                  Pentru a vă contacta cu oferte relevante pentru business-ul
                  dumneavoastră
                </li>
                <li>Pentru a respecta obligațiile legale</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
                4. Partajarea informațiilor
              </h2>
              <p>
                Nu vindem, nu înch iriem și nu transferăm informațiile
                dumneavoastră către terți, cu excepția:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Furnizori de servicii de încredere care ne ajută să operăm
                  site-ul (hosting, email marketing)
                </li>
                <li>Când suntem obligați legal să facem acest lucru</li>
                <li>
                  Cu consimțământul dumneavoastră explicit
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
                5. Securitatea datelor
              </h2>
              <p>
                Implementăm măsuri tehnice și organizatorice pentru a proteja
                informațiile dumneavoastră personale împotriva accesului
                neautorizat, modificării, divulgării sau distrugerii.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
                6. Cookie-uri
              </h2>
              <p>
                Utilizăm cookie-uri pentru a îmbunătăți experiența pe site-ul
                nostru, pentru analiză și personalizare. Puteți configura
                browserul să refuze cookie-urile, dar acest lucru poate afecta
                funcționalitatea site-ului.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
                7. Drepturile dumneavoastră (GDPR)
              </h2>
              <p>În conformitate cu GDPR, aveți următoarele drepturi:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Dreptul de acces:</strong> Puteți solicita o copie a
                  datelor pe care le deținem despre dumneavoastră
                </li>
                <li>
                  <strong>Dreptul la rectificare:</strong> Puteți corecta
                  informațiile inexacte
                </li>
                <li>
                  <strong>Dreptul la ștergere:</strong> Puteți solicita
                  ștergerea datelor ("dreptul de a fi uitat")
                </li>
                <li>
                  <strong>Dreptul la restricționare:</strong> Puteți restricționa
                  procesarea datelor în anumite condiții
                </li>
                <li>
                  <strong>Dreptul la portabilitate:</strong> Puteți primi
                  datele într-un format structurat
                </li>
                <li>
                  <strong>Dreptul la opoziție:</strong> Vă puteți opune
                  procesării datelor pentru marketing direct
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
                8. Reținerea datelor
              </h2>
              <p>
                Păstrăm informațiile dumneavoastră personale doar atât cât este
                necesar pentru scopurile pentru care au fost colectate sau cât
                timp impun obligațiile legale.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
                9. Contact
              </h2>
              <p>
                Pentru întrebări despre această Politică de Confidențialitate
                sau pentru a vă exercita drepturile, ne puteți contacta la:
              </p>
              <ul className="list-none pl-0 space-y-2 mt-4">
                <li>
                  <strong>Email:</strong> contact@owlia.ro
                </li>
                <li>
                  <strong>Adresă:</strong> [Adresa companiei]
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
                10. Modificări ale politicii
              </h2>
              <p>
                Ne rezervăm dreptul de a actualiza această Politică de
                Confidențialitate. Orice modificare va fi publicată pe această
                pagină cu o nouă dată de actualizare.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-light">
            <Link
              href="/"
              className="text-navy font-semibold hover:underline"
            >
              ← Înapoi la Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
