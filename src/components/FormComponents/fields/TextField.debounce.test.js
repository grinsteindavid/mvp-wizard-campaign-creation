import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import TextField from './TextField';

describe('TextField with debounce', () => {
  const defaultProps = {
    field: {
      name: 'testField',
      label: 'Test Field',
      placeholder: 'Enter value'
    },
    value: '',
    onChange: jest.fn(),
    error: null,
    debounceDelay: 300, // Set a shorter delay for testing
    useDebouncing: true // Explicitly enable debouncing for these tests
  };
  
  beforeEach(() => {
    jest.useFakeTimers();
  });
  
  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });
  
  test('debounces input changes', () => {
    const onChange = jest.fn();
    render(<TextField {...defaultProps} onChange={onChange} />);
    
    // Type in the input field
    const input = screen.getByLabelText('Test Field');
    fireEvent.change(input, { target: { value: 'T' } });
    
    // onChange should not be called immediately
    expect(onChange).not.toHaveBeenCalled();
    
    // Type more characters in quick succession
    fireEvent.change(input, { target: { value: 'Te' } });
    fireEvent.change(input, { target: { value: 'Tes' } });
    fireEvent.change(input, { target: { value: 'Test' } });
    
    // onChange should still not be called
    expect(onChange).not.toHaveBeenCalled();
    
    // Fast-forward time to trigger the debounce
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    // Now onChange should be called with the final value
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('testField', 'Test');
  });
  
  test('indicates debouncing state with data attribute', () => {
    render(<TextField {...defaultProps} />);
    
    const input = screen.getByLabelText('Test Field');
    
    // Initially not debouncing
    expect(input).toHaveAttribute('data-debouncing', 'false');
    
    // Start typing to trigger debounce
    fireEvent.change(input, { target: { value: 'Test' } });
    
    // Should be debouncing now
    expect(input).toHaveAttribute('data-debouncing', 'true');
    
    // After debounce time passes
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    // Should no longer be debouncing
    expect(input).toHaveAttribute('data-debouncing', 'false');
  });
  
  test('uses custom debounce delay when provided', () => {
    const onChange = jest.fn();
    const customDelay = 100;
    
    render(
      <TextField 
        {...defaultProps} 
        onChange={onChange} 
        debounceDelay={customDelay} 
      />
    );
    
    const input = screen.getByLabelText('Test Field');
    fireEvent.change(input, { target: { value: 'Test' } });
    
    // Advance time but not enough to trigger debounce
    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(onChange).not.toHaveBeenCalled();
    
    // Advance time to trigger debounce with custom delay
    act(() => {
      jest.advanceTimersByTime(50); // Total: 100ms
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
  
  test('updates immediately when receiving new value prop', () => {
    const { rerender } = render(<TextField {...defaultProps} />);
    
    const input = screen.getByLabelText('Test Field');
    expect(input).toHaveValue('');
    
    // Update the component with a new value prop
    rerender(<TextField {...defaultProps} value="New Value" />);
    
    // Input should immediately reflect the new value
    expect(input).toHaveValue('New Value');
  });
});
