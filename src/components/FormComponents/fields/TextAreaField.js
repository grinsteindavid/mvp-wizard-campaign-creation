import React from 'react';
import { TextArea } from '../styled/FormElements';
import BaseField from './BaseField';
import withFieldMemoization from './withFieldMemoization';

const TextAreaField = ({ 
  field, 
  value, 
  onChange, 
  onBlur,
  error, 
  disabled = false 
}) => {
  const handleChange = (e) => {
    onChange(field.name, e.target.value);
  };

  return (
    <BaseField field={field} error={error}>
      <TextArea
        id={field.name}
        name={field.name}
        value={value || ''}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={field.placeholder || ''}
        disabled={disabled}
        hasError={!!error}
        rows={field.rows || 4}
      />
    </BaseField>
  );
};

// Apply the memoization HOC to the component
export default withFieldMemoization(TextAreaField);
