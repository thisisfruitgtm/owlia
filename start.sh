#!/bin/sh
set -e

echo "🔄 Running database migrations..."
prisma migrate deploy

echo "🌱 Checking if database needs seeding..."
# Only seed if admin user doesn't exist (first deploy)
npx tsx prisma/seed.ts || echo "⚠️ Seed failed or already seeded"

echo "✅ Setup complete. Starting server..."
node server.js

