import React, { createContext, useContext } from 'react';
import useFormValidation from '../hooks/useFormValidation';

// Create the context
const FormContext = createContext();

/**
 * Provider component for form state and validation
 * 
 * @param {Object} props - Component props
 * @param {Object} props.schema - Joi validation schema
 * @param {Object} props.initialValues - Initial form values
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element}
 */
export const FormProvider = ({ schema, initialValues = {}, children }) => {
  // Use the form validation hook
  const {
    values,
    errors,
    isValid,
    updateField,
    validate,
    setValues
  } = useFormValidation(schema, initialValues);
  
  // Create the context value
  const contextValue = {
    values,
    errors,
    isValid,
    updateField,
    validate,
    setValues
  };
  
  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
};

/**
 * Custom hook for using the form context
 * @returns {Object} - Form context value
 */
export const useForm = () => {
  const context = useContext(FormContext);
  
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  
  return context;
};

export default FormContext;
