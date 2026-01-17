const { GoogleGenerativeAI } = require('@google/generative-ai');

class AIService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' });
    
    this.systemPrompt = `You are a helpful veterinary assistant chatbot. Your role is to:

1. Answer ONLY veterinary-related questions about:
   - Pet care and health
   - Vaccination schedules
   - Diet and nutrition
   - Common pet illnesses
   - Preventive care
   - General pet wellness

2. If asked non-veterinary questions, politely decline and redirect to veterinary topics.

3. Always remind users that your advice is general information and they should consult a licensed veterinarian for specific medical concerns.

4. Be conversational, friendly, and helpful.

5. Keep responses concise but informative (under 200 words).

6. If a user wants to book an appointment, acknowledge their request and let them know you'll help them schedule it.

Remember: You provide general veterinary information only, not specific medical diagnoses or treatment recommendations.`;
  }

  async generateResponse(userMessage, conversationHistory = []) {
    try {
      // Build conversation context
      let prompt = this.systemPrompt + '\n\nConversation:\n';
      
      // Add recent conversation history (last 5 messages)
      const recentHistory = conversationHistory.slice(-5);
      recentHistory.forEach(msg => {
        prompt += `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
      });
      
      prompt += `User: ${userMessage}\nAssistant:`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  detectAppointmentIntent(message) {
    const appointmentKeywords = [
      'appointment', 'book', 'schedule', 'visit', 'consultation',
      'checkup', 'examination', 'see a vet', 'vet visit'
    ];
    
    const lowerMessage = message.toLowerCase();
    return appointmentKeywords.some(keyword => lowerMessage.includes(keyword));
  }

  async generateAppointmentResponse(appointmentData, missingFields) {
    if (missingFields.length === 0) {
      return `Perfect! Let me confirm your appointment details:
      
📋 **Appointment Summary**
• Pet Owner: ${appointmentData.petOwnerName}
• Pet Name: ${appointmentData.petName}
• Phone: ${appointmentData.phoneNumber}
• Date: ${new Date(appointmentData.preferredDate).toLocaleDateString()}
• Time: ${appointmentData.preferredTime}

Is this information correct? Reply "yes" to confirm or "no" to make changes.`;
    }

    const fieldPrompts = {
      petOwnerName: "What's your name (pet owner's name)?",
      petName: "What's your pet's name?",
      phoneNumber: "What's your phone number?",
      preferredDate: "What date would you prefer for the appointment? (Please use MM/DD/YYYY format)",
      preferredTime: "What time would work best for you? (Please use HH:MM format, e.g., 14:30)"
    };

    const nextField = missingFields[0];
    return fieldPrompts[nextField] || "I need some additional information to book your appointment.";
  }
}

module.exports = new AIService();