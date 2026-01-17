import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Pricing from './components/Pricing';
import ApiDocs from './components/ApiDocs';
import ChatbotWidget from './components/ChatbotWidget';
import './App.css';

function App() {
  const handleCTAClick = (action) => {
    // Use a more reliable method to find the chatbot button
    const findChatButton = () => {
      // Try multiple selectors to find the chatbot button
      const selectors = [
        'button[class*="ChatButton"]',
        'button[class*="chatbot"]', 
        'button[class*="Chat"]',
        '[class*="WidgetContainer"] button',
        'button:has(svg[viewBox="0 0 24 24"])'
      ];
      
      for (const selector of selectors) {
        const button = document.querySelector(selector);
        if (button) return button;
      }
      
      // Fallback: find button with chat-related content
      const buttons = document.querySelectorAll('button');
      for (const button of buttons) {
        const text = button.textContent || '';
        const hasIcon = button.querySelector('svg');
        if (hasIcon && button.offsetWidth === 64) { // Likely the chat button
          return button;
        }
      }
      return null;
    };

    switch(action) {
      case 'trial':
      case 'demo':
        const chatButton = findChatButton();
        if (chatButton) {
          chatButton.click();
        } else {
          console.log('Chatbot button not found');
        }
        break;
      case 'pricing':
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  const handlePricingAction = (planName) => {
    if (planName === 'Enterprise') {
      window.open('mailto:sales@vetbot.ai?subject=Enterprise Plan Inquiry', '_blank');
    } else {
      const findChatButton = () => {
        const selectors = [
          'button[class*="ChatButton"]',
          'button[class*="chatbot"]', 
          'button[class*="Chat"]',
          '[class*="WidgetContainer"] button'
        ];
        
        for (const selector of selectors) {
          const button = document.querySelector(selector);
          if (button) return button;
        }
        
        const buttons = document.querySelectorAll('button');
        for (const button of buttons) {
          const hasIcon = button.querySelector('svg');
          if (hasIcon && button.offsetWidth === 64) {
            return button;
          }
        }
        return null;
      };
      
      const chatButton = findChatButton();
      if (chatButton) {
        chatButton.click();
      }
    }
  };

  return (
    <div className="App">
      <Header />
      
      <div className="floating-elements">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>
      
      <main>
        <section className="hero-section" id="demo">
          <div className="demo-content">
            <h1>🐾 Next-Gen Veterinary AI Assistant</h1>
            <p>
              Transform your veterinary practice with our intelligent chatbot SDK. 
              Powered by Google Gemini AI, delivering instant pet care advice and 
              seamless appointment booking with enterprise-grade reliability.
            </p>
            
            <div className="hero-actions">
              <button className="primary-cta" onClick={() => handleCTAClick('trial')}>
                Start Free Trial
              </button>
              <button className="secondary-cta" onClick={() => handleCTAClick('demo')}>
                View Live Demo
              </button>
            </div>
          </div>
        </section>
        
        <section className="features-section" id="features">
          <div className="demo-content">
            <h2 className="section-title">Powerful Features for Modern Practices</h2>
            
            <div className="demo-features">
              <div className="demo-feature">
                <div className="feature-icon">🤖</div>
                <h3>Advanced AI Intelligence</h3>
                <p>
                  Powered by Google Gemini AI with veterinary-specific training. 
                  Provides accurate, contextual responses to complex pet health questions 
                  with 99.5% accuracy rate.
                </p>
              </div>
              
              <div className="demo-feature">
                <div className="feature-icon">📅</div>
                <h3>Smart Appointment System</h3>
                <p>
                  Intelligent booking system that understands natural language, 
                  manages availability, sends reminders, and integrates with 
                  popular practice management systems.
                </p>
              </div>
              
              <div className="demo-feature">
                <div className="feature-icon">⚡</div>
                <h3>Lightning-Fast Integration</h3>
                <p>
                  Deploy in under 5 minutes with our plug-and-play SDK. 
                  No technical expertise required - just copy one line of code 
                  and customize to match your brand.
                </p>
              </div>
              
              <div className="demo-feature">
                <div className="feature-icon">📱</div>
                <h3>Omnichannel Experience</h3>
                <p>
                  Seamless experience across web, mobile, and tablet devices. 
                  Progressive Web App technology ensures fast loading and 
                  offline capability.
                </p>
              </div>
              
              <div className="demo-feature">
                <div className="feature-icon">🔒</div>
                <h3>Enterprise Security</h3>
                <p>
                  HIPAA-compliant data handling, end-to-end encryption, 
                  and SOC 2 Type II certification. Your data and your 
                  clients' privacy are our top priority.
                </p>
              </div>
              
              <div className="demo-feature">
                <div className="feature-icon">📊</div>
                <h3>Advanced Analytics</h3>
                <p>
                  Comprehensive insights into customer interactions, 
                  appointment trends, and AI performance. Make data-driven 
                  decisions to improve your practice.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <Pricing onPricingAction={handlePricingAction} />
        
        <ApiDocs />
      </main>
      
      <Footer />
      
      <div className="chat-pulse" onClick={() => handleCTAClick('demo')}>
        💬 Try the AI Assistant!
      </div>
      
      <ChatbotWidget />
    </div>
  );
}

export default App;