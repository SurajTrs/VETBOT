#!/bin/bash

# Veterinary Chatbot SDK Setup Script
echo "🐾 Setting up Veterinary Chatbot SDK..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

print_status "Node.js version check passed: $(node -v)"

# Check if MongoDB is available (optional)
if command -v mongod &> /dev/null; then
    print_status "MongoDB found locally"
else
    print_warning "MongoDB not found locally. You can use MongoDB Atlas or Docker."
fi

# Install root dependencies
print_info "Installing root dependencies..."
npm install

# Install server dependencies
print_info "Installing server dependencies..."
cd server && npm install
cd ..

# Install client dependencies
print_info "Installing client dependencies..."
cd client && npm install
cd ..

# Create environment files if they don't exist
if [ ! -f "server/.env" ]; then
    print_info "Creating server environment file..."
    cp server/.env.example server/.env
    print_warning "Please edit server/.env with your actual configuration values"
fi

if [ ! -f "client/.env" ]; then
    print_info "Creating client environment file..."
    cp client/.env.example client/.env
fi

if [ ! -f ".env" ]; then
    print_info "Creating Docker environment file..."
    cp .env.example .env
    print_warning "Please edit .env with your actual configuration values for Docker"
fi

# Build the client and SDK
print_info "Building client application..."
cd client && npm run build
cd ..

print_status "Setup completed successfully!"

echo ""
echo "🚀 Next Steps:"
echo "1. Edit server/.env with your MongoDB URI and Gemini API key"
echo "2. Start the development servers:"
echo "   npm run dev"
echo ""
echo "📦 For production deployment:"
echo "1. Edit .env with your production values"
echo "2. Run with Docker:"
echo "   docker-compose up --build"
echo ""
echo "🌐 SDK Integration:"
echo "Add this to any website:"
echo '<script src="https://your-domain.com/chatbot.js"></script>'
echo ""
echo "📚 View the demo at: http://localhost:3000"
echo "🔧 API docs at: http://localhost:5000/api/health"