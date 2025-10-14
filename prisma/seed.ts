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
        { title: 'Îți calculăm bugetul', description: 'Analiză detaliată și recomandări' },
        { title: 'Logo digital', description: 'Identitate vizuală modernă' },
        { title: 'Website 8-10 pagini', description: 'Responsive, optimizat SEO' },
        { title: 'Google Business', description: 'Setup complet + optimizare' },
        { title: 'Strategie social media', description: 'Plan conținut 12 luni' },
        { title: 'Management 12 luni', description: 'Monitorizare și raportare' },
        { title: 'Rapoarte lunare', description: 'Transparență totală' },
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
        { title: 'Tot ce e la SMART +', description: 'Toate features din pachetul SMART' },
        { title: 'Logo complet + manual', description: 'Brand book profesional' },
        { title: 'Uniforme (6 seturi)', description: 'Personalizate cu logo-ul tău' },
        { title: 'Folie pe mașină', description: 'Wrapping profesional autovehicul' },
        { title: 'Cărți vizită, flyere', description: 'Materiale print premium' },
        { title: 'Roll-up + Banner', description: 'Pentru evenimente și expoziții' },
        { title: 'Training 3 ore pentru echipa ta', description: 'Utilizare instrumente marketing' },
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

