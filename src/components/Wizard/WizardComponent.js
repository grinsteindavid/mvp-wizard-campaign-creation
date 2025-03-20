import React, { useEffect } from 'react';
import { useWizard } from '../../contexts/WizardContext';
import { TrafficSourceFactory } from '../../contexts/TrafficSourceFactory';
import { WIZARD_STEPS } from './constants';
import SourceSelectionStep from './Steps/SourceSelectionStep';
import CampaignFormStep from './Steps/CampaignFormStep';
import ReviewStep from './Steps/ReviewStep';
import {
  WizardContainer,
  WizardHeader,
  WizardTitle,
  StepIndicator,
  StepItem,
  StepNumber,
  StepLabel,
  StepConnector,
  WizardContent
} from './styled/WizardElements';

/**
 * Main Wizard component that manages the wizard flow and steps
 */
const Wizard = () => {
  // Get all the necessary state from the wizard context
  const { currentStep, trafficSource, setStep } = useWizard();

  // Check if traffic source is selected
  const isTrafficSourceSelected = !!trafficSource;
  
  // Log the current state for debugging
  console.log('Wizard render state:', { 
    currentStep, 
    trafficSource, 
    isTrafficSourceSelected, 
    source: 'navigation-only context' 
  });

  // Effect to redirect to step 0 if no traffic source is selected and we're not on step 0
  useEffect(() => {
    if (!isTrafficSourceSelected && currentStep > 0) {
      console.log('No traffic source selected, redirecting to step 0 via useEffect');
      setStep(0);
    }
  }, [isTrafficSourceSelected, currentStep, setStep]);

  /**
   * Render a step with the appropriate traffic source context provider
   * @param {Component} Component - Step component to render
   * @returns {JSX.Element} - Rendered component
   */
  const renderWithSelectedProvider = (Component) => {
    // ALWAYS require a traffic source for steps after source selection
    if (!isTrafficSourceSelected) {
      console.log('No traffic source selected, redirecting to step 0');
      
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Traffic Source Required</h2>
          <p>Please select a traffic source before proceeding.</p>
          <p>Redirecting to source selection...</p>
        </div>
      );
    }
    
    // Use the TrafficSourceFactory to get the appropriate context
    // and pass it to the component as a prop
    console.log('Rendering with traffic source:', trafficSource);
    return (
      <TrafficSourceFactory source={trafficSource}>
        {(contextValue) => <Component trafficSourceContext={contextValue} />}
      </TrafficSourceFactory>
    );
  };
  
  /**
   * Determine which step to render based on the current step state
   * @returns {JSX.Element} - The step component to render
   */
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        // The source selection step doesn't need a traffic source context
        return <SourceSelectionStep />;
      case 1:
        // Campaign form requires traffic source context
        return renderWithSelectedProvider(CampaignFormStep);
      case 2:
        // Review step requires traffic source context
        return renderWithSelectedProvider(ReviewStep);
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <WizardContainer>
      <WizardHeader>
        <WizardTitle>Ad Campaign Wizard</WizardTitle>
        
        <StepIndicator>
          {WIZARD_STEPS.map((step, index) => (
            <React.Fragment key={step.id}>
              {index > 0 && (
                <StepConnector completed={currentStep > index} />
              )}
              
              <StepItem>
                <StepNumber 
                  active={currentStep === step.id}
                  completed={currentStep > step.id}
                >
                  {currentStep > step.id ? '✓' : step.id + 1}
                </StepNumber>
                <StepLabel 
                  active={currentStep === step.id}
                  completed={currentStep > step.id}
                >
                  {step.label}
                </StepLabel>
              </StepItem>
            </React.Fragment>
          ))}
        </StepIndicator>
      </WizardHeader>
      
      <WizardContent>
        {renderStepContent()}
      </WizardContent>
    </WizardContainer>
  );
};

export default Wizard;
