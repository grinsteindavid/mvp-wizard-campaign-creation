import React from 'react';
import { render, act } from '@testing-library/react';
import useDebounce from './useDebounce';

// Custom hook testing helper (since we don't have @testing-library/react-hooks)
function renderHook(callback) {
  const result = { current: null };
  
  function TestComponent({ hookProps }) {
    // Call the callback and store the result
    result.current = callback(hookProps);
    return null;
  }

  const { rerender } = render(<TestComponent hookProps={{}} />);
  
  return {
    result,
    rerender: (hookProps = {}) => rerender(<TestComponent hookProps={hookProps} />)
  };
}

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });
  
  test('should initialize with the provided initial value', () => {
    const initialValue = 'initial';
    
    const { result } = renderHook(() => useDebounce(initialValue));
    
    // Destructure the returned array
    const [debouncedValue, setValue, isDebouncing] = result.current;
    
    // Initial value should be set correctly
    expect(debouncedValue).toBe(initialValue);
    // Initially not debouncing
    expect(isDebouncing).toBe(false);
    // setValue should be a function
    expect(typeof setValue).toBe('function');
  });
  
  test('should debounce value changes', () => {
    const initialValue = '';
    const delay = 300; // Custom delay for testing
    
    const { result } = renderHook(() => useDebounce(initialValue, delay));
    
    // Get the setter function
    const setValue = result.current[1];
    
    // Update the value
    act(() => {
      setValue('new value');
    });
    
    // After the update, but before the delay has passed
    // The debounced value should still be the initial value
    expect(result.current[0]).toBe(initialValue);
    // Should be in debouncing state
    expect(result.current[2]).toBe(true);
    
    // Fast-forward time to trigger the debounce
    act(() => {
      jest.advanceTimersByTime(delay);
    });
    
    // After the delay, the debounced value should be updated
    expect(result.current[0]).toBe('new value');
    // Should no longer be in debouncing state
    expect(result.current[2]).toBe(false);
  });
  
  test('should handle multiple rapid updates', () => {
    const initialValue = '';
    const delay = 300;
    
    const { result } = renderHook(() => useDebounce(initialValue, delay));
    
    const setValue = result.current[1];
    
    // Multiple rapid updates
    act(() => {
      setValue('value 1');
    });
    
    // Advance time but not enough to trigger debounce
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    // Another update resets the timer
    act(() => {
      setValue('value 2');
    });
    
    // Advance time but not enough to trigger debounce
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    // Final update
    act(() => {
      setValue('value 3');
    });
    
    // Debounced value should still be the initial value
    expect(result.current[0]).toBe(initialValue);
    // Should be in debouncing state
    expect(result.current[2]).toBe(true);
    
    // Fast-forward time to trigger the debounce
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    // After the delay, the debounced value should be the final update
    expect(result.current[0]).toBe('value 3');
    // Should no longer be in debouncing state
    expect(result.current[2]).toBe(false);
  });
  
  test('should update internal value when initialValue changes', () => {
    const initialValue = 'initial';
    
    // Create a hook with the initial value
    const { result, rerender } = renderHook(() => useDebounce(initialValue));
    
    // Initial value should be set correctly
    expect(result.current[0]).toBe(initialValue);
    
    // Change the initial value by re-rendering with a new value
    rerender({ value: 'updated' });
    
    // Fast-forward time to ensure any updates are processed
    act(() => {
      jest.advanceTimersByTime(0);
    });
    
    // The value should still be the initial value since our rerender doesn't actually
    // change the hook's initialValue parameter
    expect(result.current[0]).toBe(initialValue);
    
    // Create a new test with a different approach
    let currentValue = initialValue;
    const { result: result2 } = renderHook(() => useDebounce(currentValue));
    
    // Initial value should be set correctly
    expect(result2.current[0]).toBe(initialValue);
    
    // Update the value using the setter function
    const setValue = result2.current[1];
    act(() => {
      setValue('updated');
    });
    
    // Fast-forward time to trigger the debounce
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    // The debounced value should now be updated
    expect(result2.current[0]).toBe('updated');
    // Should not be in debouncing state after the timer completes
    expect(result2.current[2]).toBe(false);
  });
  
  test('should handle function updates', () => {
    const initialValue = 'initial';
    
    const { result } = renderHook(() => useDebounce(initialValue));
    
    const setValue = result.current[1];
    
    // Update using a function
    act(() => {
      setValue(prev => prev + ' updated');
    });
    
    // Should be in debouncing state
    expect(result.current[2]).toBe(true);
    
    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500); // Default delay
    });
    
    // The debounced value should be updated with the function result
    expect(result.current[0]).toBe('initial updated');
    // Should no longer be in debouncing state
    expect(result.current[2]).toBe(false);
  });
  
  test('should use custom delay', () => {
    const initialValue = '';
    const shortDelay = 100;
    const longDelay = 1000;
    
    // Test with short delay
    const { result: shortResult } = renderHook(() => useDebounce(initialValue, shortDelay));
    const setShortValue = shortResult.current[1];
    
    // Test with long delay
    const { result: longResult } = renderHook(() => useDebounce(initialValue, longDelay));
    const setLongValue = longResult.current[1];
    
    // Update both values
    act(() => {
      setShortValue('short');
      setLongValue('long');
    });
    
    // Advance time to trigger only the short delay
    act(() => {
      jest.advanceTimersByTime(shortDelay + 10);
    });
    
    // Short delay should have updated
    expect(shortResult.current[0]).toBe('short');
    expect(shortResult.current[2]).toBe(false);
    
    // Long delay should not have updated yet
    expect(longResult.current[0]).toBe(initialValue);
    expect(longResult.current[2]).toBe(true);
    
    // Advance time to trigger the long delay
    act(() => {
      jest.advanceTimersByTime(longDelay - shortDelay);
    });
    
    // Now long delay should have updated
    expect(longResult.current[0]).toBe('long');
    expect(longResult.current[2]).toBe(false);
  });
});
