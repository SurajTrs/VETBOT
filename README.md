# Veterinary Chatbot SDK

A production-level, embeddable chatbot SDK for veterinary services with AI-powered Q&A and appointment booking capabilities.

## 🏗️ Architecture Overview

```
├── server/                 # Node.js + Express Backend
│   ├── controllers/        # Route handlers
│   ├── models/            # MongoDB schemas
│   ├── services/          # Business logic
│   ├── middleware/        # Custom middleware
│   ├── routes/            # API routes
│   └── utils/             # Utility functions
├── client/                # React Frontend (Chatbot UI)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   ├── hooks/         # Custom hooks
│   │   └── utils/         # Utility functions
└── public/                # Static files & SDK script
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd veterinary-chatbot-sdk
```

2. Install dependencies:
```bash
npm run install:all
```

3. Environment Setup:
```bash
# Copy environment files
cp server/.env.example server/.env
cp client/.env.example client/.env
```

4. Configure environment variables in `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vet-chatbot
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

5. Start development servers:
```bash
npm run dev
```

## 📦 SDK Integration

### Basic Integration
```html
<script src="https://your-domain.com/chatbot.js"></script>
```

### Advanced Integration with Context
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

## 🔧 API Endpoints

### Chat Endpoints
- `POST /api/chat/message` - Send chat message
- `GET /api/chat/history/:sessionId` - Get chat history

### Appointment Endpoints
- `POST /api/appointments` - Create appointment
- `GET /api/appointments/:sessionId` - Get appointments by session

### Health Check
- `GET /api/health` - Service health status

## 🎯 Key Features

- **AI-Powered Q&A**: Google Gemini integration for veterinary questions
- **Appointment Booking**: Conversational flow for scheduling
- **SDK Integration**: Easy website embedding
- **Context Awareness**: Optional user context support
- **Data Persistence**: MongoDB storage for conversations and appointments
- **Error Handling**: Comprehensive error management
- **Responsive UI**: Mobile-friendly chatbot interface

## 🏛️ Design Decisions

### Architecture Patterns
- **MVC Pattern**: Clear separation of concerns
- **Service Layer**: Business logic abstraction
- **Repository Pattern**: Data access abstraction
- **Middleware Chain**: Request processing pipeline

### Technology Choices
- **React**: Component-based UI with hooks
- **Express**: Lightweight, flexible backend framework
- **MongoDB**: Document-based storage for flexible data models
- **Google Gemini**: Advanced AI capabilities for natural conversations

### Security Considerations
- Input validation and sanitization
- Rate limiting for API endpoints
- CORS configuration
- Environment variable protection
- Session management

## 🔮 Future Improvements

- [ ] Admin dashboard for appointment management
- [ ] Real-time notifications
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Voice message support
- [ ] Integration with calendar systems
- [ ] Payment processing
- [ ] Veterinarian availability checking

## 🧪 Testing

```bash
# Run server tests
cd server && npm test

# Run client tests
cd client && npm test
```

## 🐳 Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 📝 Assumptions

1. **Appointment Scheduling**: Simple date/time selection without real-time availability checking
2. **AI Responses**: Generic veterinary advice only, no specific medical diagnoses
3. **User Authentication**: Session-based identification, no complex user management
4. **Data Validation**: Basic validation sufficient for MVP
5. **Scalability**: Designed for horizontal scaling with load balancers

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.