import React from 'react';
import FormField from './FormField';
import FormGroup from './FormGroup';
import ArrayField from './ArrayField';
import { FormContainer } from './styled/FormElements';

/**
 * DynamicForm component that renders a form based on a configuration object.
 * Supports different field types including groups and arrays.
 */
const DynamicForm = ({ fields, values, onChange, errors }) => {
  const handleFieldChange = (name, value) => {
    // Use a callback pattern to ensure we're working with the latest state
    onChange(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  if (!fields) {
    return <div>No form fields available</div>;
  }

  return (
    <FormContainer>
      {Object.entries(fields).map(([fieldName, fieldConfig]) => {
        // Create a field object that components can use
        const field = {
          ...fieldConfig,
          name: fieldName
        };
        
        // Get the current value for this field
        const fieldValue = values ? values[fieldName] : undefined;
        
        // Get any error for this field
        const fieldError = errors ? errors[fieldName] : undefined;
        
        // Render the appropriate component based on field type
        switch (field.type) {
          case 'group':
            return (
              <FormGroup
                key={fieldName}
                field={field}
                values={fieldValue}
                onChange={handleFieldChange}
                errors={errors}
              />
            );
          case 'array':
            return (
              <ArrayField
                key={fieldName}
                field={field}
                value={fieldValue}
                onChange={handleFieldChange}
                errors={errors}
              />
            );
          default:
            return (
              <FormField
                key={fieldName}
                field={field}
                value={fieldValue}
                onChange={handleFieldChange}
                error={fieldError}
              />
            );
        }
      })}
    </FormContainer>
  );
};

export default DynamicForm;
