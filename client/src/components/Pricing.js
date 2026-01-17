import React from 'react';
import styled from 'styled-components';

const PricingContainer = styled.section`
  padding: 100px 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PricingTitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  color: white;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const PricingSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-bottom: 60px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  margin-top: 60px;
`;

const PricingCard = styled.div`
  background: ${props => props.popular ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)'};
  backdrop-filter: blur(20px);
  border: ${props => props.popular ? '2px solid #10b981' : '1px solid rgba(255, 255, 255, 0.2)'};
  border-radius: 24px;
  padding: 40px 32px;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const PopularBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 8px 24px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
`;

const PlanName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
`;

const PlanPrice = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 8px;
  
  span {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
  }
`;

const PlanDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 32px;
  line-height: 1.6;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
`;

const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 12px;
  
  &::before {
    content: '✓';
    color: #10b981;
    font-weight: bold;
    font-size: 16px;
  }
`;

const PlanButton = styled.button`
  width: 100%;
  background: ${props => props.popular ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  border: ${props => props.popular ? 'none' : '1px solid rgba(255, 255, 255, 0.3)'};
  padding: 16px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    background: ${props => props.popular ? 'linear-gradient(135deg, #059669, #047857)' : 'rgba(255, 255, 255, 0.2)'};
  }
`;

const Pricing = ({ onPricingAction }) => {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for small veterinary practices',
      features: [
        'Up to 1,000 conversations/month',
        'Basic AI responses',
        'Appointment booking',
        'Email support',
        'Basic analytics'
      ]
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      description: 'Ideal for growing practices',
      popular: true,
      features: [
        'Up to 10,000 conversations/month',
        'Advanced AI with context',
        'Priority appointment booking',
        'Phone & email support',
        'Advanced analytics',
        'Custom branding',
        'API access'
      ]
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large veterinary networks',
      features: [
        'Unlimited conversations',
        'Custom AI training',
        'Multi-location support',
        'Dedicated support manager',
        'Custom integrations',
        'White-label solution',
        'SLA guarantee'
      ]
    }
  ];

  return (
    <PricingContainer id="pricing">
      <PricingTitle>Simple, Transparent Pricing</PricingTitle>
      <PricingSubtitle>
        Choose the perfect plan for your veterinary practice. 
        All plans include our core AI features and 24/7 uptime.
      </PricingSubtitle>
      
      <PricingGrid>
        {plans.map((plan, index) => (
          <PricingCard key={index} popular={plan.popular}>
            {plan.popular && <PopularBadge>Most Popular</PopularBadge>}
            
            <PlanName>{plan.name}</PlanName>
            <PlanPrice>
              {plan.price}
              {plan.period && <span>{plan.period}</span>}
            </PlanPrice>
            <PlanDescription>{plan.description}</PlanDescription>
            
            <FeatureList>
              {plan.features.map((feature, idx) => (
                <Feature key={idx}>{feature}</Feature>
              ))}
            </FeatureList>
            
            <PlanButton 
              popular={plan.popular}
              onClick={() => onPricingAction && onPricingAction(plan.name)}
            >
              {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
            </PlanButton>
          </PricingCard>
        ))}
      </PricingGrid>
    </PricingContainer>
  );
};

export default Pricing;