import React, { memo } from 'react';
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
  onBlur,
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
      onBlur={onBlur}
      error={error}
      disabled={disabled}
    />
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(FormField, (prevProps, nextProps) => {
  // Custom comparison function to determine if the component should re-render
  return (
    prevProps.value === nextProps.value &&
    prevProps.error === nextProps.error &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.field.type === nextProps.field.type &&
    prevProps.onBlur === nextProps.onBlur
  );
});
