// Email sequence for guide downloads
// Day 1: Immediate (already sent)
// Day 3: Value content + soft CTA
// Day 7: Case study + hard CTA

export const guideDay3Template = (firstName: string) => ({
  subject: "3 greșeli frecvente în bugetul de marketing Start-Up Nation",
  html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #0A2540; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #ffffff; margin: 0;">👋 Salut${firstName ? ` ${firstName}` : ''}!</h1>
  </div>
  
  <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 10px 10px;">
    <p>Sper că ai găsit ghidul nostru util! Am vrut să-ți împărtășesc 3 greșeli pe care le vedem des la antreprenorii care alocă bugetul de marketing pentru Start-Up Nation:</p>
    
    <div style="background-color: #FFF9F0; padding: 20px; border-left: 4px solid #0A2540; margin: 20px 0;">
      <h3 style="color: #0A2540; margin-top: 0;">❌ Greșeala #1: Totul pe website</h3>
      <p style="margin-bottom: 0;">Website-ul e important, dar dacă pui 80% din buget acolo și uiți de marketing digital, n-o să te găsească nimeni.</p>
    </div>
    
    <div style="background-color: #FFF9F0; padding: 20px; border-left: 4px solid #0A2540; margin: 20px 0;">
      <h3 style="color: #0A2540; margin-top: 0;">❌ Greșeala #2: Logo de 15.000 lei</h3>
      <p style="margin-bottom: 0;">Logo-ul trebuie să arate bine, dar nu trebuie să coste cât un site întreg. Echilibrul e cheia.</p>
    </div>
    
    <div style="background-color: #FFF9F0; padding: 20px; border-left: 4px solid #0A2540; margin: 20px 0;">
      <h3 style="color: #0A2540; margin-top: 0;">❌ Greșeala #3: Fără plan pe 12 luni</h3>
      <p style="margin-bottom: 0;">Start-Up Nation cere raportare pe tot anul. Dacă nu ai plan clar de la început, te trezești cu bani cheltuiți prost și documentație incompletă.</p>
    </div>
    
    <p><strong>Vrei să eviți aceste greșeli?</strong></p>
    
    <p>Noi creăm pentru tine:</p>
    <ul style="color: #0A2540;">
      <li>✅ Plan detaliat pe 12 luni</li>
      <li>✅ Buget echilibrat între toate componentele</li>
      <li>✅ Rapoarte lunare pentru evaluatori</li>
      <li>✅ Tot ce trebuie pentru Start-Up Nation</li>
    </ul>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://owlia.ro/start-up-nation#pricing" style="background-color: #0A2540; color: #ffffff; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
        Vezi Pachete Start-Up Nation →
      </a>
    </div>
    
    <p style="color: #666; font-size: 14px;">P.S. - Dacă ai întrebări despre bugetul tău, doar răspunde la acest email. Citesc personal fiecare mesaj.</p>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
    <p>OWLIA - Echipa ta de marketing<br>
    <a href="https://owlia.ro" style="color: #0A2540;">owlia.ro</a></p>
  </div>
</body>
</html>
  `,
  text: `Salut${firstName ? ` ${firstName}` : ''}!

Sper că ai găsit ghidul nostru util! Am vrut să-ți împărtășesc 3 greșeli pe care le vedem des la antreprenorii care alocă bugetul de marketing pentru Start-Up Nation:

❌ Greșeala #1: Totul pe website
Website-ul e important, dar dacă pui 80% din buget acolo și uiți de marketing digital, n-o să te găsească nimeni.

❌ Greșeala #2: Logo de 15.000 lei
Logo-ul trebuie să arate bine, dar nu trebuie să coste cât un site întreg. Echilibrul e cheia.

❌ Greșeala #3: Fără plan pe 12 luni
Start-Up Nation cere raportare pe tot anul. Dacă nu ai plan clar de la început, te trezești cu bani cheltuiți prost și documentație incompletă.

Vrei să eviți aceste greșeli?

Noi creăm pentru tine:
✅ Plan detaliat pe 12 luni
✅ Buget echilibrat între toate componentele
✅ Rapoarte lunare pentru evaluatori
✅ Tot ce trebuie pentru Start-Up Nation

Vezi pachete: https://owlia.ro/start-up-nation#pricing

P.S. - Dacă ai întrebări despre bugetul tău, doar răspunde la acest email. Citesc personal fiecare mesaj.

--
OWLIA - Echipa ta de marketing
owlia.ro`,
});

export const guideDay7Template = (firstName: string) => ({
  subject: "Cum a ajuns VipBebe la 4M lei cu bugetul Start-Up Nation",
  html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #0A2540; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #ffffff; margin: 0;">🚀 Poveste de succes</h1>
  </div>
  
  <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 10px 10px;">
    <p>Salut${firstName ? ` ${firstName}` : ''}!</p>
    
    <p>Vreau să-ți povestesc despre VipBebe - un magazin online de produse pentru copii care a pornit cu Start-Up Nation.</p>
    
    <div style="background-color: #E8F5E9; padding: 25px; border-radius: 10px; margin: 25px 0;">
      <h2 style="color: #0A2540; margin-top: 0;">De la 0 la 4 milioane lei în 2 ani</h2>
      <p><strong>Cum au reușit?</strong></p>
      <ul style="margin: 15px 0;">
        <li>✅ Brand profesionist din Start-Up Nation</li>
        <li>✅ Website optimizat pentru conversie</li>
        <li>✅ Marketing digital constant 12 luni</li>
        <li>✅ Echipă dedicată pentru creștere</li>
      </ul>
    </div>
    
    <p><strong>Ce au făcut diferit?</strong></p>
    
    <p>1️⃣ <strong>Nu au cheltuit toți banii în prima lună</strong><br>
    Au planificat pe 12 luni și au avut buget constant pentru marketing.</p>
    
    <p>2️⃣ <strong>Au investit în sisteme, nu doar în aspect</strong><br>
    Website frumos + marketing automat + raportare = rezultate măsurabile.</p>
    
    <p>3️⃣ <strong>Au avut o echipă dedicată</strong><br>
    Nu freelanceri care dispar, ci o echipă care răspunde și ajustează lunar.</p>
    
    <div style="background-color: #FFF9F0; padding: 20px; border-left: 4px solid #0A2540; margin: 25px 0;">
      <p style="margin: 0; font-size: 18px;"><strong>Vrei rezultate similare?</strong></p>
      <p style="margin: 10px 0 0 0;">Hai să vorbim 30 de minute despre afacerea ta. Îți arăt exact ce poți face cu bugetul Start-Up Nation.</p>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://wa.me/40778767940?text=Vreau%20o%20consultanță%20gratuită%20pentru%20Start-Up%20Nation" style="background-color: #25D366; color: #ffffff; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
        💬 Programează Consultanță Gratuită
      </a>
    </div>
    
    <p style="text-align: center; margin-top: 15px;">
      <a href="https://owlia.ro/cazuri-de-succes/vipbebe" style="color: #0A2540;">Vezi cazul complet VipBebe →</a>
    </p>
    
    <p style="color: #666; font-size: 14px; margin-top: 30px;">P.S. - Locurile pentru Start-Up Nation 2025 sunt limitate. Deja lucrăm cu 8 beneficiari și mai acceptăm doar 4.</p>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
    <p>OWLIA - Echipa ta de marketing<br>
    <a href="https://owlia.ro" style="color: #0A2540;">owlia.ro</a></p>
  </div>
</body>
</html>
  `,
  text: `Salut${firstName ? ` ${firstName}` : ''}!

Vreau să-ți povestesc despre VipBebe - un magazin online de produse pentru copii care a pornit cu Start-Up Nation.

🚀 DE LA 0 LA 4 MILIOANE LEI ÎN 2 ANI

Cum au reușit?
✅ Brand profesionist din Start-Up Nation
✅ Website optimizat pentru conversie
✅ Marketing digital constant 12 luni
✅ Echipă dedicată pentru creștere

Ce au făcut diferit?

1️⃣ Nu au cheltuit toți banii în prima lună
Au planificat pe 12 luni și au avut buget constant pentru marketing.

2️⃣ Au investit în sisteme, nu doar în aspect
Website frumos + marketing automat + raportare = rezultate măsurabile.

3️⃣ Au avut o echipă dedicată
Nu freelanceri care dispar, ci o echipă care răspunde și ajustează lunar.

Vrei rezultate similare?

Hai să vorbim 30 de minute despre afacerea ta. Îți arăt exact ce poți face cu bugetul Start-Up Nation.

Programează consultanță gratuită: https://wa.me/40778767940?text=Vreau%20o%20consultanță%20gratuită%20pentru%20Start-Up%20Nation

Vezi cazul complet: https://owlia.ro/cazuri-de-succes/vipbebe

P.S. - Locurile pentru Start-Up Nation 2025 sunt limitate. Deja lucrăm cu 8 beneficiari și mai acceptăm doar 4.

--
OWLIA - Echipa ta de marketing
owlia.ro`,
});

