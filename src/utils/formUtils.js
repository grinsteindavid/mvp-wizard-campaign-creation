/**
 * Utility functions for form handling
 */

/**
 * Flattens nested form errors into a format that can be used by form components
 * @param {Object} errors - The error object from Joi validation
 * @param {string} prefix - Optional prefix for nested fields
 * @returns {Object} - Flattened errors object
 */
export const flattenErrors = (errors, prefix = '') => {
  if (!errors) return {};
  
  const flattenedErrors = {};
  
  Object.entries(errors).forEach(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'string') {
      // This is an error message
      flattenedErrors[fullKey] = value;
    } else if (Array.isArray(value)) {
      // This is an array of errors
      value.forEach((item, index) => {
        const arrayErrors = flattenErrors(item, `${fullKey}[${index}]`);
        Object.assign(flattenedErrors, arrayErrors);
      });
    } else if (typeof value === 'object' && value !== null) {
      // This is a nested object of errors
      const nestedErrors = flattenErrors(value, fullKey);
      Object.assign(flattenedErrors, nestedErrors);
    }
  });
  
  return flattenedErrors;
};

/**
 * Prepares initial values for a form based on the fields configuration
 * @param {Object} fields - The fields configuration object
 * @returns {Object} - Initial values for the form
 */
export const prepareInitialValues = (fields) => {
  if (!fields) return {};
  
  const initialValues = {};
  
  Object.entries(fields).forEach(([fieldName, fieldConfig]) => {
    switch (fieldConfig.type) {
      case 'checkbox':
        initialValues[fieldName] = false;
        break;
      case 'checkboxes':
        initialValues[fieldName] = [];
        break;
      case 'group':
        initialValues[fieldName] = prepareInitialValues(fieldConfig.fields);
        break;
      case 'array':
        initialValues[fieldName] = [];
        break;
      default:
        initialValues[fieldName] = '';
    }
  });
  
  return initialValues;
};

/**
 * Validates a form field against a validation schema
 * @param {Object} schema - The validation schema
 * @param {string} fieldName - The name of the field to validate
 * @param {any} value - The value to validate
 * @returns {string|null} - Error message or null if valid
 */
export const validateField = (schema, fieldName, value) => {
  if (!schema) return null;
  
  try {
    const fieldSchema = schema.extract(fieldName);
    if (!fieldSchema) return null;
    
    const { error } = fieldSchema.validate(value);
    return error ? error.message : null;
  } catch (error) {
    console.error('Field validation error:', error);
    return null;
  }
};
