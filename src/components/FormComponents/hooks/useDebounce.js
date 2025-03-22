import { useState, useEffect, useCallback } from 'react';

/**
 * A custom hook that provides debounced value changes
 * @param {any} initialValue - The initial value
 * @param {number} delay - Delay in milliseconds before the value updates
 * @returns {[any, Function, boolean]} - [debouncedValue, setValue, isDebouncing]
 */
const useDebounce = (initialValue, delay = 500) => {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    // Set debouncing state to true when value changes
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
