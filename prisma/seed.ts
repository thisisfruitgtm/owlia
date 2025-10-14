import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@owlia.ro' },
    update: {},
    create: {
      email: 'admin@owlia.ro',
      password: adminPassword,
      name: 'Admin Owlia',
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create packages
  const smartPackage = await prisma.package.upsert({
    where: { id: 'smart-package' },
    update: {},
    create: {
      id: 'smart-package',
      name: 'SMART',
      price: 42000,
      priceMonthly: 22105,
      description: 'Doar digital (fără print)',
      features: JSON.stringify([
        { title: 'Analiză & Strategie Marketing', description: 'Audit complet industrie + competiție, definire buyer persona, strategie 12 luni' },
        { title: 'Logo Digital + Identitate Vizuală', description: 'Design logo modern, paletă culori, tipografie, ghid utilizare' },
        { title: 'Website Profesional 8-10 Pagini', description: 'Design responsive, optimizat SEO, formular contact, integrare Google Analytics' },
        { title: 'Google Business Profile Setup', description: 'Creare profil, optimizare keywords, poze profesionale, reviews management' },
        { title: 'Strategie Social Media 12 Luni', description: 'Plan editorial, calendar conținut, tone of voice, storytelling' },
        { title: 'Content Creation Lunar', description: 'Postări Facebook/Instagram, copywriting profesional, design grafic' },
        { title: 'SEO On-Page', description: 'Optimizare meta tags, keywords research, structură URL, sitemap' },
        { title: 'Management & Rapoarte Lunare', description: 'Monitorizare KPI-uri, rapoarte detaliate, recomandări optimizare' },
        { title: 'Training & Support', description: 'Instruire echipă, suport tehnic, consultanță continuă' },
      ]),
      timeline: JSON.stringify([
        { month: 1, milestone: 'Analiză & Strategie', description: 'Studiem planul și calculăm bugetul optim' },
        { month: 2, milestone: 'Brand Identity', description: 'Logo digital și identitate vizuală' },
        { month: 3, milestone: 'Website Development', description: 'Creare site 8-10 pagini + SEO' },
        { month: 4, milestone: 'Google Business Setup', description: 'Configurare și optimizare completă' },
        { month: 5, milestone: 'Social Media Strategy', description: 'Plan conținut 12 luni' },
        { month: 6, milestone: 'Content Creation', description: 'Materiale vizuale și copywriting' },
        { month: 7, milestone: 'SEO Optimization', description: 'Optimizare pentru căutări locale' },
        { month: 8, milestone: 'Website Updates', description: 'Actualizări și îmbunătățiri' },
        { month: 9, milestone: 'Performance Review', description: 'Analiză rezultate și ajustări' },
        { month: 10, milestone: 'Advanced Features', description: 'Funcționalități noi site' },
        { month: 11, milestone: 'Year-End Optimization', description: 'Optimizări finale' },
        { month: 12, milestone: 'Final Report', description: 'Raport complet + recomandări viitor' },
      ]),
      active: true,
    },
  });
  console.log('✅ Package created:', smartPackage.name);

  const premiumPackage = await prisma.package.upsert({
    where: { id: 'premium-package' },
    update: {},
    create: {
      id: 'premium-package',
      name: 'PREMIUM',
      price: 55000,
      priceMonthly: 28947,
      description: 'Totul inclus (digital + print)',
      features: JSON.stringify([
        { title: 'Toate Features din SMART', description: 'Analiză, strategie, website, SEO, social media, rapoarte' },
        { title: 'Logo Complet + Brand Manual', description: 'Logo în toate formatele, brand book 20+ pagini, template-uri office' },
        { title: 'Materiale Print Premium', description: 'Cărți vizită, flyere, broșuri, cataloage - design + print' },
        { title: 'Uniforme Personalizate (6 seturi)', description: 'Tricouri/Polos brodare logo, design profesional' },
        { title: 'Wrapping Autovehicul', description: 'Folie personalizată mașină/dubă, montaj profesional' },
        { title: 'Roll-up & Banner Standuri', description: '2 roll-up-uri 200x85cm + 1 banner 300x200cm pentru evenimente' },
        { title: 'Packaging & Etichete', description: 'Design ambalaje produse, etichete personalizate' },
        { title: 'Training Avansat Echipă', description: '3 ore training: utilizare CMS, social media, Google Analytics' },
        { title: 'Video Promotional', description: 'Video prezentare 60 sec pentru social media' },
        { title: 'Email Marketing Setup', description: 'Template-uri newsletter, automatizări, integrare CRM' },
      ]),
      timeline: JSON.stringify([
        { month: 1, milestone: 'Analiză & Strategie', description: 'Studiem planul și calculăm bugetul optim' },
        { month: 2, milestone: 'Brand Identity Complet', description: 'Logo, manual, template-uri' },
        { month: 3, milestone: 'Website & Materiale Print', description: 'Site + cărți vizită, flyere' },
        { month: 4, milestone: 'Uniforme & Wrapping', description: '6 seturi uniforme + folie autovehicul' },
        { month: 5, milestone: 'Roll-up & Banner', description: 'Materiale pentru evenimente' },
        { month: 6, milestone: 'Training Echipă', description: '3 ore training utilizare instrumente' },
        { month: 7, milestone: 'Google Business & SEO', description: 'Setup complet + optimizare' },
        { month: 8, milestone: 'Social Media Launch', description: 'Lansare strategie social media' },
        { month: 9, milestone: 'Content & Updates', description: 'Conținut nou + actualizări' },
        { month: 10, milestone: 'Performance Review', description: 'Analiză rezultate și ajustări' },
        { month: 11, milestone: 'Materiale Suplimentare', description: 'Broșuri, cataloage' },
        { month: 12, milestone: 'Final Report & Planning', description: 'Raport + plan anul 2' },
      ]),
      active: true,
    },
  });
  console.log('✅ Package created:', premiumPackage.name);

  // Create default settings
  const settings = [
    { key: 'module.calculator', value: 'true', description: 'Calculator buget pe landing page' },
    { key: 'module.pricing', value: 'true', description: 'Secțiune pricing pe landing page' },
    { key: 'module.faq', value: 'true', description: 'Secțiune FAQ pe landing page' },
    { key: 'module.contracts', value: 'true', description: 'Generare contracte în admin' },
    { key: 'module.notifications', value: 'true', description: 'Notificări email prin Resend' },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }
  console.log('✅ Settings created:', settings.length);

  console.log('🎉 Seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });

