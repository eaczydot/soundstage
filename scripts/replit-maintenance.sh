#!/bin/bash

echo "🔧 Running Replit maintenance..."

# Clear npm cache
echo "Clearing npm cache..."
npm cache clean --force

# Remove unused dependencies
echo "Removing unused dependencies..."
npm prune

# Clear Next.js cache
echo "Clearing Next.js cache..."
rm -rf .next/cache

# Update dependencies
echo "Checking for updates..."
npm update

# Run security audit
echo "Running security audit..."
npm audit fix

echo "✅ Maintenance complete!" 