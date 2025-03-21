import React from 'react';
import { render, act } from '@testing-library/react';
import useFieldChangeHandler from './useFieldChangeHandler';

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

describe('useFieldChangeHandler', () => {
  test('should call onChange with the correct parameters when handler is called', () => {
    // Initial render with fieldName and onChange
    const fieldName = 'testField';
    const onChange = jest.fn();
    
    const { result } = renderHook(() => useFieldChangeHandler(fieldName, onChange));
    
    // Simulate a text input change event
    const handler = result.current;
    const event = { target: { value: 'test value' } };
    
    act(() => {
      handler(event);
    });
    
    // onChange should be called with fieldName and value
    expect(onChange).toHaveBeenCalledWith(fieldName, 'test value');
  });
  
  test('should handle checkbox fields correctly', () => {
    // Initial render with fieldName and onChange
    const fieldName = 'testCheckbox';
    const onChange = jest.fn();
    
    const { result } = renderHook(() => useFieldChangeHandler(fieldName, onChange));
    
    // Simulate a checkbox input change event
    const handler = result.current;
    const event = { target: { type: 'checkbox', checked: true } };
    
    act(() => {
      handler(event);
    });
    
    // onChange should be called with fieldName and checked status
    expect(onChange).toHaveBeenCalledWith(fieldName, true);
  });
});
