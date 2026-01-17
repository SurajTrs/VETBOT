const aiService = require('../services/aiService');
const conversationService = require('../services/conversationService');
const appointmentService = require('../services/appointmentService');

class ChatController {
  async sendMessage(req, res, next) {
    try {
      const { message, sessionId: providedSessionId, context } = req.body;
      
      // Generate or use provided session ID
      const sessionId = providedSessionId || conversationService.generateSessionId();
      
      // Create or get conversation
      const conversation = await conversationService.createOrGetConversation(sessionId, context);
      
      // Add user message to conversation
      await conversationService.addMessage(sessionId, 'user', message);
      
      // Get conversation history for context
      const history = await conversationService.getConversationHistory(sessionId);
      
      let botResponse;
      
      // Check if this is an appointment-related conversation
      const isAppointmentIntent = aiService.detectAppointmentIntent(message) || 
        history.some(msg => msg.type === 'bot' && msg.content.includes('appointment'));
      
      if (isAppointmentIntent) {
        // Handle appointment booking flow
        const appointmentData = appointmentService.parseAppointmentData(history);
        const missingFields = appointmentService.getMissingFields(appointmentData);
        
        if (missingFields.length === 0) {
          // All fields collected, create appointment
          try {
            const appointment = await appointmentService.createAppointment(sessionId, appointmentData);
            botResponse = `🎉 Great! Your appointment has been booked successfully!

📋 **Appointment Confirmation**
• Confirmation ID: ${appointment._id}
• Pet Owner: ${appointment.petOwnerName}
• Pet Name: ${appointment.petName}
• Date: ${new Date(appointment.preferredDate).toLocaleDateString()}
• Time: ${appointment.preferredTime}
• Status: ${appointment.status}

We'll contact you at ${appointment.phoneNumber} to confirm the details. Is there anything else I can help you with?`;
          } catch (error) {
            botResponse = `I'm sorry, there was an issue booking your appointment. ${error.message}. Please try again or contact us directly.`;
          }
        } else {
          // Generate response asking for missing information
          botResponse = await aiService.generateAppointmentResponse(appointmentData, missingFields);
        }
      } else {
        // Regular AI-powered veterinary Q&A
        botResponse = await aiService.generateResponse(message, history);
      }
      
      // Add bot response to conversation
      await conversationService.addMessage(sessionId, 'bot', botResponse);
      
      res.json({
        success: true,
        data: {
          sessionId,
          message: botResponse,
          timestamp: new Date().toISOString()
        }
      });
      
    } catch (error) {
      next(error);
    }
  }

  async getHistory(req, res, next) {
    try {
      const { sessionId } = req.params;
      
      if (!sessionId) {
        return res.status(400).json({
          error: 'Session ID is required'
        });
      }
      
      const history = await conversationService.getConversationHistory(sessionId);
      
      res.json({
        success: true,
        data: {
          sessionId,
          messages: history
        }
      });
      
    } catch (error) {
      next(error);
    }
  }

  async getActiveConversations(req, res, next) {
    try {
      const { limit = 50 } = req.query;
      const conversations = await conversationService.getActiveConversations(parseInt(limit));
      
      res.json({
        success: true,
        data: conversations
      });
      
    } catch (error) {
      next(error);
    }
  }

  async endConversation(req, res, next) {
    try {
      const { sessionId } = req.params;
      
      await conversationService.deactivateConversation(sessionId);
      
      res.json({
        success: true,
        message: 'Conversation ended successfully'
      });
      
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ChatController();