import styled from 'styled-components';

// Main container for the wizard
export const WizardContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

// Header section of the wizard
export const WizardHeader = styled.div`
  background-color: #4285f4;
  padding: 20px;
  color: white;
`;

export const WizardTitle = styled.h1`
  margin: 0;
  font-size: 24px;
  text-align: center;
`;

// Step indicator components
export const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const StepItem = styled.div`
  display: flex;
  align-items: center;
`;

export const StepNumber = styled.div`
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

export const StepLabel = styled.div`
  margin-left: 8px;
  font-size: 14px;
  opacity: ${props => props.active || props.completed ? 1 : 0.7};
  font-weight: ${props => props.active ? 500 : 'normal'};
`;

export const StepConnector = styled.div`
  height: 2px;
  width: 60px;
  background-color: ${props => props.completed ? 'white' : 'rgba(255, 255, 255, 0.3)'};
  margin: 0 8px;
`;

// Content area of the wizard
export const WizardContent = styled.div`
  min-height: 500px;
`;

// Common step styles
export const StepContainer = styled.div`
  padding: 20px;
`;

export const Title = styled.h2`
  margin-bottom: 24px;
  color: #333;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

export const Button = styled.button`
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

// Review step specific components
export const ReviewSection = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
`;

export const SectionTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 16px;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 8px;
`;

export const ReviewItem = styled.div`
  margin-bottom: 12px;
  display: flex;
`;

export const ItemLabel = styled.div`
  font-weight: 500;
  width: 200px;
  color: #555;
`;

export const ItemValue = styled.div`
  flex: 1;
  color: #333;
`;

export const SuccessMessage = styled.div`
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

export const ErrorContainer = styled.div`
  background-color: #ffebee;
  border: 1px solid #ffcdd2;
  border-radius: 4px;
  padding: 16px;
  margin-top: 20px;
  color: #c62828;
`;

export const ErrorTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 8px;
`;

export const ErrorList = styled.ul`
  margin: 0;
  padding-left: 20px;
`;

export const ErrorItem = styled.li`
  margin-bottom: 4px;
`;

// Source selection specific components
export const SourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

export const SourceCard = styled.div`
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

export const SourceName = styled.h3`
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
`;

export const SourceDescription = styled.p`
  margin: 0;
  color: #666;
  font-size: 14px;
`;
