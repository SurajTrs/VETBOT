#!/bin/bash

echo "🚀 Deploying Veterinary Chatbot SDK..."

# Build client
echo "📦 Building client..."
cd client
npm run build
cd ..

# Create production environment
echo "🔧 Setting up production environment..."
cp .env.example .env

# Build and start with Docker
echo "🐳 Starting with Docker..."
docker-compose up --build -d

echo "✅ Deployment complete!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:5001"
echo "📊 Health: http://localhost:5001/api/health"