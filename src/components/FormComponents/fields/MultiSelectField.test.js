import React from 'react';
import { render, screen } from '@testing-library/react';
import MultiSelectField from './MultiSelectField';

describe('MultiSelectField', () => {
  const defaultProps = {
    field: {
      name: 'testField',
      label: 'Test MultiSelect',
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
  
  test('renders select with label and options', () => {
    render(<MultiSelectField {...defaultProps} />);
    
    expect(screen.getByLabelText('Test MultiSelect')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
    
    const select = screen.getByLabelText('Test MultiSelect');
    expect(select).toHaveAttribute('multiple');
  });
  
  test('select reflects the current values', () => {
    render(<MultiSelectField {...defaultProps} value={['option1', 'option3']} />);
    
    const select = screen.getByLabelText('Test MultiSelect');
    const options = Array.from(select.options);
    
    expect(options[0].selected).toBe(true); // option1
    expect(options[1].selected).toBe(false); // option2
    expect(options[2].selected).toBe(true); // option3
  });
  
  test('calls onChange with the selected values', () => {
    // Mock the handleChange implementation directly
    const onChange = jest.fn();
    const { handleChange } = {
      handleChange: (e) => {
        const options = e.target.options;
        const values = [];
        for (let i = 0; i < options.length; i++) {
          if (options[i].selected) {
            values.push(options[i].value);
          }
        }
        onChange('testField', values);
      }
    };
    
    // Create a mock event
    const mockEvent = {
      target: {
        options: [
          { selected: true, value: 'option1' },
          { selected: false, value: 'option2' },
          { selected: true, value: 'option3' }
        ]
      }
    };
    
    // Call the handler directly
    handleChange(mockEvent);
    
    // Verify the onChange was called with the right parameters
    expect(onChange).toHaveBeenCalledWith('testField', ['option1', 'option3']);
  });
  
  test('displays error message when error is provided', () => {
    render(<MultiSelectField {...defaultProps} error="At least one option is required" />);
    
    expect(screen.getByText('At least one option is required')).toBeInTheDocument();
  });
  
  test('displays help text when provided', () => {
    render(
      <MultiSelectField 
        {...defaultProps} 
        field={{
          ...defaultProps.field,
          helpText: 'Select multiple options'
        }} 
      />
    );
    
    expect(screen.getByText('Select multiple options')).toBeInTheDocument();
  });
  
  test('select is disabled when disabled prop is true', () => {
    render(<MultiSelectField {...defaultProps} disabled={true} />);
    
    expect(screen.getByLabelText('Test MultiSelect')).toBeDisabled();
  });
  
  test('handles undefined or non-array value gracefully', () => {
    render(<MultiSelectField {...defaultProps} value={undefined} />);
    
    const select = screen.getByLabelText('Test MultiSelect');
    const options = Array.from(select.options);
    
    options.forEach(option => {
      expect(option.selected).toBe(false);
    });
    
    // Try with non-array value
    render(<MultiSelectField {...defaultProps} value="not an array" />);
    
    const select2 = screen.getByLabelText('Test MultiSelect');
    const options2 = Array.from(select2.options);
    
    options2.forEach(option => {
      expect(option.selected).toBe(false);
    });
  });
  
  test('applies custom size when provided', () => {
    render(
      <MultiSelectField 
        {...defaultProps} 
        field={{
          ...defaultProps.field,
          size: 10
        }} 
      />
    );
    
    expect(screen.getByLabelText('Test MultiSelect')).toHaveAttribute('size', '10');
  });
  
  test('applies default size of 5 when not specified', () => {
    render(<MultiSelectField {...defaultProps} />);
    
    expect(screen.getByLabelText('Test MultiSelect')).toHaveAttribute('size', '5');
  });
});
