import React from 'react';
import styled from 'styled-components';
import { useWizard } from '../../contexts/WizardContext';
import { useGoogleTrafficSource } from '../../contexts/GoogleTrafficSourceContext';
import { useRevContentTrafficSource } from '../../contexts/RevContentTrafficSourceContext';
import { useYahooTrafficSource } from '../../contexts/YahooTrafficSourceContext';
import { trafficSourceNames } from '../../contexts/TrafficSourceFactory';
import DynamicForm from '../FormComponents/DynamicForm';

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

const CampaignFormStep = () => {
  const { trafficSource, campaignData, updateCampaignData, prevStep, nextStep } = useWizard();
  
  // Use the appropriate traffic source hook based on the selected source
  const googleSource = useGoogleTrafficSource();
  const revContentSource = useRevContentTrafficSource();
  const yahooSource = useYahooTrafficSource();
  
  // Determine which traffic source context to use
  let currentSource;
  switch (trafficSource) {
    case 'google':
      currentSource = googleSource;
      break;
    case 'revcontent':
      currentSource = revContentSource;
      break;
    case 'yahoo':
      currentSource = yahooSource;
      break;
    default:
      return <div>Invalid traffic source selected</div>;
  }
  
  if (!currentSource) {
    return <div>Traffic source context not available</div>;
  }

  const handleFormChange = (newData) => {
    updateCampaignData(newData);
  };

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
