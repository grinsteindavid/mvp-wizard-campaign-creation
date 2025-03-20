import React from 'react';
import styled from 'styled-components';
import { useWizard } from '../../contexts/WizardContext';
import { trafficSourceNames } from '../../contexts/TrafficSourceFactory';
import DynamicForm from '../FormComponents/DynamicForm';

// Styled components for navigation buttons
const BackButton = styled.button`
  background-color: #f1f1f1;
  color: #333;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  margin-right: 10px;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const StepContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 24px;
  color: #333;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#4285f4' : '#f5f5f5'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.primary ? '#3367d6' : '#e0e0e0'};
  }
`;

const CampaignFormStep = ({ trafficSourceContext }) => {
  const { trafficSource, campaignData, updateCampaignData, prevStep, nextStep } = useWizard();
  
  // Access the traffic source context that was passed via props from the parent
  // This means we're only initializing the hooks for the selected traffic source
  const currentSource = trafficSourceContext;
  
  // Verify that we have the expected traffic source
  const isContextValid = !!currentSource && typeof currentSource === 'object';
  
  // Log for debugging purposes
  console.log('CampaignFormStep context check:', {
    source: trafficSource,
    hasContext: isContextValid,
    contextType: typeof currentSource,
    contextKeys: isContextValid ? Object.keys(currentSource) : 'none'
  });

  const handleFormChange = (newData) => {
    updateCampaignData(newData);
  };

  // If the required context is missing or invalid, show an error message
  if (!isContextValid) {
    console.error('Traffic source context issue:', { 
      trafficSource, 
      hasContext: !!trafficSourceContext,
      contextType: typeof trafficSourceContext
    });
    
    return (
      <StepContainer>
        <Title>Error</Title>
        <div>
          <p>Traffic source context not available: {trafficSource}</p>
          <p>Please go back and select a traffic source to continue.</p>
          <div style={{ marginTop: '20px' }}>
            <BackButton onClick={prevStep}>Back to Source Selection</BackButton>
          </div>
        </div>
      </StepContainer>
    );
  }
  
  return (
    <StepContainer>
      <Title>Configure {trafficSourceNames[trafficSource]} Campaign</Title>
      
      <DynamicForm
        fields={currentSource.fields}
        values={campaignData}
        onChange={handleFormChange}
        errors={{}}
      />
      
      <ButtonContainer>
        <Button onClick={prevStep}>
          Back
        </Button>
        <Button primary onClick={nextStep}>
          Review Campaign
        </Button>
      </ButtonContainer>
    </StepContainer>
  );
};

export default CampaignFormStep;
