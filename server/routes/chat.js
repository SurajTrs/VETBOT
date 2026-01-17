const express = require('express');
const chatController = require('../controllers/chatController');
const { chatMessageValidation, validateRequest } = require('../middleware/validation');

const router = express.Router();

// Send chat message
router.post('/message', chatMessageValidation, validateRequest, chatController.sendMessage);

// Get conversation history
router.get('/history/:sessionId', chatController.getHistory);

// Get active conversations (admin endpoint)
router.get('/conversations', chatController.getActiveConversations);

// End conversation
router.delete('/conversation/:sessionId', chatController.endConversation);

module.exports = router;