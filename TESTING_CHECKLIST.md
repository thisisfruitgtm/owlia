# 🧪 Checklist Testare OWLIA Platform

## 📋 Instrucțiuni Generale
- [ ] Testează pe Chrome, Firefox, Safari
- [ ] Testează pe mobile (iOS + Android)
- [ ] Verifică responsive design pe toate paginile
- [ ] Verifică că nu există erori în console (F12)
- [ ] Testează cu internet lent (throttling)

---

## 🔐 1. Autentificare & Autorizare

### Login/Logout
- [ ] Login cu email și parolă corectă
- [ ] Login cu credențiale greșite (trebuie să arate eroare)
- [ ] Login cu email inexistent (trebuie să arate eroare)
- [ ] Login cu parolă greșită (trebuie să arate eroare)
- [ ] Logout funcționează corect
- [ ] După logout, nu se poate accesa dashboard-ul

### Register (Opțional - dacă e activat)
- [ ] Register cu date valide
- [ ] Register cu email deja folosit (trebuie să arate eroare)
- [ ] Register cu parolă prea scurtă (min 8 caractere)
- [ ] Validare email funcționează corect

### Protected Routes
- [ ] Utilizator neautentificat nu poate accesa `/admin`
- [ ] Utilizator neautentificat nu poate accesa `/client/[id]`
- [ ] Client nu poate accesa `/admin`
- [ ] Client nu poate accesa alt client's portal (`/client/[alt-id]`)
- [ ] Admin poate accesa toate paginile

---

## 👨‍💼 2. Admin Dashboard

### Pagina Principală (`/admin`)
- [ ] Afișează corect statisticile:
  - [ ] Total clienți
  - [ ] Total contracte
  - [ ] Total venituri (RON)
  - [ ] Leads active
- [ ] Afișează lista de clienți recenți
- [ ] Afișează lista de contracte recente
- [ ] Link-urile către detalii funcționează

### Gestionare Clienți (`/admin/clients`)
- [ ] Lista tuturor clienților se afișează corect
- [ ] Filtrare după status funcționează (ACTIVE/INACTIVE)
- [ ] Search după nume funcționează
- [ ] Buton "Client Nou" deschide formularul
- [ ] Creare client nou cu date valide
- [ ] Creare client nou cu date invalide (validare Zod)
- [ ] Email de bun venit se trimite automat la creare client
- [ ] Clientul nou apare în listă

### Detalii Client (`/admin/clients/[id]`)
- [ ] Toate informațiile clientului se afișează corect
- [ ] Buton "Editează" funcționează
- [ ] Editare date client funcționează
- [ ] Schimbare status (ACTIVE/INACTIVE) funcționează
- [ ] Schimbare pachet funcționează
- [ ] Buton "Notificare" deschide modal-ul
- [ ] Trimitere notificare manuală funcționează
- [ ] Notificarea apare în dashboard-ul clientului
- [ ] Generare timeline din pachet funcționează
- [ ] Link către timeline editor funcționează
- [ ] Secțiune "Fișiere" se afișează
- [ ] Upload fișier pentru client funcționează (max 10MB)
- [ ] Upload fișier prea mare (>10MB) arată eroare
- [ ] Upload fișier tip nepermis arată eroare
- [ ] Fișierele urcate apar în listă
- [ ] Ștergere fișier funcționează
- [ ] Client primește notificare când admin urcă fișier

### Editare Client (`/admin/clients/[id]/edit`)
- [ ] Formularul se populează cu datele existente
- [ ] Salvare modificări funcționează
- [ ] Validare date funcționează (Zod)
- [ ] Redirecționare către pagina detalii după salvare

### Timeline Editor (`/admin/clients/[id]/timeline`)
- [ ] Afișează Gantt chart cu toate milestone-urile
- [ ] Buton "Generează din Pachet" funcționează
- [ ] Timeline-ul generat corespunde pachetului clientului
- [ ] Adăugare milestone nou funcționează
- [ ] Editare milestone existent funcționează
- [ ] Ștergere milestone funcționează
- [ ] Schimbare status milestone (PENDING/IN_PROGRESS/COMPLETED) funcționează
- [ ] Salvare modificări funcționează
- [ ] Timeline se afișează corect în portal client

