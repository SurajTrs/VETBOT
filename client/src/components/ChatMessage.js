import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isBot ? 'flex-start' : 'flex-end'};
  margin-bottom: 16px;
  animation: fadeIn 0.3s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MessageBubble = styled.div`
  max-width: 85%;
  padding: 14px 18px;
  border-radius: 20px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  position: relative;
  
  ${props => props.isBot ? `
    background: white;
    color: #374151;
    border-bottom-left-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border: 1px solid #e5e7eb;
  ` : `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-bottom-right-radius: 8px;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  `}
  
  ${props => props.isError && `
    background: #fee2e2;
    color: #dc2626;
    border: 1px solid #fecaca;
  `}
`;

const MessageTime = styled.div`
  font-size: 11px;
  color: #9ca3af;
  margin-top: 6px;
  margin-left: ${props => props.isBot ? '0' : 'auto'};
  margin-right: ${props => props.isBot ? 'auto' : '0'};
  opacity: 0.7;
`;

const BotAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  
  svg {
    width: 20px;
    height: 20px;
    fill: white;
  }
`;

const MessageContent = styled.div`
  white-space: pre-wrap;
  
  strong {
    font-weight: 600;
  }
  
  ul, ol {
    margin: 8px 0;
    padding-left: 20px;
  }
  
  li {
    margin: 4px 0;
  }
  
  p {
    margin: 8px 0;
  }
`;

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const ChatMessage = ({ message, isBot }) => {
  return (
    <MessageContainer isBot={isBot}>
      {isBot && (
        <BotAvatar>
          <svg viewBox="0 0 24 24">
            <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z"/>
          </svg>
        </BotAvatar>
      )}
      
      <MessageBubble isBot={isBot} isError={message.isError}>
        <MessageContent>{message.content}</MessageContent>
      </MessageBubble>
      
      <MessageTime isBot={isBot}>
        {formatTime(message.timestamp)}
      </MessageTime>
    </MessageContainer>
  );
};

export default ChatMessage;