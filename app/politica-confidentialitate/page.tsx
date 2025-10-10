import Navigation from "@/components/ui/Navigation";
import Link from "next/link";

export const metadata = {
  title: "Politică de Confidențialitate - OWLIA",
  description: "Politică de confidențialitate și protecție a datelor personale conform GDPR",
};

export default function PoliticaConfidentialitate() {
  return (
    <>
      <Navigation />
      
      <main className="mt-20 py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Politică de Confidențialitate
          </h1>
          <p className="text-gray mb-8">
            Ultima actualizare: {new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-navy mb-4">1. Introducere</h2>
              <p className="text-gray leading-relaxed mb-4">
                OWLIA (denumită în continuare „noi", „al nostru" sau „compania") respectă confidențialitatea vizitatorilor săi 
                și este dedicată protejării informațiilor personale pe care ni le furnizați. Această politică de confidențialitate 
                descrie tipurile de informații pe care le colectăm, cum le folosim și cum le protejăm.
              </p>
              <p className="text-gray leading-relaxed">
                Prin utilizarea site-ului nostru și furnizarea informațiilor personale, sunteți de acord cu termenii acestei 
                politici de confidențialitate.
              </p>
            </section>

            {/* Data Collection */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-navy mb-4">2. Informațiile pe care le colectăm</h2>
              
              <h3 className="text-xl font-semibold text-navy mb-3">2.1 Informații furnizate direct de dvs.</h3>
              <p className="text-gray leading-relaxed mb-4">
                Colectăm informații pe care ni le furnizați direct atunci când:
              </p>
              <ul className="list-disc pl-6 text-gray space-y-2 mb-4">
                <li>Completați calculatorul de buget marketing</li>
                <li>Solicitați informații despre pachetele noastre</li>
                <li>Descărcați ghidul gratuit</li>
                <li>Ne contactați prin formularele de contact</li>
                <li>Vă abonați la newsletter</li>
              </ul>
              <p className="text-gray leading-relaxed mb-4">
                Aceste informații pot include:
              </p>
              <ul className="list-disc pl-6 text-gray space-y-2 mb-6">
                <li>Nume și prenume</li>
                <li>Adresă de email</li>
                <li>Număr de telefon</li>
                <li>Informații despre afacerea dvs. (industrie, cifră de afaceri proiectată)</li>
                <li>Preferințe și interese legate de serviciile noastre</li>
              </ul>

              <h3 className="text-xl font-semibold text-navy mb-3">2.2 Informații colectate automat</h3>
              <p className="text-gray leading-relaxed mb-4">
                Când vizitați site-ul nostru, colectăm automat anumite informații despre dispozitivul dvs., inclusiv:
              </p>
              <ul className="list-disc pl-6 text-gray space-y-2 mb-4">
                <li>Adresa IP</li>
                <li>Tipul de browser</li>
                <li>Pagini vizitate și timp petrecut pe site</li>
                <li>Data și ora accesării</li>
                <li>Sursa de trafic (de unde ați ajuns pe site)</li>
              </ul>
            </section>

            {/* Data Usage */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-navy mb-4">3. Cum folosim informațiile dvs.</h2>
              <p className="text-gray leading-relaxed mb-4">
                Utilizăm informațiile colectate pentru următoarele scopuri:
              </p>
              <ul className="list-disc pl-6 text-gray space-y-2 mb-4">
                <li><strong>Furnizarea serviciilor:</strong> Pentru a vă oferi informațiile și serviciile solicitate</li>
                <li><strong>Comunicare:</strong> Pentru a vă contacta cu privire la serviciile noastre și pentru a răspunde întrebărilor dvs.</li>
                <li><strong>Marketing:</strong> Pentru a vă trimite newsletter-ul și oferte relevante (doar cu consimțământul dvs.)</li>
                <li><strong>Îmbunătățirea serviciilor:</strong> Pentru a analiza cum este folosit site-ul și a îmbunătăți experiența utilizatorului</li>
                <li><strong>Conformitate legală:</strong> Pentru a respecta obligațiile legale și a preveni fraudele</li>
              </ul>
            </section>

            {/* Data Sharing */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-navy mb-4">4. Partajarea informațiilor</h2>
              <p className="text-gray leading-relaxed mb-4">
                Nu vindem, nu înch iriază și nu transferăm informațiile dvs. personale către terți, cu excepția următoarelor cazuri:
              </p>
              <ul className="list-disc pl-6 text-gray space-y-2 mb-4">
                <li><strong>Furnizori de servicii:</strong> Parteneri care ne ajută să operăm site-ul (hosting, email marketing, analiză)</li>
                <li><strong>Obligații legale:</strong> Când suntem obligați prin lege să dezvăluim informații</li>
                <li><strong>Protecția drepturilor:</strong> Pentru a ne proteja drepturile, proprietatea sau siguranța</li>
              </ul>
              <p className="text-gray leading-relaxed">
                Toți partenerii noștri sunt obligați contractual să protejeze datele dvs. și să le folosească doar pentru scopurile specificate.
              </p>
            </section>

            {/* Cookies */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-navy mb-4">5. Cookie-uri și tehnologii similare</h2>
              <p className="text-gray leading-relaxed mb-4">
                Utilizăm cookie-uri și tehnologii similare pentru a îmbunătăți experiența dvs. pe site. Cookie-urile sunt 
                fișiere mici de text stocate pe dispozitivul dvs. care ne permit să recunoaștem browserul și să reținem 
                anumite informații.
              </p>
              <p className="text-gray leading-relaxed mb-4">
                Tipuri de cookie-uri utilizate:
              </p>
              <ul className="list-disc pl-6 text-gray space-y-2 mb-4">
                <li><strong>Cookie-uri esențiale:</strong> Necesare pentru funcționarea site-ului</li>
                <li><strong>Cookie-uri de performanță:</strong> Ne ajută să înțelegem cum este folosit site-ul</li>
                <li><strong>Cookie-uri de marketing:</strong> Folosite pentru a vă afișa reclame relevante</li>
              </ul>
              <p className="text-gray leading-relaxed">
                Puteți configura browserul să refuze cookie-urile, dar acest lucru poate afecta funcționarea site-ului.
              </p>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-navy mb-4">6. Securitatea datelor</h2>
              <p className="text-gray leading-relaxed mb-4">
                Implementăm măsuri tehnice și organizatorice adecvate pentru a proteja informațiile dvs. personale împotriva 
                accesului neautorizat, modificării, divulgării sau distrugerii, inclusiv:
              </p>
              <ul className="list-disc pl-6 text-gray space-y-2 mb-4">
                <li>Criptare SSL/TLS pentru transmiterea datelor</li>
                <li>Acces restricționat la datele personale</li>
                <li>Monitorizare regulată a sistemelor de securitate</li>
                <li>Copii de siguranță regulate</li>
              </ul>
            </section>

            {/* User Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-navy mb-4">7. Drepturile dvs.</h2>
              <p className="text-gray leading-relaxed mb-4">
                Conform GDPR (Regulamentul General privind Protecția Datelor), aveți următoarele drepturi:
              </p>
              <ul className="list-disc pl-6 text-gray space-y-2 mb-4">
                <li><strong>Dreptul de acces:</strong> Puteți solicita o copie a datelor personale pe care le deținem despre dvs.</li>
                <li><strong>Dreptul de rectificare:</strong> Puteți corecta informațiile inexacte sau incomplete</li>
                <li><strong>Dreptul la ștergere:</strong> Puteți solicita ștergerea datelor dvs. („dreptul de a fi uitat")</li>
                <li><strong>Dreptul la restricționare:</strong> Puteți solicita restricționarea prelucrării datelor</li>
                <li><strong>Dreptul la portabilitate:</strong> Puteți primi datele într-un format structurat</li>
                <li><strong>Dreptul de opoziție:</strong> Puteți să vă opuneți prelucrării datelor în anumite circumstanțe</li>
                <li><strong>Dreptul de retragere a consimțământului:</strong> Puteți retrage oricând consimțământul dat</li>
              </ul>
              <p className="text-gray leading-relaxed">
                Pentru a vă exercita aceste drepturi, vă rugăm să ne contactați la adresa: <strong>privacy@owlia.ro</strong>
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-navy mb-4">8. Păstrarea datelor</h2>
              <p className="text-gray leading-relaxed">
                Păstrăm informațiile dvs. personale doar atât timp cât este necesar pentru îndeplinirea scopurilor 
                pentru care au fost colectate, respectarea obligațiilor legale și rezolvarea disputelor. 
                În general, datele sunt păstrate pentru maximum 3 ani de la ultimul contact, cu excepția cazurilor în 
                care legea impune o perioadă mai lungă.
              </p>
            </section>

            {/* Children Privacy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-navy mb-4">9. Confidențialitatea copiilor</h2>
              <p className="text-gray leading-relaxed">
                Serviciile noastre nu sunt destinate persoanelor sub 18 ani. Nu colectăm în mod intenționat informații 
                personale de la copii. Dacă aflăm că am colectat informații de la un copil sub 18 ani, vom șterge 
                aceste informații imediat.
              </p>
            </section>

            {/* Changes */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-navy mb-4">10. Modificări ale politicii</h2>
              <p className="text-gray leading-relaxed">
                Ne rezervăm dreptul de a modifica această politică de confidențialitate în orice moment. 
                Orice modificare va fi publicată pe această pagină cu data actualizării. Vă recomandăm să 
                verificați periodic această pagină pentru a fi la curent cu modificările.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-navy mb-4">11. Contact</h2>
              <p className="text-gray leading-relaxed mb-4">
                Pentru orice întrebări sau preocupări legate de această politică de confidențialitate sau de prelucrarea 
                datelor dvs. personale, vă rugăm să ne contactați:
              </p>
              <div className="bg-cream p-6 rounded-xl">
                <p className="text-gray mb-2"><strong>OWLIA - Marketing pentru Start-Up Nation</strong></p>
                <p className="text-gray mb-2">Email: <a href="mailto:privacy@owlia.ro" className="text-navy underline">privacy@owlia.ro</a></p>
                <p className="text-gray mb-2">Telefon: <a href="tel:+40123456789" className="text-navy underline">+40 123 456 789</a></p>
                <p className="text-gray">Adresă: Iași, România</p>
              </div>
              <p className="text-gray leading-relaxed mt-4">
                De asemenea, aveți dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a 
                Prelucrării Datelor cu Caracter Personal (ANSPDCP) dacă considerați că prelucrarea datelor dvs. 
                personale încalcă legislația aplicabilă.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-light">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-navy font-semibold hover:underline"
            >
              ← Înapoi la pagina principală
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 bg-gray-dark text-white/70 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm">&copy; 2025 OWLIA - Echipa ta de Marketing. Toate drepturile rezervate.</p>
        </div>
      </footer>
    </>
  );
}