---

## 📄 3. Contracte (`/admin/contracts`)

### Listă Contracte
- [ ] Lista tuturor contractelor se afișează
- [ ] Filtrare după status funcționează (DRAFT/ACTIVE/EXPIRED)
- [ ] Search după număr contract funcționează
- [ ] Buton "Contract Nou" deschide formularul

### Generare Contract
- [ ] Selectare client funcționează
- [ ] Nu se poate genera contract fără timeline (validare)
- [ ] Generare contract cu date valide funcționează
- [ ] PDF-ul se generează corect (Puppeteer)
- [ ] Contract-ul include:
  - [ ] Date client corecte
  - [ ] Toate features din pachet
  - [ ] Timeline complet
  - [ ] Date legale (CUI, etc.)
- [ ] PDF-ul se salvează în `/app/uploads/contracts/[clientId]/`
- [ ] Client primește notificare în-app
- [ ] Client primește email cu contractul
- [ ] Contract apare în listă

### Acțiuni Contract
- [ ] Preview contract (deschide modal PDF)
- [ ] Download contract funcționează
- [ ] Trimitere email cu contract funcționează
- [ ] Schimbare status contract funcționează
- [ ] Ștergere contract funcționează

---

## 📦 4. Gestionare Pachete (`/admin/packages`)

### Listă Pachete
- [ ] Afișează toate pachetele (SMART, PREMIUM, + custom)
- [ ] Afișează corect:
  - [ ] Nume pachet
  - [ ] Descriere
  - [ ] Preț lunar (6 luni)
  - [ ] Preț anual
  - [ ] Număr features
  - [ ] Status (Active/Inactive)

### Creare Pachet Nou
- [ ] Buton "Pachet Nou" deschide formularul
- [ ] Toate câmpurile se afișează:
  - [ ] Nume
  - [ ] Slug (auto-generat)
  - [ ] Descriere
  - [ ] Preț lunar (6 luni)
  - [ ] Preț anual
  - [ ] Features (titlu + descriere)
  - [ ] Timeline template
- [ ] Adăugare feature funcționează
- [ ] Ștergere feature funcționează
- [ ] Adăugare milestone în timeline funcționează
- [ ] Ștergere milestone din timeline funcționează
- [ ] Salvare pachet nou funcționează
- [ ] Pachetul apare în listă
- [ ] Pachetul apare pe front-page

### Editare Pachet
- [ ] Click pe "Editează" deschide formularul
- [ ] Formularul se populează cu datele existente
- [ ] Editare nume funcționează
- [ ] Editare preț funcționează
- [ ] Editare features funcționează:
  - [ ] Modificare titlu feature
  - [ ] Modificare descriere feature
  - [ ] Adăugare feature nou
  - [ ] Ștergere feature
  - [ ] Reordonare features (drag & drop, dacă implementat)
- [ ] Editare timeline template funcționează
- [ ] Salvare modificări funcționează
- [ ] Modificările se reflectă pe front-page
- [ ] Modificările se reflectă în contracte noi generate

### Toggle Status Pachet
- [ ] Toggle ACTIVE/INACTIVE funcționează
- [ ] Pachetele inactive nu apar pe front-page
- [ ] Pachetele inactive nu pot fi asignate la clienți noi

### Validare Date
- [ ] Nume obligatoriu
- [ ] Preț trebuie să fie număr pozitiv
- [ ] Features trebuie să aibă titlu
- [ ] Timeline trebuie să aibă cel puțin un milestone

---

## 🎯 5. Gestionare Leads (`/admin/leads`)

### Listă Leads
- [ ] Afișează toate leads-urile
- [ ] Filtrare după status funcționează:
  - [ ] NEW
  - [ ] CONTACTED
  - [ ] QUALIFIED
  - [ ] CONVERTED
  - [ ] LOST
- [ ] Filtrare după sursă funcționează:
  - [ ] CALCULATOR
  - [ ] PACKAGE
  - [ ] GUIDE
  - [ ] OTHER
- [ ] Search după nume/email/companie funcționează
- [ ] Sortare după dată funcționează

