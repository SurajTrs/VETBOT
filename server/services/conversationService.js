const Conversation = require('../models/Conversation');
const { v4: uuidv4 } = require('uuid');

class ConversationService {
  async createOrGetConversation(sessionId, context = {}) {
    try {
      let conversation = await Conversation.findOne({ sessionId });
      
      if (!conversation) {
        conversation = new Conversation({
          sessionId,
          context,
          messages: []
        });
        await conversation.save();
      }
      
      return conversation;
    } catch (error) {
      throw new Error(`Failed to create/get conversation: ${error.message}`);
    }
  }

  async addMessage(sessionId, type, content) {
    try {
      const conversation = await Conversation.findOne({ sessionId });
      
      if (!conversation) {
        throw new Error('Conversation not found');
      }

      conversation.messages.push({
        type,
        content,
        timestamp: new Date()
      });

      await conversation.save();
      return conversation;
    } catch (error) {
      throw new Error(`Failed to add message: ${error.message}`);
    }
  }

  async getConversationHistory(sessionId) {
    try {
      const conversation = await Conversation.findOne({ sessionId });
      return conversation ? conversation.messages : [];
    } catch (error) {
      throw new Error(`Failed to get conversation history: ${error.message}`);
    }
  }

  generateSessionId() {
    return uuidv4();
  }

  async getActiveConversations(limit = 50) {
    try {
      return await Conversation.find({ isActive: true })
        .sort({ updatedAt: -1 })
        .limit(limit)
        .select('sessionId context createdAt updatedAt');
    } catch (error) {
      throw new Error(`Failed to get active conversations: ${error.message}`);
    }
  }

  async deactivateConversation(sessionId) {
    try {
      await Conversation.findOneAndUpdate(
        { sessionId },
        { isActive: false }
      );
    } catch (error) {
      throw new Error(`Failed to deactivate conversation: ${error.message}`);
    }
  }
}

module.exports = new ConversationService();