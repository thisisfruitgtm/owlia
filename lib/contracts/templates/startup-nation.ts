interface ContractData {
  clientName: string;
  clientCIF: string;
  clientAddress: string;
  clientEmail: string;
  clientPhone: string;
  packageName: string;
  packagePrice: number;
  contractNumber: string;
  contractDate: string;
  legalRepName: string;
  legalRepRole: string;
}

export function contractTemplate(data: ContractData): string {
  return `
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contract Servicii Marketing - ${data.contractNumber}</title>
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
      border-bottom: 2px solid #0A2540;
      padding-bottom: 20px;
    }
    
    .header h1 {
      font-size: 16pt;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 10px;
      color: #0A2540;
    }
    
    .header p {
      font-size: 10pt;
      color: #333;
    }
    
    .section {
      margin-bottom: 25px;
    }
    
    .section-title {
      font-size: 12pt;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 15px;
      color: #0A2540;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
    }
    
    .parties {
      margin-bottom: 20px;
    }
    
    .party {
      margin-bottom: 15px;
      padding: 10px;
      background: #f9f9f9;
      border-left: 3px solid #0A2540;
    }
    
    .party strong {
      font-size: 11pt;
      color: #0A2540;
    }
    
    .party p {
      margin: 5px 0;
      padding-left: 10px;
    }
    
    .article {
      margin-bottom: 20px;
    }
    
    .article-title {
      font-weight: bold;
      margin-bottom: 10px;
      color: #0A2540;
    }
    
    .article-content {
      text-align: justify;
      padding-left: 20px;
    }
    
    .article-content p {
      margin-bottom: 10px;
    }
    
    ul {
      margin-left: 40px;
      margin-bottom: 10px;
    }
    
    ul li {
      margin-bottom: 5px;
    }
    
    .price-box {
      background: #0A2540;
      color: white;
      padding: 15px;
      border-radius: 5px;
      text-align: center;
      margin: 20px 0;
    }
    
    .price-box .amount {
      font-size: 18pt;
      font-weight: bold;
      margin: 10px 0;
    }
    
    .signatures {
      margin-top: 50px;
      display: flex;
      justify-content: space-between;
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
    
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #0A2540;
      text-align: center;
      font-size: 9pt;
      color: #666;
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
      <h1>Contract de Prestări Servicii</h1>
      <p>Nr. ${data.contractNumber} din ${data.contractDate}</p>
    </div>

    <!-- Parties -->
    <div class="section">
      <div class="section-title">Părțile Contractante</div>
      
      <div class="parties">
        <div class="party">
          <strong>PRESTATOR: OWLIA SRL</strong>
          <p>CUI: RO47854321</p>
          <p>Adresă: Str. Exemplu nr. 10, București, Sector 1</p>
          <p>Email: contact@owlia.ro</p>
          <p>Telefon: +40 123 456 789</p>
          <p>Reprezentant legal: [Nume Director], Director General</p>
        </div>
        
        <div class="party">
          <strong>BENEFICIAR: ${data.clientName}</strong>
          <p>CUI: ${data.clientCIF}</p>
          <p>Adresă: ${data.clientAddress}</p>
          <p>Email: ${data.clientEmail}</p>
          <p>Telefon: ${data.clientPhone}</p>
          <p>Reprezentant legal: ${data.legalRepName}, ${data.legalRepRole}</p>
        </div>
      </div>
    </div>

    <!-- Article 1 -->
    <div class="section">
      <div class="article">
        <div class="article-title">Art. 1 - Obiectul Contractului</div>
        <div class="article-content">
          <p>
            Prezentul contract are ca obiect prestarea serviciilor de marketing digital, branding și web design 
            în cadrul pachetului <strong>${data.packageName}</strong>, conform specificațiilor tehnice și planului 
            de implementare anexat prezentului contract.
          </p>
          <p>Serviciile includ, dar nu se limitează la:</p>
          <ul>
            <li>Analiză de piață și definire strategie marketing</li>
            <li>Creare identitate vizuală și brand guidelines</li>
            <li>Dezvoltare website responsive (8-10 pagini)</li>
            <li>Configurare Google Business Profile</li>
            <li>Strategie social media (12 luni)</li>
            <li>Management și raportare lunară</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Article 2 -->
    <div class="section">
      <div class="article">
        <div class="article-title">Art. 2 - Valoarea Contractului</div>
        <div class="article-content">
          <p>Valoarea totală a serviciilor prestate este de:</p>
          <div class="price-box">
            <div>Valoare Totală</div>
            <div class="amount">${data.packagePrice.toLocaleString('ro-RO')} RON</div>
            <div>(TVA inclus)</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Article 3 -->
    <div class="section">
      <div class="article">
        <div class="article-title">Art. 3 - Durata Contractului</div>
        <div class="article-content">
          <p>
            Prezentul contract intră în vigoare la data semnării de către ambele părți și este valabil 
            pentru o perioadă de <strong>12 (douăsprezece) luni</strong>, conform planului de implementare.
          </p>
          <p>
            Contractul poate fi prelungit prin acordul scris al ambelor părți, cu minimum 30 de zile 
            înainte de expirare.
          </p>
        </div>
      </div>
    </div>

    <!-- Article 4 -->
    <div class="section">
      <div class="article">
        <div class="article-title">Art. 4 - Modalități de Plată</div>
        <div class="article-content">
          <p>Plata se efectuează conform planului stabilit:</p>
          <ul>
            <li>Avans: 30% la semnarea contractului</li>
            <li>Tranșa 2: 30% la finalizarea brand identity (luna 2-3)</li>
            <li>Tranșa 3: 40% la finalizarea website-ului (luna 3-4)</li>
          </ul>
          <p>
            Plățile se vor efectua în termen de maximum 5 zile lucrătoare de la emiterea facturii, 
            prin transfer bancar în contul prestatorului.
          </p>
        </div>
      </div>
    </div>

    <!-- Article 5 -->
    <div class="section">
      <div class="article">
        <div class="article-title">Art. 5 - Obligațiile Prestatorului</div>
        <div class="article-content">
          <ul>
            <li>Să presteze serviciile cu profesionalism și în termenele stabilite</li>
            <li>Să furnizeze rapoarte lunare detaliate privind activitățile desfășurate</li>
            <li>Să mențină confidențialitatea informațiilor primite de la beneficiar</li>
            <li>Să asigure suport tehnic pe toată durata contractului</li>
            <li>Să respecte brand guidelines și identitatea vizuală agreată</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Article 6 -->
    <div class="section">
      <div class="article">
        <div class="article-title">Art. 6 - Obligațiile Beneficiarului</div>
        <div class="article-content">
          <ul>
            <li>Să efectueze plățile în termenele stabilite</li>
            <li>Să furnizeze toate informațiile și materialele necesare în timp util</li>
            <li>Să ofere feedback și aprobări în maximum 5 zile lucrătoare</li>
            <li>Să desemneze o persoană de contact pentru coordonare</li>
            <li>Să respecte recomandările strategice ale prestatorului</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Article 7 -->
    <div class="section">
      <div class="article">
        <div class="article-title">Art. 7 - Încetarea Contractului</div>
        <div class="article-content">
          <p>Prezentul contract poate înceta în următoarele situații:</p>
          <ul>
            <li>La expirarea duratei contractuale</li>
            <li>Prin acordul scris al ambelor părți</li>
            <li>Prin denunțare unilaterală cu notificare cu 30 zile înainte</li>
            <li>În caz de neîndeplinire a obligațiilor contractuale</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Article 8 -->
    <div class="section">
      <div class="article">
        <div class="article-title">Art. 8 - Forță Majoră</div>
        <div class="article-content">
          <p>
            Niciunа dintre părți nu răspunde de neexecutarea la termen sau de executarea 
            necorespunzătoare a obligațiilor contractuale, dacă aceasta a fost determinată de forță majoră.
          </p>
        </div>
      </div>
    </div>

    <!-- Article 9 -->
    <div class="section">
      <div class="article">
        <div class="article-title">Art. 9 - Litigii</div>
        <div class="article-content">
          <p>
            Litigiile apărute în legătură cu executarea prezentului contract se vor rezolva pe cale amiabilă. 
            În cazul în care aceasta nu este posibilă, litigiile vor fi soluționate de instanțele judecătorești 
            competente din România.
          </p>
        </div>
      </div>
    </div>

    <!-- Signatures -->
    <div class="signatures">
      <div class="signature-block">
        <strong>PRESTATOR</strong>
        <p>OWLIA SRL</p>
        <div class="signature-line">
          Semnătură și Ștampilă
        </div>
      </div>
      
      <div class="signature-block">
        <strong>BENEFICIAR</strong>
        <p>${data.clientName}</p>
        <div class="signature-line">
          Semnătură și Ștampilă
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>Contract generat electronic de platforma OWLIA</p>
      <p>Pentru detalii: contact@owlia.ro | +40 123 456 789</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

