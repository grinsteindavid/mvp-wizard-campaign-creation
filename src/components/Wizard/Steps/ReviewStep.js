import React, { useState, useMemo } from 'react';
import { useWizard } from '../../../contexts/WizardContext';
import { trafficSourceNames } from '../../../contexts/TrafficSourceFactory';
import { validateCampaign } from '../../../services/validationService';
import ReviewFieldRenderer from '../components/ReviewFieldRenderer';
import { prepareFieldValue } from '../utils/formatHelpers';
import {
  StepContainer,
  Title,
  ReviewSection,
  SectionTitle,
  ButtonContainer,
  Button,
  SuccessMessage,
  ErrorContainer,
  ErrorTitle,
  ErrorList,
  ErrorItem
} from '../styled/WizardElements';

/**
 * Final step of the wizard to review campaign details and submit
 * @param {object} trafficSourceContext - Context from the traffic source provider
 */
const ReviewStep = ({ trafficSourceContext }) => {
  const { trafficSource: sourceId, prevStep, resetWizard } = useWizard();
  const [validationErrors, setValidationErrors] = useState(null);
  
  // Access the traffic source context that was passed via props from the parent
  const currentSource = trafficSourceContext;

  /**
   * Handle campaign submission
   */
  const handleSubmit = () => {
    // Set submitting state in the traffic source context
    currentSource.setSubmitting(true);
    
    // Check if the traffic source context has campaign data
    if (!currentSource || !currentSource.state) {
      currentSource.setSubmitting(false);
      setValidationErrors({ general: 'No campaign data available' });
      return;
    }
    
    // Validate the campaign data
    const validationResult = validateCampaign(sourceId, currentSource.state);
    
    // Use the traffic source context's setValidationResult
    currentSource.setValidationResult(validationResult);
    
    if (validationResult.isValid) {
      // Simulate API call to create campaign
      // In a real app, this would be an async API call
      console.log('Campaign created:', currentSource.state);
      currentSource.setSubmitting(false);
      currentSource.setSubmitted(true);
    } else {
      currentSource.setSubmitting(false);
      setValidationErrors(validationResult.errors);
    }
  };

  /**
   * Handle starting a new campaign
   */
  const handleStartOver = () => {
    resetWizard();
  };

  // Memoize the field values rendering for better performance
  const preparedFields = useMemo(() => {
    // Safe check for currentSource and its fields
    const fields = currentSource?.fields || {};
    const campaignData = currentSource?.state || {};
    
    return Object.keys(fields).map(fieldName => {
      return prepareFieldValue(fieldName, campaignData[fieldName], fields);
    }).filter(Boolean); // Filter out null entries
  }, [currentSource]);
  
  // If no valid traffic source is available, show an error message
  if (!currentSource) {
    return (
      <StepContainer>
        <Title>Error</Title>
        <div>Invalid or unavailable traffic source: {sourceId}</div>
      </StepContainer>
    );
  }
  
  return (
    <StepContainer>
      <Title>Review Your {trafficSourceNames[sourceId]} Campaign</Title>
      
      <ReviewSection>
        <SectionTitle>Campaign Details</SectionTitle>
        {preparedFields.map(fieldData => (
          <ReviewFieldRenderer key={fieldData.key} fieldData={fieldData} />
        ))}
      </ReviewSection>
      
      {validationErrors && (
        <ErrorContainer>
          <ErrorTitle>Please fix the following errors:</ErrorTitle>
          <ErrorList>
            {Object.values(validationErrors).map((error, index) => (
              <ErrorItem key={index}>{error}</ErrorItem>
            ))}
          </ErrorList>
        </ErrorContainer>
      )}
      
      {currentSource.state.isSubmitted ? (
        <>
          <SuccessMessage>
            Campaign created successfully!
          </SuccessMessage>
          <ButtonContainer>
            <Button primary onClick={handleStartOver}>
              Create Another Campaign
            </Button>
          </ButtonContainer>
        </>
      ) : (
        <ButtonContainer>
          <Button onClick={prevStep} disabled={currentSource.state.isSubmitting}>
            Back
          </Button>
          <Button 
            primary 
            onClick={handleSubmit} 
            disabled={currentSource.state.isSubmitting}
          >
            {currentSource.state.isSubmitting ? 'Creating Campaign...' : 'Create Campaign'}
          </Button>
        </ButtonContainer>
      )}
    </StepContainer>
  );
};

export default ReviewStep;
