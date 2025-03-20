import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useWizard } from '../../contexts/WizardContext';
import { useGoogleTrafficSource } from '../../contexts/GoogleTrafficSourceContext';
import { useRevContentTrafficSource } from '../../contexts/RevContentTrafficSourceContext';
import { useYahooTrafficSource } from '../../contexts/YahooTrafficSourceContext';
import { trafficSourceNames } from '../../contexts/TrafficSourceFactory';
import { validateCampaign } from '../../services/validationService';

const StepContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 24px;
  color: #333;
  text-align: center;
`;

const ReviewSection = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 16px;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 8px;
`;

const ReviewItem = styled.div`
  margin-bottom: 12px;
  display: flex;
`;

const ItemLabel = styled.div`
  font-weight: 500;
  width: 200px;
  color: #555;
`;

const ItemValue = styled.div`
  flex: 1;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#4285f4' : props.danger ? '#f44336' : '#f5f5f5'};
  color: ${props => (props.primary || props.danger) ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  opacity: ${props => props.disabled ? 0.5 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  
  &:hover {
    background-color: ${props => props.primary ? '#3367d6' : props.danger ? '#d32f2f' : '#e0e0e0'};
  }
`;

const SuccessMessage = styled.div`
  background-color: #e8f5e9;
  border: 1px solid #c8e6c9;
  border-radius: 4px;
  padding: 16px;
  margin-top: 20px;
  color: #2e7d32;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`;

const ErrorContainer = styled.div`
  background-color: #ffebee;
  border: 1px solid #ffcdd2;
  border-radius: 4px;
  padding: 16px;
  margin-top: 20px;
  color: #c62828;
`;

const ErrorTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 8px;
`;

const ErrorList = styled.ul`
  margin: 0;
  padding-left: 20px;
`;

const ErrorItem = styled.li`
  margin-bottom: 4px;
`;

// Helper function to format values for display
// This is a pure function that can be memoized for better performance
const formatValue = (value, field) => {
  if (value === undefined || value === null || value === '') {
    return 'Not specified';
  }
  
  if (Array.isArray(value)) {
    if (field.type === 'multiselect' || field.type === 'checkboxes') {
      // For multiselect/checkboxes, map values to labels
      return value.map(v => {
        const option = field.options?.find(opt => opt.value === v);
        return option ? option.label : v;
      }).join(', ');
    } else if (field.type === 'array') {
      // For array fields, show count
      return `${value.length} items`;
    }
    return value.join(', ');
  }
  
  if (typeof value === 'object') {
    return 'Complex value';
  }
  
  if (field.type === 'select') {
    // For select fields, show the label instead of the value
    const option = field.options?.find(opt => opt.value === value);
    return option ? option.label : value;
  }
  
  if (field.type === 'date') {
    return new Date(value).toLocaleDateString();
  }
  
  return value.toString();
};

// Recursive function to render field values
const renderFieldValue = (name, value, fields, parentPath = '') => {
  const field = fields[name];
  
  if (!field) return null;
  
  const currentPath = parentPath ? `${parentPath}.${name}` : name;
  
  if (field.type === 'group') {
    return (
      <div key={currentPath} style={{ marginBottom: '16px' }}>
        <h4 style={{ marginBottom: '8px' }}>{field.label}</h4>
        {value && Object.entries(field.fields).map(([childName, childField]) => {
          return renderFieldValue(childName, value[childName], field.fields, currentPath);
        })}
      </div>
    );
  }
  
  if (field.type === 'array') {
    return (
      <div key={currentPath} style={{ marginBottom: '16px' }}>
        <h4 style={{ marginBottom: '8px' }}>{field.label} ({value ? value.length : 0})</h4>
        {value && value.map((item, index) => (
          <div key={`${currentPath}-${index}`} style={{ marginLeft: '16px', marginBottom: '12px' }}>
            <h5 style={{ marginBottom: '8px' }}>Item {index + 1}</h5>
            {Object.entries(field.fields).map(([childName, childField]) => {
              return (
                <ReviewItem key={`${currentPath}-${index}-${childName}`}>
                  <ItemLabel>{childField.label}</ItemLabel>
                  <ItemValue>{formatValue(item[childName], childField)}</ItemValue>
                </ReviewItem>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <ReviewItem key={currentPath}>
      <ItemLabel>{field.label}</ItemLabel>
      <ItemValue>{formatValue(value, field)}</ItemValue>
    </ReviewItem>
  );
};

const ReviewStep = () => {
  const { trafficSource: sourceId, campaignData, prevStep, setValidationResult, resetWizard } = useWizard();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState(null);
  
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
    return trafficSourceMap[sourceId];
  }, [sourceId, googleSource, revContentSource, yahooSource]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Validate the campaign data
    const validationResult = validateCampaign(sourceId, campaignData);
    setValidationResult(validationResult);
    
    if (validationResult.isValid) {
      // Simulate API call to create campaign
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        console.log('Campaign created:', campaignData);
      }, 1500);
    } else {
      setIsSubmitting(false);
      setValidationErrors(validationResult.errors);
    }
  };

  const handleStartOver = () => {
    resetWizard();
  };

  // Memoize the field values rendering for better performance
  const renderedFields = useMemo(() => {
    // Safe check for currentSource and its fields
    const fields = currentSource?.fields || {};
    
    return Object.keys(fields).map(fieldName => {
      return renderFieldValue(fieldName, campaignData?.[fieldName], fields);
    });
  }, [currentSource, campaignData]);
  
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
        {renderedFields}
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
      
      {isSubmitted ? (
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
          <Button onClick={prevStep} disabled={isSubmitting}>
            Back
          </Button>
          <Button 
            primary 
            onClick={handleSubmit} 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Campaign...' : 'Create Campaign'}
          </Button>
        </ButtonContainer>
      )}
    </StepContainer>
  );
};

export default ReviewStep;
