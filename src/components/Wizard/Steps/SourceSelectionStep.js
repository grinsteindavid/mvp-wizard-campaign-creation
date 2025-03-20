import React from 'react';
import { useWizard } from '../../../contexts/WizardContext';
import { availableTrafficSources } from '../../../contexts/TrafficSourceFactory';
import {
  StepContainer,
  Title,
  SourceGrid,
  SourceCard,
  SourceName,
  SourceDescription,
  ButtonContainer,
  Button
} from '../styled/WizardElements';

/**
 * The first step of the wizard for selecting a traffic source
 */
const SourceSelectionStep = () => {
  const { trafficSource, setTrafficSource, nextStep } = useWizard();
  
  // Debug log the current traffic source
  console.log('SourceSelectionStep - Current traffic source:', trafficSource);

  /**
   * Handle selection of a traffic source
   * @param {string} sourceId - ID of the selected traffic source
   */
  const handleSourceSelect = (sourceId) => {
    console.log('Setting traffic source to:', sourceId);
    setTrafficSource(sourceId);
    console.log('Source selected, current context value should now be updated');
  };

  /**
   * Handle proceeding to the next step
   */
  const handleNext = () => {
    // Validate that a traffic source is selected before proceeding
    if (!trafficSource) {
      console.error('Traffic source selection is required before proceeding');
      alert('Please select a traffic source before proceeding.');
      return;
    }
    
    console.log('Proceeding to next step with source:', trafficSource);
    
    // Ensure the traffic source is set before proceeding
    setTrafficSource(trafficSource);
    
    console.log('Executing nextStep() with current source:', trafficSource);
    nextStep();
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
        <Button primary onClick={handleNext} disabled={!trafficSource}>
          Next
        </Button>
      </ButtonContainer>
    </StepContainer>
  );
};

export default SourceSelectionStep;
