import { useState, useCallback } from 'react';

/**
 * Custom hook for form validation
 * 
 * @param {Object} schema - Joi validation schema
 * @param {Object} initialValues - Initial form values
 * @returns {Object} - Validation state and functions
 */
const useFormValidation = (schema, initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  
  /**
   * Validate the form values against the schema
   * @returns {boolean} - Whether the form is valid
   */
  const validate = useCallback(() => {
    if (!schema) return true;
    
    try {
      // Validate the values against the schema
      const result = schema.validate(values, { abortEarly: false });
      
      if (result.error) {
        // Format errors into a more usable structure
        const formattedErrors = {};
        
        result.error.details.forEach(error => {
          // Get the path to the field with the error
          const path = error.path.join('.');
          formattedErrors[path] = error.message;
        });
        
        setErrors(formattedErrors);
        setIsValid(false);
        return false;
      } else {
        // Clear errors if validation passes
        setErrors({});
        setIsValid(true);
        return true;
      }
    } catch (error) {
      console.error('Validation error:', error);
      setIsValid(false);
      return false;
    }
  }, [schema, values]);
  
  /**
   * Update a field value and optionally validate
   * @param {string} name - Field name
   * @param {any} value - Field value
   * @param {boolean} validateOnChange - Whether to validate on change
   */
  const updateField = useCallback((name, value, validateOnChange = false) => {
    setValues(prevValues => {
      const newValues = { ...prevValues, [name]: value };
      return newValues;
    });
    
    // Clear the error for this field
    if (errors[name]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    // Validate if requested
    if (validateOnChange) {
      setTimeout(() => validate(), 0);
    }
  }, [errors, validate]);
  
  return {
    values,
    errors,
    isValid,
    updateField,
    validate,
    setValues
  };
};

export default useFormValidation;
