#!/bin/sh
set -e

echo "🔄 Running database migrations..."
prisma migrate deploy

echo "✅ Migrations complete. Starting server..."
node server.js

