/**
 * Validation Service
 * 
 * This service provides methods for validating campaign data and individual fields
 * based on the traffic source. It uses the schemas defined in the schemas directory.
 */

import { schemaCreators } from '../schemas';
import { formatValidationErrors, extractNestedSchema } from '../utils/validationUtils';

/**
 * Validate campaign data based on traffic source
 * @param {string} trafficSource - The traffic source identifier (google, revcontent, yahoo)
 * @param {Object} campaignData - The campaign data to validate
 * @returns {Object} - Validation result with isValid flag and errors object
 */
export const validateCampaign = (trafficSource, campaignData) => {
  const createSchema = schemaCreators[trafficSource];
  
  if (!createSchema) {
    return {
      isValid: false,
      errors: { general: 'Invalid traffic source' }
    };
  }

  try {
    // Create a fresh schema each time to avoid any potential issues with schema reuse
    const schema = createSchema();
    const { error } = schema.validate(campaignData, { abortEarly: false });
    
    if (error) {
      const errors = formatValidationErrors(error);
      
      return {
        isValid: false,
        errors
      };
    }
    
    return {
      isValid: true,
      errors: {}
    };
  } catch (err) {
    return {
      isValid: false,
      errors: { general: 'Validation error occurred' }
    };
  }
};

/**
 * Validate a specific field
 * @param {string} trafficSource - The traffic source identifier
 * @param {string} fieldName - The name of the field to validate (can be dot notation for nested fields)
 * @param {any} value - The value to validate
 * @param {Object} formData - Optional complete form data for context-dependent validation
 * @returns {Object} - Validation result with isValid flag and error message
 */
export const validateField = (trafficSource, fieldName, value, formData = {}) => {
  const createSchema = schemaCreators[trafficSource];
  
  if (!createSchema) {
    return {
      isValid: false,
      error: 'Invalid traffic source'
    };
  }

  try {
    // Create the full schema
    const fullSchema = createSchema();
    
    // Try to extract the field schema (handles both top-level and nested fields)
    const fieldSchema = fullSchema.extract(fieldName) || extractNestedSchema(fullSchema, fieldName);
    
    if (!fieldSchema) {
      // If we can't find a schema for this field, assume it's valid
      return {
        isValid: true,
        error: null
      };
    }
    
    // Validate the field
    const { error } = fieldSchema.validate(value);
    
    return {
      isValid: !error,
      error: error ? error.message : null
    };
  } catch (err) {
    return {
      isValid: false,
      error: 'Validation error occurred'
    };
  }
};
