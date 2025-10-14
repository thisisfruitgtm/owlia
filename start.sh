#!/bin/sh
set -e

echo "🔄 Running database migrations..."
prisma migrate deploy

echo "🌱 Checking if database needs seeding..."
# Only seed if admin user doesn't exist (first deploy)
npx tsx prisma/seed.ts || echo "⚠️ Seed failed or already seeded"

echo "🔧 Fixing package features if needed..."
node scripts/fix-packages.js || echo "⚠️ Package fix failed or already fixed"

echo "✅ Setup complete. Starting server..."
node server.js

