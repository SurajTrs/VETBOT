#!/bin/bash

# AWS Deployment Script for Veterinary Chatbot SDK
echo "🚀 Deploying to AWS..."

# Variables
BUCKET_NAME="vet-chatbot-frontend"
DISTRIBUTION_ID=""
EC2_HOST=""
KEY_PATH="~/.ssh/your-key.pem"

# Build frontend
echo "📦 Building frontend..."
cd client
npm run build
cd ..

# Deploy frontend to S3
echo "☁️ Deploying frontend to S3..."
aws s3 sync client/build/ s3://$BUCKET_NAME --delete
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

# Deploy backend to EC2
echo "🖥️ Deploying backend to EC2..."
scp -i $KEY_PATH -r server/ ec2-user@$EC2_HOST:/home/ec2-user/app/
ssh -i $KEY_PATH ec2-user@$EC2_HOST << 'EOF'
cd /home/ec2-user/app
npm install --production
pm2 restart all || pm2 start index.js --name "vet-chatbot-api"
EOF

echo "✅ AWS deployment complete!"
echo "🌐 Frontend: https://$BUCKET_NAME.s3-website-us-east-1.amazonaws.com"
echo "🔧 Backend: http://$EC2_HOST:5001"