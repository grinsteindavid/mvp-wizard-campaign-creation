import React from 'react';
import { FieldContainer, Checkbox, OptionLabel, ErrorMessage, HelpText } from '../styled/FormElements';

const CheckboxField = ({ 
  field, 
  value, 
  onChange, 
  error, 
  disabled = false 
}) => {
  const handleChange = (e) => {
    onChange(field.name, e.target.checked);
  };

  return (
    <FieldContainer>
      <OptionLabel>
        <Checkbox
          id={field.name}
          name={field.name}
          checked={!!value}
          onChange={handleChange}
          disabled={disabled}
        />
        {field.label}
      </OptionLabel>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {field.helpText && <HelpText>{field.helpText}</HelpText>}
    </FieldContainer>
  );
};

export default CheckboxField;
