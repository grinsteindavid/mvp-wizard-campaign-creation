import { useState, useEffect, useCallback } from 'react';

/**
 * A custom hook that provides debounced value changes
 * @param {any} initialValue - The initial value
 * @param {number} delay - Delay in milliseconds before the value updates
 * @returns {[any, Function, boolean]} - [debouncedValue, setValue, isDebouncing]
 */
const useDebounce = (initialValue, delay = 500) => {
  // Track the latest value that will be debounced
  const [value, setValue] = useState(initialValue);
  
  // Track the debounced value that will be returned
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  
  // Track whether we're currently in a debouncing state
  const [isDebouncing, setIsDebouncing] = useState(false);

  // Update the internal value when initialValue changes from outside
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Handle the debouncing logic
  useEffect(() => {
    // Only debounce if the value has changed
    if (value !== debouncedValue) {
      setIsDebouncing(true);
      
      // Set a timeout to update the debounced value after the delay
      const timer = setTimeout(() => {
        setDebouncedValue(value);
        setIsDebouncing(false);
      }, delay);

      // Clear the timeout if value changes before delay has passed
      return () => {
        clearTimeout(timer);
      };
    }
  }, [value, delay, debouncedValue]);

  // Memoize the setter function to avoid unnecessary re-renders
  const setValueCallback = useCallback((newValue) => {
    setValue(typeof newValue === 'function' ? newValue(value) : newValue);
  }, [value]);

  return [debouncedValue, setValueCallback, isDebouncing];
};

export default useDebounce;
