import { useCallback } from 'react';

/**
 * Custom hook that creates a memoized change handler for form fields
 * 
 * @param {string} fieldName - The name of the field
 * @param {Function} onChange - The onChange function to call
 * @returns {Function} - The memoized change handler function
 */
const useFieldChangeHandler = (fieldName, onChange) => {
  return useCallback((e) => {
    const value = e.target.type === 'checkbox' 
      ? e.target.checked 
      : e.target.value;
    
    onChange(fieldName, value);
  }, [fieldName, onChange]);
};

export default useFieldChangeHandler;
