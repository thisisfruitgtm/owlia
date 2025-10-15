interface PackageFeature {
  title: string;
  description?: string;
}

interface TimelineItem {
  month: number;
  milestone: string;
  description?: string;
}

interface ContractData {
  clientName: string;
  clientCIF: string;
  clientAddress: string;
  clientEmail: string;
  clientPhone: string;
  clientRegCom: string;
  packageName: string;
  packagePrice: number;
  packageFeatures?: PackageFeature[];
  timeline?: TimelineItem[];
  contractNumber: string;
  contractDate: string;
  legalRepName: string;
  legalRepRole: string;
}

export function contractTemplate(data: ContractData): string {
  const avans = (data.packagePrice * 0.5).toFixed(2);
  const duration = data.timeline?.length || 12;
  
  return `
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contract Prestări Servicii - ${data.contractNumber}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Times New Roman', serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #000;
      background: #fff;
    }
    
    .container {
      max-width: 100%;
      margin: 0 auto;
      padding: 20px;
    }
    
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
    }
    
    .header h1 {
      font-size: 16pt;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 10px;
      color: #00288B;
    }
    
    .header p {
      font-size: 12pt;
      font-weight: bold;
      color: #333;
    }
    
    .section {
      margin-bottom: 25px;
      page-break-inside: avoid;
    }
    
    .article {
      margin-bottom: 20px;
    }
    
    .article-title {
      font-size: 12pt;
      font-weight: bold;
      margin-bottom: 10px;
      color: #00288B;
    }
    
    .article-content {
      text-align: justify;
    }
    
    .article-content p {
      margin-bottom: 10px;
    }
    
    ul, ol {
      margin-left: 30px;
      margin-bottom: 10px;
    }
    
    ul li, ol li {
      margin-bottom: 8px;
    }
    
    .parties {
      margin: 20px 0;
    }
    
    .party {
      margin-bottom: 15px;
    }
    
    .party strong {
      font-size: 11pt;
      color: #00288B;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
    }
    
    thead {
      background-color: #00288B;
      color: white;
    }
    
    th, td {
      padding: 10px;
      text-align: left;
      border: 1px solid #ddd;
    }
    
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    
    .price-box {
      background: #00288B;
      color: white;
      padding: 15px;
      text-align: center;
      margin: 20px 0;
      font-weight: bold;
    }
    
    .price-box .amount {
      font-size: 18pt;
      margin: 10px 0;
    }
    
    .signatures {
      margin-top: 50px;
      display: flex;
      justify-content: space-between;
      page-break-inside: avoid;
    }
    
    .signature-block {
      width: 45%;
      text-align: center;
    }
    
    .signature-line {
      border-top: 1px solid #000;
      margin-top: 60px;
      padding-top: 10px;
    }
    
    @media print {
      body {
        margin: 0;
        padding: 0;
      }
      .container {
        padding: 0;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>CONTRACT PRESTĂRI SERVICII</h1>
      <p>NR. ${data.contractNumber}</p>
    </div>

    <!-- Article 1: Părțile contractante -->
    <div class="section">
      <div class="article">
        <div class="article-title">Art. 1 Părțile contractante</div>
        <div class="article-content">
          <div class="parties">
            <p>
              <strong>S.C. OWLIA S.R.L.</strong>, cu sediul în Sat Mihail Kogalniceanu, Str. Principala nr. 164, 
              Cod 707557, Jud. Iași, înregistrată la Registrul Comerțului sub nr. J20/2504/2025, Cod fiscal: 52108340, 
              reprezentată legal prin <strong>Marincea Petru Mihail</strong> în funcția de Administrator, 
              în calitate de <strong>prestator</strong>, pe de o parte,
            </p>
            
            <p style="margin: 15px 0;">Și</p>
            
            <p>
              <strong>${data.clientName}</strong>, cu sediul în ${data.clientAddress}, 
              înregistrată la Registrul Comerțului sub nr. ${data.clientRegCom || 'J__/____/____'}, 
              Cod fiscal: ${data.clientCIF}, tel. contact: ${data.clientPhone}, 
              reprezentată legal prin <strong>${data.legalRepName}</strong> în funcția de ${data.legalRepRole}, 
              în calitate de <strong>beneficiar</strong>, pe de altă parte.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Article 2: Obiectul contractului -->
    <div class="section">
      <div class="article">
        <div class="article-title">Art. 2 Obiectul contractului</div>
        <div class="article-content">
          <p>(1) Prestatorul se obligă să presteze serviciile din pachetul <strong>${data.packageName}</strong>.</p>
          
          ${data.packageFeatures && data.packageFeatures.length > 0 ? `
          <p>(2) Serviciile includ:</p>
          <ul>
            ${data.packageFeatures.map(feature => `
              <li>
                ${feature.title}
                ${feature.description ? `<br><span style="color: #666; font-size: 10pt;">${feature.description}</span>` : ''}
              </li>
            `).join('')}
          </ul>
          ` : ''}
          
          <p>(3) <strong>Design grafic și modificări incluse:</strong></p>
          <ul>
            <li>Prestatorul va realiza design grafic personalizat pentru proiect;</li>
            <li>În cadrul procesului de design, beneficiarul are dreptul la <strong>3 (trei) modificări gratuite</strong> 
                care pot include: schimbări de culori, modificări de texte, ajustări de imagini și alte elemente vizuale similare;</li>
            <li>Modificările gratuite <strong>nu includ</strong> schimbări de structură, reconfigurarea layout-ului, 
                adăugarea de secțiuni noi sau modificări majore ale arhitecturii;</li>
            <li>Orice modificări suplimentare peste cele 3 incluse sau modificări de structură vor fi facturate 
                separat conform tarifelor prestatorului.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Article 3: Valoarea contractului -->
    <div class="section">
      <div class="article">
        <div class="article-title">Art. 3 Valoarea contractului și modalități de plată</div>
        <div class="article-content">
          <p>(1) Valoarea totală a contractului, respectiv prețul serviciilor prestate, este de:</p>
          <div class="price-box">
            <div class="amount">${data.packagePrice.toLocaleString('ro-RO')} RON</div>
            <div style="font-size: 10pt; margin-top: 10px;">la care nu se adaugă T.V.A. – ambele societăți fiind neplatitoare de TVA</div>
          </div>
          
          <p>(2) Modalitatea de plată a contractului se va face în următoarele condiții:</p>
          <ul>
            <li><strong>50% din valoarea contractului</strong>, respectiv <strong>${avans} RON</strong>, 
                se achită la semnarea prezentului contract de servicii, reprezentând avans pentru inițierea lucrărilor;</li>
            <li><strong>50% din valoarea contractului</strong>, respectiv <strong>${avans} RON</strong>, 
                se achită la recepția totală și acceptarea finală.</li>
          </ul>
          
          <p>(3) Plățile se vor efectua prin ordin de plată în contul bancar al prestatorului:</p>
          <ul>
            <li><strong>Beneficiar:</strong> OWLIA S.R.L.</li>
            <li><strong>IBAN:</strong> RO23BTRLRONCRT0CZ0061501</li>
            <li><strong>Banca:</strong> Banca Transilvania</li>
          </ul>
          
          <p>(4) Plățile pot fi efectuate și prin alte modalități convenite de comun acord între părți.</p>
        </div>
      </div>
    </div>

    <!-- Article 4: Durata și termene -->
    <div class="section">
      <div class="article">
        <div class="article-title">Art. 4 Durata contractului și termene de execuție</div>
        <div class="article-content">
          <p>(1) Contractul intră în vigoare la data semnării lui de către ambele părți.</p>
          
          <p>(2) Livrarea serviciilor se face în termen de <strong>${duration} (${duration === 12 ? 'douăsprezece' : duration}) luni</strong> 
             de la data încasării avansului și primirii tuturor materialelor necesare din partea beneficiarului.</p>
          
          ${data.timeline && data.timeline.length > 0 ? `
          <p>(3) <strong>Plan de implementare (${duration} luni):</strong></p>
          <table>
            <thead>
              <tr>
                <th style="width: 80px;">Luna</th>
                <th>Milestone</th>
                <th>Descriere</th>
              </tr>
            </thead>
            <tbody>
              ${data.timeline.map((item, index) => `
              <tr>
                <td style="text-align: center; font-weight: bold;">L${item.month}</td>
                <td style="font-weight: 600;">${item.milestone}</td>
                <td style="color: #666;">${item.description || '-'}</td>
              </tr>
              `).join('')}
            </tbody>
          </table>
          ` : ''}
          
          <p>(${data.timeline ? '4' : '3'}) Termenul de execuție poate fi prelungit în cazul în care beneficiarul nu furnizează 
             la timp materialele necesare sau solicită modificări substanțiale față de specificațiile inițiale.</p>
          
          <p>(${data.timeline ? '5' : '4'}) Recepția serviciilor ce fac obiectul contractului se realizează online sau 
             la sediul beneficiarului, după caz.</p>
        </div>
      </div>
    </div>

    <!-- Article 5: Garanția și mentenanța -->
    <div class="section">
      <div class="article">
        <div class="article-title">Art. 5 Garanția și mentenanța</div>
        <div class="article-content">
          <p>(1) Prestatorul acordă o garanție de <strong>12 luni</strong> de la data recepției finale pentru 
             funcționarea corectă, în condițiile utilizării normale.</p>
          
          <p>(2) Garanția acoperă:</p>
          <ul>
            <li>Corectarea erorilor de funcționare apărute din culpa prestatorului</li>
            <li>Asigurarea funcționării corecte a tuturor funcționalităților implementate</li>
            <li>Suport tehnic pentru utilizare</li>
          </ul>
          
          <p>(3) Garanția nu acoperă:</p>
          <ul>
            <li>Modificări solicitate de beneficiar după recepția finală</li>
            <li>Probleme cauzate de intervenții neautorizate ale beneficiarului sau ale terților</li>
            <li>Defecțiuni cauzate de utilizarea necorespunzătoare</li>
            <li>Probleme de hosting sau domeniu generate de furnizorii terți</li>
            <li>Atacuri cibernetice sau malware</li>
          </ul>
          
          <p>(4) După expirarea perioadei de garanție, eventualele servicii de mentenanță și actualizare vor fi 
             facturate separat conform tarifelor practicate de prestator la acea dată.</p>
        </div>
      </div>
    </div>

    <!-- Article 6: Obligații prestator -->
    <div class="section">
      <div class="article">
        <div class="article-title">Art. 6 Obligații și responsabilități ale părților</div>
        <div class="article-content">
          <p><strong>(1) Obligațiile prestatorului:</strong></p>
          <ul>
            <li>Să presteze serviciile la standardele și/sau performanțele prezentate în oferta tehnică și financiară;</li>
            <li>Să realizeze serviciile conform specificațiilor agreate;</li>
            <li>Să asigure funcționarea corectă a tuturor modulelor și funcționalităților;</li>
            <li>Să asigure instruirea necesară pentru utilizare;</li>
            <li>Să respecte confidențialitatea informațiilor primite de la beneficiar;</li>
            <li>Să efectueze backup-uri regulate pe perioada garanției.</li>
          </ul>
          
          <p><strong>(2) Obligațiile beneficiarului:</strong></p>
          <ul>
            <li>Să furnizeze la timp toate materialele necesare (texte, imagini, logo, informații);</li>
            <li>Să desemneze o persoană de contact pentru comunicarea cu prestatorul;</li>
            <li>Să recepționeze serviciile în termenul convenit;</li>
            <li>Să plătească prețul serviciilor către prestator în termenele convenite;</li>
            <li>Să respecte indicațiile prestatorului privind mentenanța și administrarea;</li>
            <li>Să informeze prompt prestatorul despre orice probleme tehnice identificate.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Article 7: Proprietatea intelectuală -->
    <div class="section">
      <div class="article">
        <div class="article-title">Art. 7 Proprietatea intelectuală</div>
        <div class="article-content">
          <p>(1) Drepturile de proprietate intelectuală asupra design-ului grafic personalizat și asupra conținutului 
             specific creat pentru beneficiar vor fi transferate beneficiarului la plata integrală a contractului.</p>
          
          <p>(2) Prestatorul își rezervă dreptul de a utiliza proiectul finalizat în portofoliul propriu de prezentare.</p>
          
          <p>(3) Codul sursă și framework-urile open-source utilizate rămân sub licențele respective.</p>
        </div>
      </div>
    </div>

    <!-- Article 8: Răspunderea contractuală -->
    <div class="section">
      <div class="article">
        <div class="article-title">Art. 8 Răspunderea contractuală</div>
        <div class="article-content">
          <p>(1) Pentru neexecutarea sau executarea necorespunzătoare a obligațiilor asumate prin prezentul contract, 
             partea în culpă va plăti penalități de <strong>0,1% pe zi întârziere</strong> calculate la valoarea de 
             sub incidența întârzierii sau neexecutării, dar nu mai mult de 10% din valoarea totală a contractului.</p>
          
          <p>(2) În caz de întârziere la plată din partea beneficiarului, prestatorul are dreptul de a suspenda 
             prestarea serviciilor până la achitarea sumelor datorate.</p>
          
          <p>(3) Prestatorul nu își asumă răspunderea pentru pierderile de date sau pentru întreruperi ale serviciului 
             datorate furnizorilor terți de hosting sau de domeniu.</p>
        </div>
      </div>
    </div>

    <!-- Article 9: Modificarea și încetarea -->
    <div class="section">
      <div class="article">
        <div class="article-title">Art. 9 Modificarea și încetarea contractului</div>
        <div class="article-content">
          <p>(1) Modificarea prezentului contract se face numai prin act adițional încheiat între părțile contractante.</p>
          
          <p>(2) Contractul încetează:</p>
          <ul>
            <li>La îndeplinirea integrală a obligațiilor de către ambele părți;</li>
            <li>Prin acordul părților;</li>
            <li>Prin denunțare unilaterală în cazul nerespectării obligațiilor esențiale, cu un preaviz de 15 zile;</li>
            <li>În cazuri de forță majoră care persistă mai mult de 6 luni.</li>
          </ul>
          
          <p>(3) În cazul rezilierii contractului din motive imputabile beneficiarului, avansul plătit nu se restituie.</p>
        </div>
      </div>
    </div>

    <!-- Article 10: Litigii -->
    <div class="section">
      <div class="article">
        <div class="article-title">Art. 10 Litigii</div>
        <div class="article-content">
          <p>(1) În cazul unor neînțelegeri sau dispute decurgând din sau în legătură cu acest contract, acestea 
             vor fi soluționate pe cale amiabilă prin negociere directă.</p>
          
          <p>(2) În cazul în care litigiul nu poate fi soluționat pe cale amiabilă, acesta va fi supus medierii.</p>
          
          <p>(3) În situația în care un litigiu nu va putea fi soluționat prin mediere, acesta se va soluționa de 
             către instanțele judecătorești competente din România.</p>
        </div>
      </div>
    </div>

    <!-- Article 11: Forța majoră -->
    <div class="section">
      <div class="article">
        <div class="article-title">Art. 11 Forța majoră</div>
        <div class="article-content">
          <p>(1) Forța majoră este constatată de o autoritate competentă.</p>
          
          <p>(2) Forța majoră exonerează părțile contractante de îndeplinirea obligațiilor asumate prin prezentul contract, 
             pe toată perioada în care aceasta acționează.</p>
          
          <p>(3) Îndeplinirea contractului va fi suspendată în perioada de acțiune a forței majore, dar fără a 
             prejudicia drepturile ce li se cuveneau părților până la apariția acesteia.</p>
          
          <p>(4) Partea contractantă care invocă forța majoră are obligația de a notifica celeilalte părți producerea 
             acesteia în maximum 5 zile lucrătoare de la apariție și încetarea cauzei acesteia în maximum 15 zile de la încetare.</p>
          
          <p>(5) Dacă forța majoră acționează sau se estimează că va acționa o perioadă mai mare de 6 luni, fiecare 
             parte va avea dreptul să notifice celeilalte părți încetarea de drept a prezentului contract, fără ca 
             vreuna din părți să poată pretinde celeilalte daune-interese.</p>
        </div>
      </div>
    </div>

    <!-- Article 12: Confidențialitate -->
    <div class="section">
      <div class="article">
        <div class="article-title">Art. 12 Confidențialitate și protecția datelor</div>
        <div class="article-content">
          <p>(1) Ambele părți se obligă să păstreze confidențialitatea tuturor informațiilor primite în cadrul 
             executării prezentului contract.</p>
          
          <p>(2) Prestatorul se obligă să respecte prevederile Regulamentului General privind Protecția Datelor (GDPR) 
             în ceea ce privește prelucrarea datelor cu caracter personal.</p>
        </div>
      </div>
    </div>

    <!-- Article 13: Clauze finale -->
    <div class="section">
      <div class="article">
        <div class="article-title">Art. 13 Clauze finale</div>
        <div class="article-content">
          <p>(1) În cazul în care părțile își încalcă obligațiile lor, neexercitarea de către partea care suferă 
             vreun prejudiciu a dreptului de a cere executarea întocmai sau prin echivalent bănesc a obligației 
             respective nu înseamnă că ea a renunțat la acest drept al său.</p>
          
          <p>(2) În cazul în care una dintre prevederile prezentului contract nu mai produce efecte juridice, 
             celelalte prevederi rămân valabile.</p>
          
          <p>(3) Prezentul contract constituie titlu executoriu conform Codului de procedură civilă.</p>
          
          <p>(4) Orice notificare între părți se va face în scris, la adresele menționate în prezentul contract 
             sau la adresele de email comunicate reciproc.</p>
          
          <p>(5) Prezentul contract a fost încheiat astăzi, <strong>${data.contractDate}</strong>, în două exemplare 
             originale, câte unul pentru fiecare parte, ambele având aceeași valoare juridică.</p>
        </div>
      </div>
    </div>

    <!-- Signatures -->
    <div class="signatures">
      <div class="signature-block">
        <strong>BENEFICIAR</strong>
        <p>${data.clientName}</p>
        <p>${data.legalRepRole}</p>
        <p><strong>${data.legalRepName}</strong></p>
        <div class="signature-line">
          _________________________
        </div>
      </div>
      
      <div class="signature-block">
        <strong>PRESTATOR</strong>
        <p>OWLIA S.R.L.</p>
        <p>Administrator</p>
        <p><strong>Marincea Petru Mihail</strong></p>
        <div class="signature-line">
          _________________________
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}
