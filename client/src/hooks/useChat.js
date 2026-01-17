import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import apiService from '../services/apiService';

export const useChat = (initialContext = {}) => {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Initialize session
  useEffect(() => {
    const initSession = () => {
      const newSessionId = uuidv4();
      setSessionId(newSessionId);
      
      // Add welcome message
      const welcomeMessage = {
        type: 'bot',
        content: `Hello! 👋 I'm your veterinary assistant. I can help you with:

🐾 Pet care questions
💉 Vaccination information  
🥗 Diet and nutrition advice
🏥 Booking veterinary appointments

How can I help you today?`,
        timestamp: new Date().toISOString()
      };
      
      setMessages([welcomeMessage]);
      setIsConnected(true);
    };

    initSession();
  }, []);

  const sendMessage = useCallback(async (messageContent) => {
    if (!messageContent.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    // Add user message immediately
    const userMessage = {
      type: 'user',
      content: messageContent.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await apiService.sendMessage(
        messageContent.trim(),
        sessionId,
        initialContext
      );

      // Add bot response
      const botMessage = {
        type: 'bot',
        content: response.message,
        timestamp: response.timestamp
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setError(err.message);
      
      // Add error message
      const errorMessage = {
        type: 'bot',
        content: 'I apologize, but I encountered an error. Please try again or contact support if the problem persists.',
        timestamp: new Date().toISOString(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, initialContext, isLoading]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
  }, []);

  const retryLastMessage = useCallback(() => {
    if (messages.length >= 2) {
      const lastUserMessage = messages
        .slice()
        .reverse()
        .find(msg => msg.type === 'user');
      
      if (lastUserMessage) {
        // Remove the last bot message (which was likely an error)
        setMessages(prev => prev.filter((_, index) => index !== prev.length - 1));
        sendMessage(lastUserMessage.content);
      }
    }
  }, [messages, sendMessage]);

  return {
    messages,
    sessionId,
    isLoading,
    error,
    isConnected,
    sendMessage,
    clearChat,
    retryLastMessage
  };
};