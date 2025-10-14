const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔧 Fixing packages with realistic features...');

  // Update SMART (42K - realistic deliverables)
  await prisma.package.update({
    where: { id: 'smart-package' },
    data: {
      price: 42000,
      priceMonthly: 21000,
      features: [
        { title: 'Analiză & Strategie (Luna 1)', description: 'Audit industrie, competiție, buyer persona, plan marketing 12 luni' },
        { title: 'Logo Digital (Luna 2)', description: '3 variante design, culori brand, PNG/SVG toate mărimile, ghid utilizare' },
        { title: 'Website 8-10 Pagini (Lunile 2-3)', description: 'Design responsive, 8-10 pagini, SEO basic, formular contact, Google Analytics' },
        { title: 'Google Business (Luna 4)', description: 'Setup profil complet, 10 poze profesionale, descriere optimizată, reviews management' },
        { title: 'Content Social Media (8-12 postări/lună)', description: 'Facebook/Instagram, Canva design, copywriting, programare Buffer, 12 luni' },
        { title: 'Community Management Basic', description: 'Răspuns comentarii și mesaje 2x/săptămână, engagement monitoring, 12 luni' },
        { title: 'SEO Monitoring (12 luni)', description: 'Tracking poziții Google, ajustări meta tags, raport lunar SEO' },
        { title: 'Rapoarte Lunare (PDF)', description: 'Stats trafic website, engagement social media, insights, recomandări' },
        { title: 'Support & Consultanță', description: 'Email/WhatsApp zilnic, call lunar strategie, ajustări plan' },
      ]
    }
  });
  console.log('✅ SMART package updated (9 features - realistic for 42K)');

  // Update PREMIUM (55K - includes ALL SMART + print extras)
  await prisma.package.update({
    where: { id: 'premium-package' },
    data: {
      price: 55000,
      priceMonthly: 27500,
      features: [
        // ALL SMART Features
        { title: 'Analiză & Strategie (Luna 1)', description: 'Audit industrie, competiție, buyer persona, plan marketing 12 luni' },
        { title: 'Logo Digital (Luna 2)', description: '3 variante design, culori brand, PNG/SVG toate mărimile, ghid utilizare' },
        { title: 'Website 8-10 Pagini (Lunile 2-3)', description: 'Design responsive, 8-10 pagini, SEO basic, formular contact, Google Analytics' },
        { title: 'Google Business (Luna 4)', description: 'Setup profil complet, 10 poze profesionale, descriere optimizată, reviews management' },
        { title: 'Content Social Media (12-16 postări/lună)', description: 'Facebook/Instagram, design CUSTOM, copywriting pro, Stories, 12 luni' },
        { title: 'Community Management Basic', description: 'Răspuns comentarii și mesaje 2x/săptămână, engagement monitoring, 12 luni' },
        { title: 'SEO Monitoring (12 luni)', description: 'Tracking poziții Google, ajustări meta tags, raport lunar SEO' },
        { title: 'Rapoarte Lunare (PDF)', description: 'Stats trafic website, engagement social media, insights, recomandări' },
        { title: 'Support & Consultanță', description: 'Email/WhatsApp zilnic, call lunar strategie, ajustări plan' },
        // PREMIUM Extras
        { title: 'Logo + Brand Manual Complet', description: 'Brand book 20 pagini, toate formatele, templates Office/Social, mockups' },
        { title: 'Print: Cărți Vizită + Flyere', description: '500 cărți vizită premium + 1000 flyere A5 - design + print' },
        { title: 'Uniforme (6 seturi)', description: 'Tricouri/Polos personalizate, brodare logo profesională, calitate premium' },
        { title: 'Wrapping Autovehicul', description: 'Design folie mașină/dubă impactant, print + montaj profesional' },
        { title: 'Roll-up (2buc) + Banner', description: '2 roll-up 200x85cm + 1 banner 300x200cm pentru standuri evenimente' },
        { title: 'Video Prezentare 60sec', description: 'Filmare profesională + montaj pentru Facebook/Instagram' },
      ]
    }
  });
  console.log('✅ PREMIUM package updated (15 features - 9 SMART + 6 extras)');

  console.log('🎉 Done! Features updated with realistic deliverables.');
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error('❌ Failed:', e);
    prisma.$disconnect();
    process.exit(1);
  });
