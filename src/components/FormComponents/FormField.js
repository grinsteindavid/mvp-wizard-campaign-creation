import React from 'react';
import styled from 'styled-components';

// Styled components for form elements
const FieldContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${props => props.hasError ? '#e53935' : '#ddd'};
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#e53935' : '#4285f4'};
    box-shadow: 0 0 0 2px ${props => props.hasError ? 'rgba(229, 57, 53, 0.2)' : 'rgba(66, 133, 244, 0.2)'};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${props => props.hasError ? '#e53935' : '#ddd'};
  border-radius: 4px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#e53935' : '#4285f4'};
    box-shadow: 0 0 0 2px ${props => props.hasError ? 'rgba(229, 57, 53, 0.2)' : 'rgba(66, 133, 244, 0.2)'};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${props => props.hasError ? '#e53935' : '#ddd'};
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#e53935' : '#4285f4'};
    box-shadow: 0 0 0 2px ${props => props.hasError ? 'rgba(229, 57, 53, 0.2)' : 'rgba(66, 133, 244, 0.2)'};
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const CheckboxInput = styled.input`
  margin-right: 8px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: #e53935;
  font-size: 12px;
  margin-top: 4px;
`;

const RequiredMark = styled.span`
  color: #e53935;
  margin-left: 2px;
`;

// Generic form field component
const FormField = ({
  field,
  value,
  onChange,
  error,
  disabled = false
}) => {
  const handleChange = (e) => {
    const fieldValue = field.type === 'checkbox' 
      ? e.target.checked 
      : e.target.value;
      
    onChange(field.name, fieldValue);
  };

  const handleMultiSelectChange = (e) => {
    const options = e.target.options;
    const values = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    onChange(field.name, values);
  };

  const handleCheckboxesChange = (value, checked) => {
    let newValues = [...(Array.isArray(value) ? value : [])];
    
    if (checked) {
      newValues.push(value);
    } else {
      newValues = newValues.filter(v => v !== value);
    }
    
    onChange(field.name, newValues);
  };

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'number':
      case 'email':
      case 'url':
      case 'date':
        return (
          <Input
            type={field.type}
            id={field.name}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
            placeholder={field.placeholder || ''}
            min={field.validation?.min}
            max={field.validation?.max}
            step={field.validation?.step}
            disabled={disabled}
            hasError={!!error}
            required={field.required}
          />
        );
      case 'textarea':
        return (
          <TextArea
            id={field.name}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
            placeholder={field.placeholder || ''}
            disabled={disabled}
            hasError={!!error}
            required={field.required}
          />
        );
      case 'select':
        return (
          <Select
            id={field.name}
            name={field.name}
            value={value || ''}
            onChange={handleChange}
            disabled={disabled}
            hasError={!!error}
            required={field.required}
          >
            <option value="">Select an option</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        );
      case 'multiselect':
        return (
          <Select
            id={field.name}
            name={field.name}
            multiple
            value={Array.isArray(value) ? value : []}
            onChange={handleMultiSelectChange}
            disabled={disabled}
            hasError={!!error}
            required={field.required}
          >
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        );
      case 'checkbox':
        return (
          <CheckboxContainer>
            <CheckboxInput
              type="checkbox"
              id={field.name}
              name={field.name}
              checked={!!value}
              onChange={handleChange}
              disabled={disabled}
            />
            <CheckboxLabel htmlFor={field.name}>{field.label}</CheckboxLabel>
          </CheckboxContainer>
        );
      case 'checkboxes':
        return (
          <div>
            {field.options?.map(option => (
              <CheckboxContainer key={option.value}>
                <CheckboxInput
                  type="checkbox"
                  id={`${field.name}-${option.value}`}
                  name={field.name}
                  value={option.value}
                  checked={Array.isArray(value) && value.includes(option.value)}
                  onChange={(e) => handleCheckboxesChange(option.value, e.target.checked)}
                  disabled={disabled}
                />
                <CheckboxLabel htmlFor={`${field.name}-${option.value}`}>
                  {option.label}
                </CheckboxLabel>
              </CheckboxContainer>
            ))}
          </div>
        );
      default:
        return <div>Unsupported field type: {field.type}</div>;
    }
  };

  return (
    <FieldContainer>
      {field.type !== 'checkbox' && (
        <Label htmlFor={field.name}>
          {field.label}
          {field.required && <RequiredMark>*</RequiredMark>}
        </Label>
      )}
      {renderField()}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FieldContainer>
  );
};

export default FormField;