### Detalii Lead
- [ ] Click pe lead deschide detaliile
- [ ] Afișează toate informațiile:
  - [ ] Nume, email, telefon
  - [ ] Companie
  - [ ] Sursă
  - [ ] Status
  - [ ] Budget estimat (dacă e din calculator)
  - [ ] Pachet de interes (dacă e din package modal)
  - [ ] Custom features (dacă a folosit configurator)
  - [ ] Mesaj/note
  - [ ] Data creării

### Acțiuni Lead
- [ ] Schimbare status funcționează
- [ ] Adăugare note funcționează
- [ ] Buton "Convertește în Client" deschide modal-ul
- [ ] Conversie lead → client funcționează:
  - [ ] Se creează client nou cu datele din lead
  - [ ] Se creează user pentru client
  - [ ] Client primește email de bun venit
  - [ ] Lead status devine "CONVERTED"
  - [ ] Lead nu mai apare în listă active
- [ ] Ștergere lead funcționează

### Export
- [ ] Buton "Export CSV" funcționează
- [ ] CSV conține toate datele relevante
- [ ] CSV se descarcă corect

---

## 👤 6. Portal Client (`/client/[id]`)

### Dashboard Client
- [ ] Client vede doar propriul dashboard
- [ ] Afișează:
  - [ ] Numele clientului
  - [ ] Pachetul asignat
  - [ ] Status contract
  - [ ] Progres timeline (%)
  - [ ] Notificări unread (counter)
- [ ] Meniu navigare funcționează:
  - [ ] Dashboard
  - [ ] Timeline
  - [ ] Fișiere
  - [ ] Notificări
  - [ ] Logout

### Timeline Client (`/client/[id]/timeline`)
- [ ] Gantt chart se afișează corect
- [ ] Milestone-uri completate sunt marcate vizual
- [ ] Milestone-uri în progres sunt evidențiate
- [ ] Hover pe milestone arată detalii
- [ ] Legendă status se afișează corect

### Fișiere Client (`/client/[id]/files`)
- [ ] Lista tuturor fișierelor clientului se afișează
- [ ] Fișierele sunt sortate după dată
- [ ] Buton "Download" funcționează pentru fiecare fișier
- [ ] Fișierul descărcat are numele corect
- [ ] Fișierul descărcat se deschide corect
- [ ] Mesaj "Niciun fișier încărcat" dacă lista e goală

### Notificări Client (`/client/[id]/notifications`)
- [ ] Lista tuturor notificărilor se afișează
- [ ] Notificări noi sunt evidențiate
- [ ] Notificări citite sunt marcate vizual
- [ ] Click pe notificare o marchează ca citită
- [ ] Buton "Marchează toate ca citite" funcționează
- [ ] Counter notificări în header se actualizează real-time
- [ ] Notificările sunt sortate după dată (cea mai nouă sus)

### Notificări Real-time
- [ ] Counter notificări se actualizează automat (polling 30s)
- [ ] Când admin trimite notificare, clientul o vede fără refresh
- [ ] Badge roșu apare pe icon notificări când sunt unread
- [ ] Badge dispare când toate sunt citite

---

## 📧 7. Email Functionality

### Email de Bun Venit
- [ ] Se trimite automat la crearea clientului
- [ ] Conține numele clientului
- [ ] Conține link către dashboard
- [ ] Conține credențiale (dacă e cazul)
- [ ] Se primește în inbox (nu spam)

### Email Contract Generat
- [ ] Se trimite când admin generează contract
- [ ] Conține PDF-ul contractului atașat
- [ ] Conține număr contract
- [ ] Link către portal funcționează

### Email Calculator Result
- [ ] Se trimite când cineva folosește calculatorul
- [ ] Conține budget estimat
- [ ] Conține breakdown costuri
- [ ] Conține link către pachete

### Email Package Interest
- [ ] Se trimite când cineva arată interes pentru pachet
- [ ] Conține pachetul selectat
- [ ] Conține custom features (dacă e personalizat)
- [ ] Conține datele de contact ale lead-ului

### Email Guide Download
- [ ] Se trimite când cineva descarcă ghidul
- [ ] Conține PDF-ul ghidului atașat
- [ ] Conține link download alternativ
- [ ] Se primește în inbox (nu spam)

