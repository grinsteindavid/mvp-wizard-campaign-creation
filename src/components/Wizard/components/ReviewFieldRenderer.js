import React from 'react';
import {
  ReviewItem,
  ItemLabel,
  ItemValue,
  SectionTitle
} from '../styled/WizardElements';

/**
 * Component that renders a field or field group for the review step
 * @param {object} fieldData - Processed field data from prepareFieldValue
 */
const ReviewFieldRenderer = ({ fieldData }) => {
  if (!fieldData) return null;
  
  if (fieldData.type === 'group') {
    return (
      <div key={fieldData.key} style={{ marginBottom: '16px' }}>
        <SectionTitle>{fieldData.label}</SectionTitle>
        {fieldData.children && fieldData.children.map(childField => (
          <ReviewFieldRenderer key={childField.key} fieldData={childField} />
        ))}
      </div>
    );
  }
  
  if (fieldData.type === 'array') {
    return (
      <div key={fieldData.key} style={{ marginBottom: '16px' }}>
        <h4 style={{ marginBottom: '8px' }}>
          {fieldData.label} ({fieldData.count || 0})
        </h4>
        {fieldData.items && fieldData.items.map((item) => (
          <div 
            key={`${fieldData.key}-${item.index}`} 
            style={{ marginLeft: '16px', marginBottom: '12px' }}
          >
            <h5 style={{ marginBottom: '8px' }}>Item {item.index + 1}</h5>
            {item.fields.map(field => (
              <ReviewItem key={field.key}>
                <ItemLabel>{field.label}</ItemLabel>
                <ItemValue>{field.value}</ItemValue>
              </ReviewItem>
            ))}
          </div>
        ))}
      </div>
    );
  }
  
  // Default case: simple field
  return (
    <ReviewItem key={fieldData.key}>
      <ItemLabel>{fieldData.label}</ItemLabel>
      <ItemValue>{fieldData.value}</ItemValue>
    </ReviewItem>
  );
};

export default ReviewFieldRenderer;
