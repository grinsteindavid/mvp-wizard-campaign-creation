import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckboxesField from './CheckboxesField';

describe('CheckboxesField', () => {
  const defaultProps = {
    field: {
      name: 'testField',
      label: 'Test Checkboxes',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
      ]
    },
    value: [],
    onChange: jest.fn(),
    error: null
  };
  
  test('renders checkboxes with label and options', () => {
    render(<CheckboxesField {...defaultProps} />);
    
    expect(screen.getByText('Test Checkboxes')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
    
    // All checkboxes should be unchecked initially
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);
    checkboxes.forEach(checkbox => {
      expect(checkbox).not.toBeChecked();
    });
  });
  
  test('checkboxes reflect the current value', () => {
    render(<CheckboxesField {...defaultProps} value={['option1', 'option3']} />);
    
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked(); // option1
    expect(checkboxes[1]).not.toBeChecked(); // option2
    expect(checkboxes[2]).toBeChecked(); // option3
  });
  
  test('calls onChange when a checkbox is checked', () => {
    const onChange = jest.fn();
    render(<CheckboxesField {...defaultProps} onChange={onChange} />);
    
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    
    expect(onChange).toHaveBeenCalledWith('testField', ['option1']);
  });
  
  test('calls onChange to add value when a checkbox is checked', () => {
    const onChange = jest.fn();
    render(<CheckboxesField {...defaultProps} value={['option2']} onChange={onChange} />);
    
    const checkbox = screen.getAllByRole('checkbox')[2]; // Option 3
    fireEvent.click(checkbox);
    
    expect(onChange).toHaveBeenCalledWith('testField', ['option2', 'option3']);
  });
  
  test('calls onChange to remove value when a checkbox is unchecked', () => {
    const onChange = jest.fn();
    render(<CheckboxesField {...defaultProps} value={['option1', 'option2']} onChange={onChange} />);
    
    const checkbox = screen.getAllByRole('checkbox')[0]; // Option 1
    fireEvent.click(checkbox);
    
    expect(onChange).toHaveBeenCalledWith('testField', ['option2']);
  });
  
  test('displays error message when error is provided', () => {
    render(<CheckboxesField {...defaultProps} error="At least one option is required" />);
    
    expect(screen.getByText('At least one option is required')).toBeInTheDocument();
  });
  
  test('displays help text when provided', () => {
    render(
      <CheckboxesField 
        {...defaultProps} 
        field={{
          ...defaultProps.field,
          helpText: 'Select all that apply'
        }} 
      />
    );
    
    expect(screen.getByText('Select all that apply')).toBeInTheDocument();
  });
  
  test('checkboxes are disabled when disabled prop is true', () => {
    render(<CheckboxesField {...defaultProps} disabled={true} />);
    
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach(checkbox => {
      expect(checkbox).toBeDisabled();
    });
  });
  
  test('handles undefined or non-array value gracefully', () => {
    render(<CheckboxesField {...defaultProps} value={undefined} />);
    
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach(checkbox => {
      expect(checkbox).not.toBeChecked();
    });
    
    // Try with non-array value
    render(<CheckboxesField {...defaultProps} value="not an array" />);
    
    const checkboxes2 = screen.getAllByRole('checkbox');
    checkboxes2.forEach(checkbox => {
      expect(checkbox).not.toBeChecked();
    });
  });
});