### Email Deadline Reminder (Cron)
- [ ] Se trimite automat cu 3 zile înainte de deadline
- [ ] Conține milestone-ul ce urmează
- [ ] Conține link către timeline
- [ ] Se trimite doar pentru milestone-uri IN_PROGRESS

---

## 📊 8. Analytics (`/admin/analytics`)

### Dashboard Analytics
- [ ] Grafic clienți noi per lună (6 luni)
- [ ] Grafic venituri per lună (6 luni)
- [ ] Grafic leads per sursă (pie chart)
- [ ] Grafic conversie rate (leads → clients)
- [ ] Metrici:
  - [ ] Total revenue
  - [ ] Average contract value
  - [ ] Lead conversion rate
  - [ ] Active clients count
- [ ] Export date în CSV funcționează

### Filtre Analytics
- [ ] Filtru perioadă funcționează (30/60/90 zile, custom)
- [ ] Filtru pachet funcționează
- [ ] Graficele se actualizează după aplicarea filtrelor

---

## ⚙️ 9. Settings (`/admin/settings`)

### Module Toggles
- [ ] Toggle "Notifications Module" funcționează
- [ ] Toggle "File Upload Module" funcționează
- [ ] Toggle "Analytics Module" funcționează
- [ ] Toggle "Lead Management Module" funcționează
- [ ] Salvare setări funcționează
- [ ] Modulele dezactivate nu apar în interfață
- [ ] Enforcement funcționează (redirect dacă modul dezactivat)

### Configurare Email (Resend)
- [ ] RESEND_API_KEY este setat în .env
- [ ] Emailurile se trimit de la "Owlia <noreply@owlia.ro>"
- [ ] Test email funcționează

### Configurare Puppeteer
- [ ] PUPPETEER_EXECUTABLE_PATH este setat corect
- [ ] Puppeteer poate genera PDF-uri
- [ ] PDF-urile arată corect (fonts, styles, images)

---

## 🌐 10. Pagini Publice (Front-end)

### Homepage (`/`)
- [ ] Hero section se afișează corect
- [ ] CTA "Vezi Pachete" funcționează
- [ ] Scroll smooth către secțiuni
- [ ] Toate secțiunile se încarcă:
  - [ ] Problem Section
  - [ ] Solution Section
  - [ ] Services Grid
  - [ ] Process Steps
  - [ ] Why Owlia
  - [ ] Pricing Section (pachete)
  - [ ] Case Studies Preview
  - [ ] CTA Section
  - [ ] Footer

### Pricing Section
- [ ] Afișează cele 3 pachete: SMART, PREMIUM, PERSONALIZAT
- [ ] Toggle Semestrial/Anual funcționează
- [ ] Prețurile se actualizează corect
- [ ] Badge "Economisești" apare la anual
- [ ] Toate features-urile se afișează cu titlu + descriere
- [ ] Buton "Vreau SMART" deschide modal-ul
- [ ] Buton "Vreau PREMIUM" deschide modal-ul
- [ ] Buton "Configurează Pachetul" deschide configuratorul

### Package Modal
- [ ] Modal se deschide corect
- [ ] Afișează pachetul selectat
- [ ] Formular cu:
  - [ ] Nume
  - [ ] Email
  - [ ] Telefon
  - [ ] Companie
  - [ ] Mesaj
- [ ] Validare funcționează (toate obligatorii)
- [ ] Submit funcționează
- [ ] Lead se creează în database
- [ ] Admin primește email cu lead-ul
- [ ] Mesaj success se afișează
- [ ] Modal se închide după submit

### Custom Package Configurator
- [ ] Modal se deschide corect
- [ ] Toate cele 6 categorii se afișează:
  - [ ] Strategie & Consultanță
  - [ ] Branding & Design
  - [ ] Website & Development
  - [ ] Social Media & Content
  - [ ] Print & Materiale Fizice
  - [ ] Video & Multimedia
- [ ] Total 24 features sunt disponibile
- [ ] Toggle feature funcționează
- [ ] Prețul total se calculează instant
- [ ] Prețul se afișează în LEI
- [ ] Toggle Semestrial/Anual funcționează
- [ ] Discount anual se aplică corect (-15%)
- [ ] Buton "Solicită Ofertă" deschide package modal
- [ ] Custom features se transmit în lead
- [ ] Lead cu custom features se vede în admin

