# 🚀 AWS Deployment Guide

## Prerequisites
- AWS CLI configured
- EC2 Key Pair created
- Domain name (optional)

## 1. Deploy Infrastructure

```bash
# Create CloudFormation stack
aws cloudformation create-stack \
  --stack-name vet-chatbot-infrastructure \
  --template-body file://aws-infrastructure.yml \
  --parameters ParameterKey=KeyPairName,ParameterValue=your-key-pair \
  --capabilities CAPABILITY_IAM

# Wait for completion
aws cloudformation wait stack-create-complete \
  --stack-name vet-chatbot-infrastructure
```

## 2. Get Stack Outputs

```bash
aws cloudformation describe-stacks \
  --stack-name vet-chatbot-infrastructure \
  --query 'Stacks[0].Outputs'
```

## 3. Deploy Application

```bash
# Update deploy-aws.sh with your values
BUCKET_NAME="your-bucket-name"
EC2_HOST="your-ec2-ip"
DISTRIBUTION_ID="your-cloudfront-id"

# Run deployment
chmod +x deploy-aws.sh
./deploy-aws.sh
```

## 4. Configure Environment

**Backend (.env on EC2):**
```bash
ssh -i ~/.ssh/your-key.pem ec2-user@your-ec2-ip
cd /home/ec2-user/app
cat > .env << EOF
PORT=5001
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/vet-chatbot
GEMINI_API_KEY=AIzaSyBzC8JUn-O45zeHS4wqPLa6xZlZKKM1gaM
JWT_SECRET=your_jwt_secret
NODE_ENV=production
CORS_ORIGIN=https://your-cloudfront-domain.com
EOF
```

## 5. Start Services

```bash
# On EC2 instance
pm2 start index.js --name "vet-chatbot-api"
pm2 startup
pm2 save
```

## 6. Custom Domain (Optional)

```bash
# Create Route 53 hosted zone
aws route53 create-hosted-zone --name yourdomain.com --caller-reference $(date +%s)

# Create SSL certificate
aws acm request-certificate --domain-name yourdomain.com --validation-method DNS
```

## Architecture

```
Internet → CloudFront → S3 (Frontend)
Internet → ALB → EC2 (Backend) → MongoDB Atlas
```

## Costs (Estimated)
- EC2 t3.micro: ~$8/month
- S3 + CloudFront: ~$1-5/month
- Data transfer: ~$1-10/month
- **Total: ~$10-25/month**

## Monitoring

```bash
# CloudWatch logs
aws logs describe-log-groups
aws logs tail /aws/ec2/vet-chatbot --follow
```