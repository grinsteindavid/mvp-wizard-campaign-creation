import React from 'react';
import { useWizard } from '../../../contexts/WizardContext';
import { dataSourceNames } from '../../../contexts/DataSourceFactory';
import DynamicForm from '../../FormComponents/DynamicForm';
import {
  StepContainer,
  Title,
  ButtonContainer,
  Button
} from '../styled/WizardElements';

/**
 * Second step of the wizard for setting up project details
 * @param {object} dataSourceContext - Context from the data source provider
 */
const ProjectSetupStep = ({ dataSourceContext }) => {
  const { dataSource, prevStep, nextStep } = useWizard();
  
  // Access the data source context that was passed via props from the parent
  const currentSource = dataSourceContext;
  
  // Verify that we have the expected data source
  const isContextValid = !!currentSource && typeof currentSource === 'object';
  
  console.log('ProjectSetupStep context check:', {
    source: dataSource,
    hasContext: isContextValid,
    contextType: typeof currentSource,
    contextKeys: isContextValid ? Object.keys(currentSource) : 'none'
  });

  /**
   * Handle form field changes
   * @param {object} newData - Updated form data
   */
  const handleFormChange = (newData) => {
    // Use the data source context's updateField method instead of wizard context
    if (isContextValid && currentSource.updateField) {
      // For each field in the new data, update it in the data source context
      Object.entries(newData).forEach(([field, value]) => {
        currentSource.updateField(field, value);
      });
    }
  };

  // If the required context is missing or invalid, show an error message
  if (!isContextValid) {
    console.error('Data source context issue:', { 
      dataSource, 
      hasContext: !!dataSourceContext,
      contextType: typeof dataSourceContext
    });
    
    return (
      <StepContainer>
        <Title>Error</Title>
        <div>
          <p>Data source context not available: {dataSource}</p>
          <p>Please go back and choose a data source to continue.</p>
          <div style={{ marginTop: '20px' }}>
            <Button onClick={prevStep}>Back to Source Selection</Button>
          </div>
        </div>
      </StepContainer>
    );
  }
  
  return (
    <StepContainer>
      <Title>Set Up {dataSourceNames[dataSource]} Project</Title>
      
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
          Review Project
        </Button>
      </ButtonContainer>
    </StepContainer>
  );
};

export default ProjectSetupStep;
