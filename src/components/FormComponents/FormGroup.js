import React from 'react';
import styled from 'styled-components';
import FormField from './FormField';

const GroupContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
`;

const GroupTitle = styled.h3`
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 16px;
  color: #333;
`;

const FormGroup = ({ field, values, onChange, errors }) => {
  const handleFieldChange = (fieldName, fieldValue) => {
    // Update the nested field within the group
    const updatedGroupValue = {
      ...values,
      [fieldName]: fieldValue
    };
    
    // Pass the entire updated group value to the parent
    onChange(field.name, updatedGroupValue);
  };

  return (
    <GroupContainer>
      <GroupTitle>{field.label}</GroupTitle>
      {Object.entries(field.fields).map(([fieldName, fieldConfig]) => {
        // Create a field object that FormField can use
        const formField = {
          ...fieldConfig,
          name: fieldName
        };
        
        // Get the current value for this field from the group values
        const fieldValue = values ? values[fieldName] : undefined;
        
        // Get any error for this field
        const fieldError = errors ? errors[`${field.name}.${fieldName}`] : undefined;
        
        return (
          <FormField
            key={fieldName}
            field={formField}
            value={fieldValue}
            onChange={handleFieldChange}
            error={fieldError}
          />
        );
      })}
    </GroupContainer>
  );
};

export default FormGroup;
