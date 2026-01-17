import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useChat } from '../hooks/useChat';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import LoadingIndicator from './LoadingIndicator';

const slideUp = keyframes`
  from {
    transform: translateY(100%) scale(0.8);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
  50% {
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
  }
  100% {
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
`;

const WidgetContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 10000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  
  @media (max-width: 768px) {
    bottom: 16px;
    right: 16px;
  }
`;

const ChatButton = styled.button`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  position: relative;
  
  &:hover {
    transform: scale(1.1);
    animation: ${pulse} 2s infinite;
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    width: 28px;
    height: 28px;
    fill: white;
    transition: transform 0.3s ease;
  }
  
  &.open svg {
    transform: rotate(45deg);
  }
  
  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const ChatWindow = styled.div`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 380px;
  height: 600px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: ${props => props.isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'};
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${props => props.isOpen ? slideUp : 'none'} 0.3s ease-out;
  
  @media (max-width: 480px) {
    width: calc(100vw - 32px);
    height: calc(100vh - 120px);
    bottom: 80px;
    right: 16px;
    border-radius: 12px;
  }
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 16px 16px 0 0;
  
  @media (max-width: 480px) {
    padding: 16px 20px;
    border-radius: 12px 12px 0 0;
  }
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  
  .status {
    width: 10px;
    height: 10px;
    background: #10b981;
    border-radius: 50%;
    animation: ${pulse} 2s infinite;
  }
  
  @media (max-width: 480px) {
    h3 {
      font-size: 16px;
    }
    
    .status {
      width: 8px;
      height: 8px;
    }
  }
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #fafbfc;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
  
  @media (max-width: 480px) {
    padding: 16px;
    gap: 12px;
  }
`;

const ErrorBanner = styled.div`
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #dc2626;
  padding: 16px 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-left: 4px solid #dc2626;
  
  button {
    background: none;
    border: none;
    color: #dc2626;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 4px;
    transition: background-color 0.2s;
    
    &:hover {
      background: rgba(220, 38, 38, 0.1);
    }
  }
`;

const NotificationDot = styled.div`
  position: absolute;
  top: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  background: #ef4444;
  border-radius: 50%;
  border: 2px solid white;
  animation: ${pulse} 2s infinite;
`;

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Get context from window if available (SDK mode)
  const context = window.VetChatbotConfig || {};
  
  const {
    messages,
    isLoading,
    error,
    isConnected,
    sendMessage,
    retryLastMessage
  } = useChat(context);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Show notification dot for new messages when closed
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setHasNewMessage(true);
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  const handleSendMessage = (message) => {
    sendMessage(message);
  };

  return (
    <WidgetContainer>
      <ChatWindow isOpen={isOpen}>
        <ChatHeader>
          <HeaderTitle>
            <div className="status" />
            <h3>🐾 Veterinary Assistant</h3>
          </HeaderTitle>
          <CloseButton onClick={toggleChat}>
            <svg viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </CloseButton>
        </ChatHeader>
        
        {error && (
          <ErrorBanner>
            <span>⚠️ {error}</span>
            <button onClick={retryLastMessage}>Retry</button>
          </ErrorBanner>
        )}
        
        <MessagesContainer>
          {messages.map((message, index) => (
            <ChatMessage
              key={`${index}-${message.timestamp}`}
              message={message}
              isBot={message.type === 'bot'}
            />
          ))}
          {isLoading && <LoadingIndicator />}
          <div ref={messagesEndRef} />
        </MessagesContainer>
        
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isLoading || !isConnected}
          placeholder={isConnected ? "Ask about pet care or book an appointment..." : "Connecting..."}
        />
      </ChatWindow>
      
      <ChatButton 
        onClick={toggleChat}
        className={isOpen ? 'open' : ''}
      >
        {hasNewMessage && !isOpen && <NotificationDot />}
        {isOpen ? (
          <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
        )}
      </ChatButton>
    </WidgetContainer>
  );
};

export default ChatbotWidget;