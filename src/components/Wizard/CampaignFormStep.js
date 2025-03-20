import React, { useMemo } from 'react';
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
  
  // Use useMemo to efficiently get the current traffic source context
  const currentSource = useMemo(() => {
    const trafficSourceMap = {
      'google': googleSource,
      'revcontent': revContentSource,
      'yahoo': yahooSource
    };
    return trafficSourceMap[trafficSource];
  }, [trafficSource, googleSource, revContentSource, yahooSource]);

  const handleFormChange = (newData) => {
    updateCampaignData(newData);
  };

  // If no valid traffic source is available, show an error message
  if (!currentSource) {
    return (
      <StepContainer>
        <Title>Error</Title>
        <div>Invalid or unavailable traffic source: {trafficSource}</div>
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
