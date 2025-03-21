import React from 'react';
import { useWizard } from '../../../contexts/WizardContext';
import { availableDataSources } from '../../../contexts/DataSourceFactory';
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
 * The first step of the wizard for choosing a data source
 */
const SourceSelectionStep = () => {
  const { dataSource, setDataSource, nextStep } = useWizard();
  
  // Debug log the current data source
  console.log('SourceSelectionStep - Current data source:', dataSource);

  /**
   * Handle selection of a data source
   * @param {string} sourceId - ID of the selected data source
   */
  const handleSourceSelect = (sourceId) => {
    console.log('Setting data source to:', sourceId);
    setDataSource(sourceId);
    console.log('Source selected, current context value should now be updated');
  };

  /**
   * Handle proceeding to the next step
   */
  const handleNext = () => {
    // Validate that a data source is selected before proceeding
    if (!dataSource) {
      console.error('Data source selection is required before proceeding');
      alert('Please select a data source before proceeding.');
      return;
    }
    
    console.log('Proceeding to next step with source:', dataSource);
    
    // Ensure the data source is set before proceeding
    setDataSource(dataSource);
    
    console.log('Executing nextStep() with current source:', dataSource);
    nextStep();
  };

  return (
    <StepContainer>
      <Title>Choose Data Source</Title>
      
      <SourceGrid>
        {availableDataSources.map(source => (
          <SourceCard
            key={source.id}
            selected={dataSource === source.id}
            onClick={() => handleSourceSelect(source.id)}
          >
            <SourceName>{source.name}</SourceName>
            <SourceDescription>{source.description}</SourceDescription>
          </SourceCard>
        ))}
      </SourceGrid>
      
      <ButtonContainer>
        <Button primary onClick={handleNext} disabled={!dataSource}>
          Next
        </Button>
      </ButtonContainer>
    </StepContainer>
  );
};

export default SourceSelectionStep;
