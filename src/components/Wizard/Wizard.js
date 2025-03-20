import React from 'react';
import styled from 'styled-components';
import { useWizard } from '../../contexts/WizardContext';
import { TrafficSourceFactory } from '../../contexts/TrafficSourceFactory';
import SourceSelectionStep from './SourceSelectionStep';
import CampaignFormStep from './CampaignFormStep';
import ReviewStep from './ReviewStep';

const WizardContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const WizardHeader = styled.div`
  background-color: #4285f4;
  padding: 20px;
  color: white;
`;

const WizardTitle = styled.h1`
  margin: 0;
  font-size: 24px;
  text-align: center;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StepItem = styled.div`
  display: flex;
  align-items: center;
`;

const StepNumber = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.active ? 'white' : props.completed ? '#a1c2fa' : 'rgba(255, 255, 255, 0.3)'};
  color: ${props => props.active ? '#4285f4' : props.completed ? '#4285f4' : 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 14px;
`;

const StepLabel = styled.div`
  margin-left: 8px;
  font-size: 14px;
  opacity: ${props => props.active || props.completed ? 1 : 0.7};
  font-weight: ${props => props.active ? 500 : 'normal'};
`;

const StepConnector = styled.div`
  height: 2px;
  width: 60px;
  background-color: ${props => props.completed ? 'white' : 'rgba(255, 255, 255, 0.3)'};
  margin: 0 8px;
`;

const WizardContent = styled.div`
  min-height: 500px;
`;

const steps = [
  { id: 0, label: 'Select Traffic Source' },
  { id: 1, label: 'Configure Campaign' },
  { id: 2, label: 'Review & Create' }
];

const Wizard = () => {
  // Get all the necessary state from the wizard context
  const { currentStep, trafficSource, setStep } = useWizard();

  // Check if traffic source is selected
  const isTrafficSourceSelected = !!trafficSource;
  
  // Log the current state for debugging
  console.log('Wizard render state:', { currentStep, trafficSource, isTrafficSourceSelected });

  // Render the current step content
  const renderStepContent = () => {
    // Render with only the selected provider for better performance
    // Now passes the traffic source context to the component as a prop
    const renderWithSelectedProvider = (Component) => {
      // ALWAYS require a traffic source for steps after source selection
      if (!isTrafficSourceSelected) {
        console.log('No traffic source selected, redirecting to step 0');
        // Automatically redirect back to the source selection step
        // Use setTimeout to avoid state updates during render
        setTimeout(() => setStep(0), 0);
        
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
    
    // Determine which step to render
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
          {steps.map((step, index) => (
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
