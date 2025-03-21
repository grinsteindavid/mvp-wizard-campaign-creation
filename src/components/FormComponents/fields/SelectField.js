import React from 'react';
import { Select } from '../styled/FormElements';
import withFieldMemoization from './withFieldMemoization';
import useFieldChangeHandler from '../hooks/useFieldChangeHandler';
import BaseField from './BaseField';

const SelectField = ({ 
  field, 
  value, 
  onChange, 
  error, 
  disabled = false 
}) => {
  const handleChange = useFieldChangeHandler(field.name, onChange);

  return (
    <BaseField field={field} error={error}>
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
    </BaseField>
  );
};

// Apply the memoization HOC to the component
export default withFieldMemoization(SelectField);
