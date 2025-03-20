import React from 'react';
import styled from 'styled-components';
import { useWizard } from '../../contexts/WizardContext';
import { availableTrafficSources } from '../../contexts/TrafficSourceFactory';

const StepContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 24px;
  color: #333;
  text-align: center;
`;

const SourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const SourceCard = styled.div`
  border: 2px solid ${props => props.selected ? '#4285f4' : '#e0e0e0'};
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${props => props.selected ? 'rgba(66, 133, 244, 0.1)' : 'white'};
  box-shadow: ${props => props.selected ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none'};
  
  &:hover {
    border-color: ${props => props.selected ? '#4285f4' : '#aaa'};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const SourceName = styled.h3`
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
`;

const SourceDescription = styled.p`
  margin: 0;
  color: #666;
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const NextButton = styled.button`
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  opacity: ${props => props.disabled ? 0.5 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  
  &:hover {
    background-color: #3367d6;
  }
`;

const SourceSelectionStep = () => {
  const { trafficSource, setTrafficSource, nextStep } = useWizard();
  
  // Debug log the current traffic source
  console.log('SourceSelectionStep - Current traffic source:', trafficSource);

  const handleSourceSelect = (sourceId) => {
    // When selecting a source, set it in the context
    console.log('Setting traffic source to:', sourceId);
    setTrafficSource(sourceId);
    
    // Just log that we've set it
    console.log('Source selected, current context value should now be updated');
  };

  const handleNext = () => {
    // Validate that a traffic source is selected before proceeding
    if (!trafficSource) {
      // Display error or notification that source selection is required
      console.error('Traffic source selection is required before proceeding');
      alert('Please select a traffic source before proceeding.');
      return;
    }
    
    // If validation passes, proceed to next step
    console.log('Proceeding to next step with source:', trafficSource);
    
    // Ensure the traffic source is set before proceeding
    setTrafficSource(trafficSource);
    
    // Go to the next step
    setTimeout(() => {
      console.log('Executing nextStep() with current source:', trafficSource);
      nextStep();
    }, 0);
  };

  return (
    <StepContainer>
      <Title>Select Traffic Source</Title>
      
      <SourceGrid>
        {availableTrafficSources.map(source => (
          <SourceCard
            key={source.id}
            selected={trafficSource === source.id}
            onClick={() => handleSourceSelect(source.id)}
          >
            <SourceName>{source.name}</SourceName>
            <SourceDescription>{source.description}</SourceDescription>
          </SourceCard>
        ))}
      </SourceGrid>
      
      <ButtonContainer>
        <NextButton onClick={handleNext} disabled={!trafficSource}>
          Next
        </NextButton>
      </ButtonContainer>
    </StepContainer>
  );
};

export default SourceSelectionStep;
