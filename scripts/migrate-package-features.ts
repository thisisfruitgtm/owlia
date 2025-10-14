import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Migrare features pachete...');

  const packages = await prisma.package.findMany();

  for (const pkg of packages) {
    const features = pkg.features as any;

    // Check if features are old format (string array)
    if (Array.isArray(features) && features.length > 0) {
      if (typeof features[0] === 'string') {
        console.log(`📦 Converting ${pkg.name}...`);
        
        // Convert to new format
        const newFeatures = features.map((feature: string) => ({
          title: feature,
          description: '',
        }));

        await prisma.package.update({
          where: { id: pkg.id },
          data: { features: newFeatures },
        });

        console.log(`✅ ${pkg.name} converted (${newFeatures.length} features)`);
      } else {
        console.log(`✅ ${pkg.name} already in new format`);
      }
    } else {
      console.log(`⚠️  ${pkg.name} has no features`);
    }
  }

  console.log('🎉 Migration complete!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Migration failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });

