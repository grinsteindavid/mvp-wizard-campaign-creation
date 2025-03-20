import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckboxField from './CheckboxField';

describe('CheckboxField', () => {
  const defaultProps = {
    field: {
      name: 'testCheckbox',
      label: 'Test Checkbox'
    },
    value: false,
    onChange: jest.fn(),
    error: null
  };
  
  test('renders checkbox with label', () => {
    render(<CheckboxField {...defaultProps} />);
    
    expect(screen.getByLabelText('Test Checkbox')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Checkbox')).not.toBeChecked();
  });
  
  test('displays checked state when value is true', () => {
    render(<CheckboxField {...defaultProps} value={true} />);
    
    expect(screen.getByLabelText('Test Checkbox')).toBeChecked();
  });
  
  test('calls onChange when checkbox is clicked', () => {
    const onChange = jest.fn();
    render(<CheckboxField {...defaultProps} onChange={onChange} />);
    
    fireEvent.click(screen.getByLabelText('Test Checkbox'));
    
    expect(onChange).toHaveBeenCalledWith('testCheckbox', true);
  });
  
  test('toggles value when already checked', () => {
    const onChange = jest.fn();
    render(<CheckboxField {...defaultProps} value={true} onChange={onChange} />);
    
    fireEvent.click(screen.getByLabelText('Test Checkbox'));
    
    expect(onChange).toHaveBeenCalledWith('testCheckbox', false);
  });
  
  test('displays error message when error is provided', () => {
    render(<CheckboxField {...defaultProps} error="This field is required" />);
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });
  
  test('displays help text when provided', () => {
    render(
      <CheckboxField 
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
    render(<CheckboxField {...defaultProps} disabled={true} />);
    
    expect(screen.getByLabelText('Test Checkbox')).toBeDisabled();
  });
});
