import React from 'react';
import { FieldContainer, Label, Input, ErrorMessage, HelpText } from '../styled/FormElements';

const TextField = ({ 
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
      <Input
        type={field.type || 'text'}
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
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {field.helpText && <HelpText>{field.helpText}</HelpText>}
    </FieldContainer>
  );
};

export default TextField;
