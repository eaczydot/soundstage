#!/bin/bash

echo "🚀 Starting Replit deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🏗️ Building project..."
npm run build

# Setup environment
echo "🔧 Setting up environment..."
if [ ! -f .env ]; then
  echo "Creating .env file..."
  cp .env.example .env
fi

# Clear cache
echo "🧹 Clearing cache..."
rm -rf .next/cache

# Start the application
echo "✨ Starting application..."
npm run start