### Calculator (`/`)
- [ ] Calculator section se afișează
- [ ] Slide-uri funcționează pentru:
  - [ ] Website complexity
  - [ ] Social media presence
  - [ ] Content needs
  - [ ] Ads budget
- [ ] Buget se calculează corect
- [ ] Buton "Trimite Estimare" deschide formular
- [ ] Formular validare funcționează
- [ ] Submit funcționează
- [ ] Lead se creează în database
- [ ] Admin primește email cu calculul
- [ ] Client primește email cu rezultatul

### Guide/Lead Magnet (`/ghid`)
- [ ] Pagina ghidului se afișează corect
- [ ] Conținut complet se afișează
- [ ] Formular email gate funcționează
- [ ] Validare email funcționează
- [ ] Submit funcționează
- [ ] Lead se creează în database
- [ ] PDF se generează automat
- [ ] Client primește email cu PDF-ul
- [ ] Link download alternativ funcționează
- [ ] PDF conține tot conținutul paginii
- [ ] PDF arată profesional (fonts, styles, layout)

### Servicii Pages
- [ ] `/servicii/branding` se afișează
- [ ] `/servicii/web-design` se afișează
- [ ] `/servicii/marketing-digital` se afișează
- [ ] CTA-uri funcționează

### Case Studies
- [ ] `/cazuri-de-succes/vipbebe` se afișează
- [ ] `/cazuri-de-succes/ladada` se afișează
- [ ] `/cazuri-de-succes/atelier-de-business` se afișează
- [ ] Imagini se încarcă corect
- [ ] CTA-uri funcționează

### Start-Up Nation Page (`/start-up-nation`)
- [ ] Pagina se afișează corect
- [ ] Informații despre program
- [ ] CTA către pachete funcționează
- [ ] FAQ se afișează

### Footer
- [ ] Link-uri sociale funcționează
- [ ] Link către `/politica-confidentialitate` funcționează
- [ ] Link către `/despre` funcționează
- [ ] Contact info este corect

---

## 🔒 11. Security & Permissions

### Validare Input
- [ ] Toate API routes validează input-ul cu Zod
- [ ] Mesaje de eroare sunt user-friendly
- [ ] Mesaje de eroare nu expun detalii interne

### File Upload Security
- [ ] Validare tip fișier funcționează (doar PDF, JPG, PNG, DOCX)
- [ ] Validare mărime funcționează (max 10MB)
- [ ] Fișierele se salvează cu nume unic (timestamp + random)
- [ ] Path traversal attacks sunt prevenit

### Password Security
- [ ] Parolele sunt hash-ate cu bcrypt (12 rounds)
- [ ] Parolele nu apar în logs
- [ ] Parolele nu se returnează în API responses

### Session Security
- [ ] NEXTAUTH_SECRET este setat și secret
- [ ] Session expire după un timp
- [ ] Session cookie este httpOnly și secure

### Authorization
- [ ] Toate API routes verifică autentificarea
- [ ] Toate API routes verifică autorizarea (role-based)
- [ ] Client nu poate accesa date ale altui client
- [ ] Client nu poate accesa endpoint-uri admin

---

## 🚀 12. Performance & Optimization

### Loading States
- [ ] Loading indicators se afișează pe acțiuni async
- [ ] Butoane sunt disabled în timpul loading
- [ ] Skeleton loaders se afișează unde e cazul

### Error Handling
- [ ] Toate erorile sunt catch-ate
- [ ] Mesaje de eroare user-friendly
- [ ] Erori sunt loggate în console pentru debug
- [ ] Error boundaries funcționează

### Caching
- [ ] Imagini sunt optimizate (Next.js Image)
- [ ] Static pages sunt cached
- [ ] API responses sunt cached unde e cazul

### Database
- [ ] Queries folosesc indexes
- [ ] Queries folosesc pagination unde e nevoie
- [ ] Queries includ doar câmpurile necesare

---

## 📱 13. Mobile Responsive

