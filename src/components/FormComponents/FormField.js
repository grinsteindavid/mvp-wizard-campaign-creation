import React from 'react';
import { fieldTypeMap } from './fields';
import { FieldContainer } from './styled/FormElements';

/**
 * Generic form field component that renders the appropriate field component
 * based on the field type.
 */
const FormField = ({
  field,
  value,
  onChange,
  error,
  disabled = false
}) => {
  // Get the appropriate field component based on the field type
  const FieldComponent = fieldTypeMap[field.type];
  
  // If no matching component is found, show an error message
  if (!FieldComponent) {
    return (
      <FieldContainer>
        <div>Unsupported field type: {field.type}</div>
      </FieldContainer>
    );
  }
  
  // Render the field component with the provided props
  return (
    <FieldComponent
      field={field}
      value={value}
      onChange={onChange}
      error={error}
      disabled={disabled}
    />
  );
};

export default FormField;
