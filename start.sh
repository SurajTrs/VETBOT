#!/bin/bash

echo "🐾 Starting Veterinary Chatbot SDK..."

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB not running. Starting MongoDB..."
    # Try to start MongoDB (works on macOS with Homebrew)
    if command -v brew &> /dev/null; then
        brew services start mongodb-community
    else
        echo "Please start MongoDB manually or use Docker:"
        echo "docker run -d -p 27017:27017 --name mongodb mongo:7"
    fi
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm run install:all
fi

# Start the development servers
echo "🚀 Starting development servers..."
npm run dev