import React from 'react';
import styled from 'styled-components';

const DocsContainer = styled.section`
  padding: 100px 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const DocsTitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  color: white;
  text-align: center;
  margin-bottom: 60px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const DocsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
`;

const DocCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 32px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const DocIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const DocTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
`;

const DocDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 24px;
  line-height: 1.6;
`;

const DocButton = styled.button`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }
`;

const ApiDocs = () => {
  const docs = [
    {
      icon: '📚',
      title: 'Getting Started',
      description: 'Quick start guide to integrate the chatbot SDK into your website in under 5 minutes.',
      action: () => window.open('https://docs.vetbot.ai/getting-started', '_blank')
    },
    {
      icon: '🔧',
      title: 'API Reference',
      description: 'Complete API documentation with endpoints, parameters, and response examples.',
      action: () => window.open('https://docs.vetbot.ai/api', '_blank')
    },
    {
      icon: '🎨',
      title: 'Customization',
      description: 'Learn how to customize the chatbot appearance and behavior to match your brand.',
      action: () => window.open('https://docs.vetbot.ai/customization', '_blank')
    },
    {
      icon: '🔌',
      title: 'Integrations',
      description: 'Connect with popular practice management systems and third-party tools.',
      action: () => window.open('https://docs.vetbot.ai/integrations', '_blank')
    }
  ];

  return (
    <DocsContainer id="docs">
      <DocsTitle>Developer Resources</DocsTitle>
      
      <DocsGrid>
        {docs.map((doc, index) => (
          <DocCard key={index}>
            <DocIcon>{doc.icon}</DocIcon>
            <DocTitle>{doc.title}</DocTitle>
            <DocDescription>{doc.description}</DocDescription>
            <DocButton onClick={doc.action}>
              View Documentation
            </DocButton>
          </DocCard>
        ))}
      </DocsGrid>
    </DocsContainer>
  );
};

export default ApiDocs;