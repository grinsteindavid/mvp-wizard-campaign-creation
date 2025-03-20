import React from 'react';
import { FieldContainer, Label, Select, ErrorMessage, HelpText } from '../styled/FormElements';

const SelectField = ({ 
  field, 
  value, 
  onChange, 
  error, 
  disabled = false 
}) => {
  const handleChange = (e) => {
    onChange(field.name, e.target.value);
  };

  return (
    <FieldContainer>
      <Label htmlFor={field.name}>{field.label}</Label>
      <Select
        id={field.name}
        name={field.name}
        value={value || ''}
        onChange={handleChange}
        disabled={disabled}
        hasError={!!error}
      >
        <option value="">Select {field.label}</option>
        {field.options && field.options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {field.helpText && <HelpText>{field.helpText}</HelpText>}
    </FieldContainer>
  );
};

export default SelectField;
