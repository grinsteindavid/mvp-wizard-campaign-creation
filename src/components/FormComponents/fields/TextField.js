import React from 'react';
import { Input } from '../styled/FormElements';
import withFieldMemoization from './withFieldMemoization';
import useFieldChangeHandler from '../hooks/useFieldChangeHandler';
import BaseField from './BaseField';

const TextField = ({ 
  field, 
  value, 
  onChange, 
  error, 
  disabled = false 
}) => {
  // Use the custom hook for the change handler
  const handleChange = useFieldChangeHandler(field.name, onChange);

  return (
    <BaseField field={field} error={error}>
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
    </BaseField>
  );
};

// Apply the memoization HOC to the component
export default withFieldMemoization(TextField);
