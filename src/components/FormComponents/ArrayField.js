import React from 'react';
import styled from 'styled-components';
import FormField from './FormField';

const ArrayContainer = styled.div`
  margin-bottom: 20px;
`;

const ArrayTitle = styled.h3`
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 16px;
  color: #333;
`;

const ItemContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #f9f9f9;
  position: relative;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ItemTitle = styled.h4`
  font-size: 14px;
  margin: 0;
  color: #555;
`;

const RemoveButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #d32f2f;
  }
`;

const AddButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #388e3c;
  }
`;

const ErrorMessage = styled.div`
  color: #e53935;
  font-size: 12px;
  margin-top: 4px;
`;

const ArrayField = ({ field, value = [], onChange, errors }) => {
  // Create a new empty item based on the field configuration
  const createEmptyItem = () => {
    const item = {};
    Object.keys(field.fields).forEach(fieldName => {
      item[fieldName] = '';
    });
    return item;
  };

  // Add a new item to the array
  const handleAddItem = () => {
    const newItems = [...value, createEmptyItem()];
    onChange(field.name, newItems);
  };

  // Remove an item from the array
  const handleRemoveItem = (index) => {
    const newItems = [...value];
    newItems.splice(index, 1);
    onChange(field.name, newItems);
  };

  // Update a field within an item
  const handleItemFieldChange = (index, fieldName, fieldValue) => {
    const newItems = [...value];
    newItems[index] = {
      ...newItems[index],
      [fieldName]: fieldValue
    };
    onChange(field.name, newItems);
  };

  // Get array-level error if any
  const arrayError = errors ? errors[field.name] : undefined;

  return (
    <ArrayContainer>
      <ArrayTitle>{field.label}</ArrayTitle>
      
      {value.map((item, index) => (
        <ItemContainer key={index}>
          <ItemHeader>
            <ItemTitle>Item {index + 1}</ItemTitle>
            <RemoveButton onClick={() => handleRemoveItem(index)}>
              Remove
            </RemoveButton>
          </ItemHeader>
          
          {Object.entries(field.fields).map(([fieldName, fieldConfig]) => {
            // Create a field object that FormField can use
            const formField = {
              ...fieldConfig,
              name: fieldName
            };
            
            // Get the current value for this field from the item
            const fieldValue = item[fieldName];
            
            // Get any error for this specific field in this specific item
            const fieldError = errors ? errors[`${field.name}[${index}].${fieldName}`] : undefined;
            
            return (
              <FormField
                key={fieldName}
                field={formField}
                value={fieldValue}
                onChange={(name, value) => handleItemFieldChange(index, name, value)}
                error={fieldError}
              />
            );
          })}
        </ItemContainer>
      ))}
      
      <AddButton onClick={handleAddItem}>
        Add {field.label.replace(/s$/, '')}
      </AddButton>
      
      {arrayError && <ErrorMessage>{arrayError}</ErrorMessage>}
    </ArrayContainer>
  );
};

export default ArrayField;
