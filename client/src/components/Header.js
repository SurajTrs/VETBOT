import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
  backdrop-filter: blur(20px);
  border-bottom: ${props => props.scrolled ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'};
  transition: all 0.3s ease;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: 800;
  color: ${props => props.scrolled ? '#1f2937' : 'white'};
  text-shadow: ${props => props.scrolled ? 'none' : '0 2px 10px rgba(0, 0, 0, 0.3)'};
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${props => props.scrolled ? '#6b7280' : 'rgba(255, 255, 255, 0.9)'};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.scrolled ? '#667eea' : 'white'};
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCTAClick = () => {
    // Open chatbot
    const chatButton = document.querySelector('.vet-chatbot-button');
    if (chatButton) {
      chatButton.click();
    } else {
      // Fallback to scroll to demo
      scrollToSection('demo');
    }
  };

  return (
    <HeaderContainer scrolled={scrolled}>
      <Nav>
        <Logo scrolled={scrolled}>
          🐾 VetBot SDK
        </Logo>
        
        <NavLinks>
          <NavLink scrolled={scrolled} onClick={() => scrollToSection('features')}>
            Features
          </NavLink>
          <NavLink scrolled={scrolled} onClick={() => scrollToSection('integration')}>
            Integration
          </NavLink>
          <NavLink scrolled={scrolled} onClick={() => scrollToSection('pricing')}>
            Pricing
          </NavLink>
          <NavLink scrolled={scrolled} onClick={() => scrollToSection('docs')}>
            API Docs
          </NavLink>
        </NavLinks>
        
        <CTAButton onClick={() => {
          const buttons = document.querySelectorAll('button');
          for (const button of buttons) {
            const hasIcon = button.querySelector('svg');
            if (hasIcon && button.offsetWidth === 64) {
              button.click();
              break;
            }
          }
        }}>
          Try Demo
        </CTAButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;