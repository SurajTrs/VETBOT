# 🐾 Veterinary Chatbot SDK - Production Ready

A complete, production-level veterinary chatbot SDK built with the MERN stack, featuring AI-powered conversations and appointment booking.

## 📁 Project Structure

```
veterinary-chatbot-sdk/
├── 📄 README.md                    # Comprehensive documentation
├── 📄 package.json                 # Root package configuration
├── 📄 docker-compose.yml           # Docker orchestration
├── 📄 .env.example                 # Environment template
├── 📄 .gitignore                   # Git ignore rules
├── 📄 setup.sh                     # Automated setup script
├── 📄 mongo-init.js                # MongoDB initialization
│
├── 📁 server/                      # Node.js Backend
│   ├── 📄 package.json             # Server dependencies
│   ├── 📄 index.js                 # Main server entry
│   ├── 📄 Dockerfile               # Server container config
│   ├── 📄 healthcheck.js           # Health check script
│   ├── 📄 .env.example             # Server environment template
│   │
│   ├── 📁 config/
│   │   └── 📄 database.js          # MongoDB connection
│   │
│   ├── 📁 controllers/
│   │   ├── 📄 chatController.js    # Chat message handling
│   │   ├── 📄 appointmentController.js # Appointment management
│   │   └── 📄 healthController.js  # Health check endpoints
│   │
│   ├── 📁 models/
│   │   ├── 📄 Conversation.js      # Chat conversation schema
│   │   └── 📄 Appointment.js       # Appointment schema
│   │
│   ├── 📁 services/
│   │   ├── 📄 aiService.js         # Google Gemini AI integration
│   │   ├── 📄 conversationService.js # Chat business logic
│   │   └── 📄 appointmentService.js # Appointment business logic
│   │
│   ├── 📁 middleware/
│   │   ├── 📄 errorHandler.js      # Global error handling
│   │   └── 📄 validation.js        # Input validation
│   │
│   ├── 📁 routes/
│   │   ├── 📄 chat.js              # Chat API routes
│   │   ├── 📄 appointments.js      # Appointment API routes
│   │   └── 📄 health.js            # Health check routes
│   │
│   └── 📁 tests/
│       └── 📄 api.test.js          # API endpoint tests
│
├── 📁 client/                      # React Frontend
│   ├── 📄 package.json             # Client dependencies
│   ├── 📄 Dockerfile               # Client container config
│   ├── 📄 nginx.conf               # Nginx configuration
│   ├── 📄 .env.example             # Client environment template
│   │
│   ├── 📁 public/
│   │   └── 📄 index.html           # HTML template
│   │
│   ├── 📁 src/
│   │   ├── 📄 App.js               # Main React component
│   │   ├── 📄 App.css              # Application styles
│   │   ├── 📄 index.js             # React entry point
│   │   │
│   │   ├── 📁 components/
│   │   │   ├── 📄 ChatbotWidget.js # Main chatbot widget
│   │   │   ├── 📄 ChatMessage.js   # Message component
│   │   │   ├── 📄 ChatInput.js     # Input component
│   │   │   └── 📄 LoadingIndicator.js # Loading animation
│   │   │
│   │   ├── 📁 services/
│   │   │   └── 📄 apiService.js    # API communication
│   │   │
│   │   └── 📁 hooks/
│   │       └── 📄 useChat.js       # Chat functionality hook
│   │
│   └── 📁 scripts/
│       └── 📄 build-sdk.js         # SDK build script
│
└── 📁 public/                      # Static Assets & SDK
    ├── 📄 chatbot.js               # Embeddable SDK script
    └── 📄 demo.html                # Integration demo page
```

## 🚀 Quick Start

### 1. Automated Setup
```bash
./setup.sh
```

### 2. Manual Setup
```bash
# Install dependencies
npm run install:all

# Configure environment
cp server/.env.example server/.env
cp client/.env.example client/.env
# Edit .env files with your values

# Start development
npm run dev
```

### 3. Docker Deployment
```bash
# Configure environment
cp .env.example .env
# Edit .env with production values

# Deploy with Docker
docker-compose up --build
```

## 🔧 Configuration

### Required Environment Variables

