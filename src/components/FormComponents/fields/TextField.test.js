import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextField from './TextField';

describe('TextField', () => {
  const defaultProps = {
    field: {
      name: 'testField',
      label: 'Test Field',
      placeholder: 'Enter value'
    },
    value: '',
    onChange: jest.fn(),
    error: null
  };
  
  test('renders text input with label and placeholder', () => {
    render(<TextField {...defaultProps} />);
    
    expect(screen.getByLabelText('Test Field')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter value')).toBeInTheDocument();
  });
  
  test('displays current value', () => {
    render(<TextField {...defaultProps} value="Test Value" />);
    
    expect(screen.getByLabelText('Test Field')).toHaveValue('Test Value');
  });
  
  test('calls onChange when value changes', () => {
    const onChange = jest.fn();
    render(<TextField {...defaultProps} onChange={onChange} />);
    
    fireEvent.change(screen.getByLabelText('Test Field'), {
      target: { value: 'New Value' }
    });
    
    expect(onChange).toHaveBeenCalledWith('testField', 'New Value');
  });
  
  test('displays error message when error is provided', () => {
    render(<TextField {...defaultProps} error="This field is required" />);
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });
  
  test('displays help text when provided', () => {
    render(
      <TextField 
        {...defaultProps} 
        field={{
          ...defaultProps.field,
          helpText: 'This is help text'
        }} 
      />
    );
    
    expect(screen.getByText('This is help text')).toBeInTheDocument();
  });
  
  test('renders as disabled when disabled prop is true', () => {
    render(<TextField {...defaultProps} disabled={true} />);
    
    expect(screen.getByLabelText('Test Field')).toBeDisabled();
  });
  
  test('renders with different input types based on field type', () => {
    // Email type
    const { rerender } = render(
      <TextField 
        {...defaultProps} 
        field={{
          ...defaultProps.field,
          type: 'email'
        }} 
      />
    );
    
    expect(screen.getByLabelText('Test Field')).toHaveAttribute('type', 'email');
    
    // Number type
    rerender(
      <TextField 
        {...defaultProps} 
        field={{
          ...defaultProps.field,
          type: 'number'
        }} 
      />
    );
    
    expect(screen.getByLabelText('Test Field')).toHaveAttribute('type', 'number');
  });
});
