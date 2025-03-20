/**
 * Formats validation errors from Joi into a more usable format
 * @param {Object} error - Joi validation error object
 * @returns {Object} - Formatted errors object
 */
export const formatValidationErrors = (error) => {
  if (!error) return {};
  
  const errors = {};
  
  error.details.forEach((detail) => {
    const path = detail.path.join('.');
    errors[path] = detail.message;
  });
  
  return errors;
};

/**
 * Extracts a schema for a nested field path
 * @param {Object} schema - Joi schema object
 * @param {string} fieldPath - Dot notation path to the field
 * @returns {Object|null} - Extracted schema or null if not found
 */
export const extractNestedSchema = (schema, fieldPath) => {
  if (!schema || !fieldPath) return null;
  
  const parts = fieldPath.split('.');
  
  // Handle top-level fields
  if (parts.length === 1) {
    return schema.extract(fieldPath);
  }
  
  // Handle nested fields
  let currentSchema = schema;
  for (const part of parts) {
    if (!currentSchema) return null;
    currentSchema = currentSchema.extract(part);
  }
  
  return currentSchema;
};