### Toate Paginile
- [ ] Layout se adaptează pe mobile (<768px)
- [ ] Text este lizibil pe mobile
- [ ] Butoane sunt suficient de mari pentru tap
- [ ] Forms sunt user-friendly pe mobile
- [ ] Navigation funcționează pe mobile
- [ ] Modals se afișează corect pe mobile
- [ ] Tables sunt scrollable pe mobile

---

## 🐛 14. Bug Testing

### Edge Cases
- [ ] Ce se întâmplă dacă un client nu are pachet asignat?
- [ ] Ce se întâmplă dacă un pachet nu are features?
- [ ] Ce se întâmplă dacă un client nu are timeline?
- [ ] Ce se întâmplă dacă un contract nu are PDF generat?
- [ ] Ce se întâmplă dacă Resend API e down?
- [ ] Ce se întâmplă dacă Puppeteer nu poate genera PDF?
- [ ] Ce se întâmplă dacă storage volume e plin?

### Data Integrity
- [ ] Ștergere client șterge și contractele asociate (cascade)
- [ ] Ștergere client șterge și fișierele asociate
- [ ] Ștergere pachet nu șterge clienții (validare)
- [ ] Update pachet nu afectează contractele deja generate

---

## 🔄 15. Cron Jobs & Background Tasks

### Deadline Reminders
- [ ] Cron job rulează la interval corect (zilnic la 9 AM)
- [ ] Găsește milestone-uri cu deadline în 3 zile
- [ ] Trimite emailuri clientului
- [ ] Trimite notificări în-app
- [ ] Nu trimite duplicate
- [ ] Loguri sunt scrise corect

---

## 📦 16. Deployment (Coolify/Docker)

### Build Process
- [ ] `npm run build` reușește fără erori
- [ ] `prisma generate` rulează automat
- [ ] Toate dependencies sunt instalate
- [ ] Environment variables sunt setate corect

### Docker Container
- [ ] Container pornește fără erori
- [ ] Migrations rulează automat (`prisma migrate deploy`)
- [ ] Seed rulează dacă e cazul
- [ ] Volume pentru `/app/uploads` este montat
- [ ] Permissions pentru uploads sunt corecte (755)
- [ ] Puppeteer funcționează în container
- [ ] Logs sunt accesibile

### Environment Variables (Coolify)
- [ ] `DATABASE_URL` este setat
- [ ] `NEXTAUTH_URL` este setat
- [ ] `NEXTAUTH_SECRET` este setat
- [ ] `RESEND_API_KEY` este setat
- [ ] `PUPPETEER_EXECUTABLE_PATH` este setat (dacă e nevoie)
- [ ] Toate variabilele din `.env.example` sunt setate

### Post-Deploy Verification
- [ ] Website se încarcă
- [ ] Login funcționează
- [ ] Database connection funcționează
- [ ] Emails se trimit
- [ ] PDF generation funcționează
- [ ] File uploads funcționează
- [ ] Logs nu arată erori critice

---

## ✅ Sign-off

### Final Checks
- [ ] Toate funcționalitățile critice funcționează
- [ ] Nu există erori în console
- [ ] Nu există erori în server logs
- [ ] Performance este acceptabil (< 3s load time)
- [ ] Mobile responsive funcționează perfect
- [ ] Emails se trimit corect
- [ ] Fișierele se urcă și descarcă corect
- [ ] Contractele se generează corect
- [ ] Notificările funcționează real-time
- [ ] Analytics arată date corecte

### Testat de:
- [ ] Developer: _______________ (Data: ______)
- [ ] QA: _______________ (Data: ______)
- [ ] Client/Owner: _______________ (Data: ______)

---

## 🆘 Troubleshooting

Dacă întâmpini probleme, verifică:
1. `TROUBLESHOOTING.md` - soluții la probleme comune
2. Server logs (Coolify → Logs)
3. Browser console (F12)
4. Network tab pentru API errors
5. Database (Prisma Studio: `npm run prisma:studio`)

---

**Total Items:** 300+ checkpoints
**Estimated Testing Time:** 8-10 ore pentru test complet

**Prioritate:** 
- 🔴 Critice (autentificare, contracte, payments)
- 🟡 Importante (notifications, analytics)
- 🟢 Nice-to-have (animations, tooltips)

