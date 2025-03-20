import React from 'react';
import { useWizard } from '../../../contexts/WizardContext';
import { trafficSourceNames } from '../../../contexts/TrafficSourceFactory';
import DynamicForm from '../../FormComponents/DynamicForm';
import {
  StepContainer,
  Title,
  ButtonContainer,
  Button
} from '../styled/WizardElements';

/**
 * Second step of the wizard for configuring campaign details
 * @param {object} trafficSourceContext - Context from the traffic source provider
 */
const CampaignFormStep = ({ trafficSourceContext }) => {
  const { trafficSource, prevStep, nextStep } = useWizard();
  
  // Access the traffic source context that was passed via props from the parent
  const currentSource = trafficSourceContext;
  
  // Verify that we have the expected traffic source
  const isContextValid = !!currentSource && typeof currentSource === 'object';
  
  console.log('CampaignFormStep context check:', {
    source: trafficSource,
    hasContext: isContextValid,
    contextType: typeof currentSource,
    contextKeys: isContextValid ? Object.keys(currentSource) : 'none'
  });

  /**
   * Handle form field changes
   * @param {object} newData - Updated form data
   */
  const handleFormChange = (newData) => {
    // Use the traffic source context's updateField method instead of wizard context
    if (isContextValid && currentSource.updateField) {
      // For each field in the new data, update it in the traffic source context
      Object.entries(newData).forEach(([field, value]) => {
        currentSource.updateField(field, value);
      });
    }
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
            <Button onClick={prevStep}>Back to Source Selection</Button>
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
        values={currentSource.state || {}}
        onChange={handleFormChange}
        errors={currentSource.state?.errors || {}}
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
