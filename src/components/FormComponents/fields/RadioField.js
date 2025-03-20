import React from 'react';
import { FieldContainer, Label, RadioButton, OptionLabel, ErrorMessage, HelpText } from '../styled/FormElements';

const RadioField = ({ 
  field, 
  value, 
  onChange, 
  error, 
  disabled = false 
}) => {
  const handleChange = (optionValue) => {
    onChange(field.name, optionValue);
  };

  return (
    <FieldContainer>
      <Label>{field.label}</Label>
      {field.options && field.options.map(option => (
        <OptionLabel key={option.value}>
          <RadioButton
            name={field.name}
            value={option.value}
            checked={value === option.value}
            onChange={() => handleChange(option.value)}
            disabled={disabled}
          />
          {option.label}
        </OptionLabel>
      ))}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {field.helpText && <HelpText>{field.helpText}</HelpText>}
    </FieldContainer>
  );
};

export default RadioField;
