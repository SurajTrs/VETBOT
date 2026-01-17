#!/bin/bash

echo "🌍 Deploying to Vercel for global access..."

# Install Vercel CLI
npm install -g vercel

# Build client
cd client
npm run build
cd ..

# Deploy to Vercel
vercel --prod --yes

echo "✅ Global deployment complete!"
echo "🌐 Your app will be available at: https://your-project-name.vercel.app"