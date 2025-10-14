const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('\n🔍 Diagnostic Pachete\n');
  console.log('='.repeat(60));

  const packages = await prisma.package.findMany();
  
  console.log(`\nGăsite ${packages.length} pachete:\n`);

  for (const pkg of packages) {
    console.log(`📦 ${pkg.name} (${pkg.id})`);
    console.log(`   Active: ${pkg.active}`);
    console.log(`   Price: ${pkg.price} RON`);
    console.log(`   Features type: ${typeof pkg.features}`);
    console.log(`   Features is array: ${Array.isArray(pkg.features)}`);
    
    if (Array.isArray(pkg.features)) {
      console.log(`   Features count: ${pkg.features.length}`);
      if (pkg.features.length > 0) {
        console.log(`   First feature type: ${typeof pkg.features[0]}`);
        console.log(`   First feature:`, JSON.stringify(pkg.features[0], null, 2));
        
        if (typeof pkg.features[0] === 'string') {
          console.log(`   ❌ OLD FORMAT (string[]) - NEEDS MIGRATION`);
        } else if (pkg.features[0].title) {
          console.log(`   ✅ NEW FORMAT ({title, description}[])`);
        }
      }
    }
    console.log('');
  }

  console.log('='.repeat(60));
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error('❌ Error:', e);
    prisma.$disconnect();
    process.exit(1);
  });

