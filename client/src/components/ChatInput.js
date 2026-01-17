import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  padding: 20px 24px;
  border-top: 1px solid #e5e7eb;
  background: white;
  border-radius: 0 0 16px 16px;
  
  @media (max-width: 480px) {
    padding: 16px 20px;
    border-radius: 0 0 12px 12px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  background: #f9fafb;
  border: 2px solid ${props => props.focused ? '#667eea' : '#e5e7eb'};
  border-radius: 24px;
  padding: 12px 16px;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.focused ? '#667eea' : '#d1d5db'};
  }
`;

const TextInput = styled.textarea`
  flex: 1;
  border: none;
  background: none;
  outline: none;
  resize: none;
  font-size: 14px;
  line-height: 1.5;
  max-height: 120px;
  min-height: 22px;
  font-family: inherit;
  color: #374151;
  
  &::placeholder {
    color: #9ca3af;
  }
  
  &:disabled {
    color: #9ca3af;
    cursor: not-allowed;
  }
`;

const SendButton = styled.button`
  background: ${props => props.disabled ? '#e5e7eb' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
  
  &:active:not(:disabled) {
    transform: scale(0.95);
  }
  
  svg {
    width: 20px;
    height: 20px;
    fill: ${props => props.disabled ? '#9ca3af' : 'white'};
    transition: transform 0.2s ease;
  }
  
  &:hover:not(:disabled) svg {
    transform: translateX(1px);
  }
`;

const CharacterCount = styled.div`
  font-size: 11px;
  color: ${props => props.isNearLimit ? '#dc2626' : '#9ca3af'};
  text-align: right;
  margin-top: 8px;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.2s ease;
`;

const QuickActions = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

const QuickAction = styled.button`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 6px 12px;
  font-size: 12px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f9fafb;
    border-color: #667eea;
    color: #667eea;
  }
`;

const ChatInput = ({ onSendMessage, disabled, placeholder = "Type your message..." }) => {
  const [message, setMessage] = useState('');
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef(null);
  const maxLength = 2000;

  const quickActions = [
    "How often should I feed my puppy?",
    "Book an appointment",
    "Vaccination schedule",
    "Pet nutrition advice"
  ];

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setMessage(e.target.value);
    }
  };

  const handleQuickAction = (action) => {
    if (!disabled) {
      onSendMessage(action);
    }
  };

  const canSend = message.trim().length > 0 && !disabled;
  const isNearLimit = message.length > maxLength * 0.9;
  const showCharCount = message.length > maxLength * 0.7;

  return (
    <InputContainer>
      {message.length === 0 && (
        <QuickActions>
          {quickActions.map((action, index) => (
            <QuickAction
              key={index}
              onClick={() => handleQuickAction(action)}
              disabled={disabled}
            >
              {action}
            </QuickAction>
          ))}
        </QuickActions>
      )}
      
      <form onSubmit={handleSubmit}>
        <InputWrapper focused={focused}>
          <TextInput
            ref={textareaRef}
            value={message}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
          />
          <SendButton type="submit" disabled={!canSend}>
            <svg viewBox="0 0 24 24">
              <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
            </svg>
          </SendButton>
        </InputWrapper>
      </form>
      
      <CharacterCount isNearLimit={isNearLimit} show={showCharCount}>
        {message.length}/{maxLength}
      </CharacterCount>
    </InputContainer>
  );
};

export default ChatInput;