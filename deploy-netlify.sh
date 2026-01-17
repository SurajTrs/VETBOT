#!/bin/bash

echo "🌍 Deploying to Netlify for instant global access..."

# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
cd client
netlify deploy --prod --dir=build --open

echo "✅ Global deployment complete!"
echo "🌐 Your app is now live globally!"