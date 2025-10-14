const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔧 Fixing packages...');

  // Update SMART
  await prisma.package.update({
    where: { id: 'smart-package' },
    data: {
      priceMonthly: 21000, // 21K per 6 luni (vs 42K anual)
      features: [
        { title: 'Analiză & Strategie Marketing', description: 'Audit complet industrie + competiție, definire buyer persona, strategie 12 luni' },
        { title: 'Logo Digital + Identitate Vizuală', description: 'Design logo modern, paletă culori, tipografie, ghid utilizare' },
        { title: 'Website Profesional 8-10 Pagini', description: 'Design responsive, optimizat SEO, formular contact, integrare Google Analytics' },
        { title: 'Google Business Profile Setup', description: 'Creare profil, optimizare keywords, poze profesionale, reviews management' },
        { title: 'Strategie Social Media 12 Luni', description: 'Plan editorial, calendar conținut, tone of voice, storytelling' },
        { title: 'Content Creation Lunar', description: 'Postări Facebook/Instagram, copywriting profesional, design grafic' },
        { title: 'SEO On-Page', description: 'Optimizare meta tags, keywords research, structură URL, sitemap' },
        { title: 'Management & Rapoarte Lunare', description: 'Monitorizare KPI-uri, rapoarte detaliate, recomandări optimizare' },
        { title: 'Training & Support', description: 'Instruire echipă, suport tehnic, consultanță continuă' },
      ],
    },
  });
  console.log('✅ SMART package updated');

  // Update PREMIUM (includes ALL SMART features + extras)
  await prisma.package.update({
    where: { id: 'premium-package' },
    data: {
      priceMonthly: 27500, // 27.5K per 6 luni (vs 55K anual)
      features: [
        // SMART Features
        { title: 'Analiză & Strategie Marketing', description: 'Audit complet industrie + competiție, definire buyer persona, strategie 12 luni' },
        { title: 'Logo Digital + Identitate Vizuală', description: 'Design logo modern, paletă culori, tipografie, ghid utilizare' },
        { title: 'Website Profesional 8-10 Pagini', description: 'Design responsive, optimizat SEO, formular contact, integrare Google Analytics' },
        { title: 'Google Business Profile Setup', description: 'Creare profil, optimizare keywords, poze profesionale, reviews management' },
        { title: 'Strategie Social Media 12 Luni', description: 'Plan editorial, calendar conținut, tone of voice, storytelling' },
        { title: 'Content Creation Lunar', description: 'Postări Facebook/Instagram, copywriting profesional, design grafic' },
        { title: 'SEO On-Page', description: 'Optimizare meta tags, keywords research, structură URL, sitemap' },
        { title: 'Management & Rapoarte Lunare', description: 'Monitorizare KPI-uri, rapoarte detaliate, recomandări optimizare' },
        { title: 'Training & Support', description: 'Instruire echipă, suport tehnic, consultanță continuă' },
        // PREMIUM Extras
        { title: 'Logo Complet + Brand Manual', description: 'Logo în toate formatele, brand book 20+ pagini, template-uri office, ghid utilizare detaliat' },
        { title: 'Materiale Print Premium', description: 'Cărți vizită, flyere, broșuri, cataloage, mape prezentare - design + print' },
        { title: 'Uniforme Personalizate (6 seturi)', description: 'Tricouri/Polos brodare logo, design profesional, calitate premium' },
        { title: 'Wrapping Autovehicul', description: 'Folie personalizată mașină/dubă, design impactant, montaj profesional' },
        { title: 'Roll-up & Banner Standuri', description: '2 roll-up-uri 200x85cm + 1 banner 300x200cm pentru evenimente și expoziții' },
        { title: 'Packaging & Etichete', description: 'Design ambalaje produse, etichete personalizate, mockup 3D' },
        { title: 'Training Avansat Echipă (3 ore)', description: 'Workshop utilizare CMS, social media management, Google Analytics, instrumente marketing' },
        { title: 'Video Promotional', description: 'Video prezentare 60 sec pentru social media, producție profesională' },
        { title: 'Email Marketing Setup', description: 'Template-uri newsletter, automatizări, integrare CRM, campanii email' },
      ],
    },
  });
  console.log('✅ PREMIUM package updated');

  console.log('🎉 Done! Refresh the packages page.');
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error('❌ Failed:', e);
    prisma.$disconnect();
    process.exit(1);
  });

