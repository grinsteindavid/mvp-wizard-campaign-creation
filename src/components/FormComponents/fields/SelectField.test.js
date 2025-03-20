import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectField from './SelectField';

describe('SelectField', () => {
  const defaultProps = {
    field: {
      name: 'testSelect',
      label: 'Test Select',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
      ]
    },
    value: '',
    onChange: jest.fn(),
    error: null
  };
  
  test('renders select with label and options', () => {
    render(<SelectField {...defaultProps} />);
    
    expect(screen.getByLabelText('Test Select')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });
  
  test('displays current value', () => {
    render(<SelectField {...defaultProps} value="option2" />);
    
    expect(screen.getByLabelText('Test Select')).toHaveValue('option2');
  });
  
  test('calls onChange when value changes', () => {
    const onChange = jest.fn();
    render(<SelectField {...defaultProps} onChange={onChange} />);
    
    fireEvent.change(screen.getByLabelText('Test Select'), {
      target: { value: 'option3' }
    });
    
    expect(onChange).toHaveBeenCalledWith('testSelect', 'option3');
  });
  
  test('displays error message when error is provided', () => {
    render(<SelectField {...defaultProps} error="Please select an option" />);
    
    expect(screen.getByText('Please select an option')).toBeInTheDocument();
  });
  
  test('displays help text when provided', () => {
    render(
      <SelectField 
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
    render(<SelectField {...defaultProps} disabled={true} />);
    
    expect(screen.getByLabelText('Test Select')).toBeDisabled();
  });
  
  test('renders placeholder option when provided', () => {
    render(
      <SelectField 
        {...defaultProps} 
        field={{
          ...defaultProps.field,
          placeholder: 'Select an option'
        }} 
      />
    );
    
    expect(screen.getByText('Select Test Select')).toBeInTheDocument();
  });
});