**Server (.env)**
```env
MONGODB_URI=mongodb://localhost:27017/vet-chatbot
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**Client (.env)**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_CHATBOT_TITLE=Veterinary Assistant
```

## 📦 SDK Integration

### Basic Integration
```html
<script src="https://your-domain.com/chatbot.js"></script>
```

### Advanced Integration
```html
<script>
window.VetChatbotConfig = {
  userId: "user_123",
  userName: "John Doe",
  petName: "Buddy",
  source: "marketing-website"
};
</script>
<script src="https://your-domain.com/chatbot.js"></script>
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat/message` | Send chat message |
| GET | `/api/chat/history/:sessionId` | Get conversation history |
| POST | `/api/appointments` | Create appointment |
| GET | `/api/appointments/session/:sessionId` | Get appointments by session |
| GET | `/api/appointments` | Get all appointments (admin) |
| PATCH | `/api/appointments/:id/status` | Update appointment status |
| GET | `/api/health` | Health check |
| GET | `/api/health/ready` | Readiness check |

## 🎯 Features

### ✅ Core Features
- **AI-Powered Q&A**: Google Gemini integration for veterinary questions
- **Appointment Booking**: Conversational flow for scheduling appointments
- **SDK Integration**: Easy website embedding with single script tag
- **Context Awareness**: Optional user context support
- **Mobile Responsive**: Works on all devices
- **Real-time Chat**: Instant messaging with typing indicators
- **Error Handling**: Comprehensive error management and recovery
- **Data Persistence**: MongoDB storage for conversations and appointments

### ✅ Production Features
- **Security**: Helmet, CORS, rate limiting, input validation
- **Monitoring**: Health checks, logging, error tracking
- **Scalability**: Horizontal scaling ready, stateless design
- **Performance**: Compression, caching, optimized queries
- **Testing**: Unit tests for API endpoints
- **Docker**: Complete containerization setup
- **Documentation**: Comprehensive API and integration docs

### ✅ Technical Excellence
- **Clean Architecture**: MVC pattern, service layer, separation of concerns
- **Code Quality**: ESLint, consistent naming, minimal duplication
- **Error Handling**: Graceful degradation, user-friendly messages
- **Validation**: Input sanitization, data validation, type checking
- **Environment Management**: Proper configuration management
- **Database Design**: Optimized schemas, indexes, validation

## 🧪 Testing

```bash
# Run server tests
cd server && npm test

# Run client tests
cd client && npm test
```

## 📊 Monitoring

- **Health Check**: `GET /api/health`
- **Readiness Check**: `GET /api/health/ready`
- **Metrics**: Built-in performance monitoring
- **Logging**: Structured logging with Morgan

## 🔒 Security

- **Input Validation**: Express-validator for all inputs
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers and protection
- **Environment Variables**: Secure configuration management
- **Data Sanitization**: MongoDB injection prevention

## 🚀 Deployment Options

### 1. Docker (Recommended)
- Complete containerized setup
- MongoDB, Server, and Client containers
- Production-ready configuration
- Easy scaling and management

### 2. Traditional Hosting
- Deploy server to any Node.js hosting
- Deploy client to any static hosting
- Use MongoDB Atlas for database

### 3. Cloud Platforms
- AWS: ECS, Lambda, RDS
- Google Cloud: Cloud Run, Cloud SQL
- Azure: Container Instances, Cosmos DB

## 📈 Performance

- **Response Time**: < 200ms for API calls
- **Bundle Size**: Optimized SDK < 100KB
- **Database**: Indexed queries, connection pooling
- **Caching**: Static asset caching, API response caching
- **CDN Ready**: Static assets optimized for CDN delivery

## 🔮 Future Enhancements

- [ ] Admin dashboard for appointment management
- [ ] Real-time notifications with WebSockets
- [ ] Multi-language support
- [ ] Voice message support
- [ ] Integration with calendar systems
- [ ] Payment processing
- [ ] Advanced analytics and reporting
- [ ] Veterinarian availability checking
- [ ] SMS/Email notifications
- [ ] Advanced NLP for better appointment parsing

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

---

**Built with ❤️ for the veterinary community**