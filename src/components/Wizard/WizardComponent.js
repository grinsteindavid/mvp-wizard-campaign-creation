import React, { useEffect, useCallback, useMemo, memo } from 'react';
import { useWizard } from '../../contexts/WizardContext';
import { DataSourceFactory } from '../../contexts/DataSourceFactory';
import { WIZARD_STEPS } from './constants';
import SourceSelectionStep from './Steps/SourceSelectionStep';
import ProjectSetupStep from './Steps/ProjectSetupStep';
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
  const { currentStep, dataSource, setStep } = useWizard();

  // Check if data source is selected
  const isDataSourceSelected = !!dataSource;
  
  // Log the current state for debugging
  console.log('Wizard render state:', { 
    currentStep, 
    dataSource, 
    isDataSourceSelected, 
    source: 'navigation-only context' 
  });

  // Effect to redirect to step 0 if no data source is selected and we're not on step 0
  useEffect(() => {
    if (!isDataSourceSelected && currentStep > 0) {
      console.log('No data source selected, redirecting to step 0 via useEffect');
      setStep(0);
    }
  }, [isDataSourceSelected, currentStep, setStep]);

  /**
   * Render a step with the appropriate data source context provider
   * @param {Component} Component - Step component to render
   * @returns {JSX.Element} - Rendered component
   */
  const renderWithSelectedProvider = useCallback((Component) => {
    // ALWAYS require a data source for steps after source selection
    if (!isDataSourceSelected) {
      console.log('No data source selected, redirecting to step 0');
      
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Data Source Required</h2>
          <p>Please choose a data source before proceeding.</p>
          <p>Redirecting to source selection...</p>
        </div>
      );
    }
    
    // Use the DataSourceFactory to get the appropriate context
    // and pass it to the component as a prop
    console.log('Rendering with data source:', dataSource);
    return (
      <DataSourceFactory source={dataSource}>
        {(contextValue) => <Component dataSourceContext={contextValue} />}
      </DataSourceFactory>
    );
  }, [isDataSourceSelected, dataSource]);
  
  /**
   * Determine which step to render based on the current step state
   * @returns {JSX.Element} - The step component to render
   */
  const renderStepContent = useCallback(() => {
    switch (currentStep) {
      case 0:
        // The source selection step doesn't need a data source context
        return <SourceSelectionStep />;
      case 1:
        // Project setup requires data source context
        return renderWithSelectedProvider(ProjectSetupStep);
      case 2:
        // Review step requires data source context
        return renderWithSelectedProvider(ReviewStep);
      default:
        return <div>Unknown step</div>;
    }
  }, [currentStep, renderWithSelectedProvider]);

  // Memoize the step indicator to prevent unnecessary re-renders
  const stepIndicator = useMemo(() => (
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
  ), [currentStep]);

  return (
    <WizardContainer>
      <WizardHeader>
        <WizardTitle>Workflow Wizard</WizardTitle>
        {stepIndicator}
      </WizardHeader>
      
      <WizardContent>
        {renderStepContent()}
      </WizardContent>
    </WizardContainer>
  );
};

// Memoize the entire Wizard component to prevent unnecessary re-renders
export default memo(Wizard);
