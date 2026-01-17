# 🚀 Deployment Guide

## Quick Deploy (Local)

```bash
./deploy.sh
```

## Docker Deployment

```bash
# Build and run
docker-compose up --build

# Production mode
docker-compose -f docker-compose.yml up --build -d
```

## Cloud Deployment Options

### 1. Vercel (Frontend) + Railway (Backend)

**Frontend (Vercel):**
```bash
npm install -g vercel
vercel --prod
```

**Backend (Railway):**
1. Connect GitHub repo to Railway
2. Set environment variables:
   - `MONGODB_URI`
   - `GEMINI_API_KEY`
   - `JWT_SECRET`

### 2. Netlify (Frontend) + Heroku (Backend)

**Frontend (Netlify):**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=client/build
```

**Backend (Heroku):**
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set GEMINI_API_KEY=your_gemini_key
git subtree push --prefix server heroku main
```

### 3. AWS (Full Stack)

**Frontend (S3 + CloudFront):**
```bash
aws s3 sync client/build/ s3://your-bucket-name
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

**Backend (EC2 + RDS):**
```bash
# Deploy to EC2 instance
scp -r server/ ec2-user@your-instance:/app
ssh ec2-user@your-instance "cd /app && npm install && pm2 start index.js"
```

## Environment Variables

### Backend (.env)
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/vet-chatbot
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
```

### Frontend (.env.production)
```
REACT_APP_API_URL=https://your-api-domain.com/api
REACT_APP_CHATBOT_TITLE=Veterinary Assistant
REACT_APP_ENVIRONMENT=production
```

## Post-Deployment

1. **Test API**: `curl https://your-api-domain.com/api/health`
2. **Test Frontend**: Visit your deployed URL
3. **Test Chatbot**: Click chat button and send message
4. **Monitor**: Check logs and performance

## Production Checklist

- [ ] Environment variables configured
- [ ] Database connected
- [ ] API endpoints working
- [ ] Chatbot functional
- [ ] SSL certificates installed
- [ ] Domain configured
- [ ] Monitoring setup
- [ ] Backup strategy implemented