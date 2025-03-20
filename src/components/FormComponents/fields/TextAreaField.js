import React from 'react';
import { FieldContainer, Label, TextArea, ErrorMessage, HelpText } from '../styled/FormElements';

const TextAreaField = ({ 
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
      <TextArea
        id={field.name}
        name={field.name}
        value={value || ''}
        onChange={handleChange}
        placeholder={field.placeholder || ''}
        disabled={disabled}
        hasError={!!error}
        rows={field.rows || 4}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {field.helpText && <HelpText>{field.helpText}</HelpText>}
    </FieldContainer>
  );
};

export default TextAreaField;
