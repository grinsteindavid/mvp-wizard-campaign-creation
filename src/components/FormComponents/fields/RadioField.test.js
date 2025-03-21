import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RadioField from './RadioField';

describe('RadioField', () => {
  const defaultProps = {
    field: {
      name: 'testField',
      label: 'Test Radio',
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
  
  test('renders radio buttons with label and options', () => {
    render(<RadioField {...defaultProps} />);
    
    expect(screen.getByText('Test Radio')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
    
    // All radio buttons should be unchecked initially
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(3);
    radioButtons.forEach(radio => {
      expect(radio).not.toBeChecked();
    });
  });
  
  test('radio button reflects the current value', () => {
    render(<RadioField {...defaultProps} value="option2" />);
    
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons[0]).not.toBeChecked(); // option1
    expect(radioButtons[1]).toBeChecked(); // option2
    expect(radioButtons[2]).not.toBeChecked(); // option3
  });
  
  test('calls onChange when a radio button is selected', () => {
    const onChange = jest.fn();
    render(<RadioField {...defaultProps} onChange={onChange} />);
    
    const radioButtons = screen.getAllByRole('radio');
    fireEvent.click(radioButtons[2]); // Option 3
    
    expect(onChange).toHaveBeenCalledWith('testField', 'option3');
  });
  
  test('calls onChange when selection changes', () => {
    const onChange = jest.fn();
    render(<RadioField {...defaultProps} value="option1" onChange={onChange} />);
    
    const radioButtons = screen.getAllByRole('radio');
    fireEvent.click(radioButtons[1]); // Option 2
    
    expect(onChange).toHaveBeenCalledWith('testField', 'option2');
  });
  
  test('displays error message when error is provided', () => {
    render(<RadioField {...defaultProps} error="This field is required" />);
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });
  
  test('displays help text when provided', () => {
    render(
      <RadioField 
        {...defaultProps} 
        field={{
          ...defaultProps.field,
          helpText: 'Select one option'
        }} 
      />
    );
    
    expect(screen.getByText('Select one option')).toBeInTheDocument();
  });
  
  test('radio buttons are disabled when disabled prop is true', () => {
    render(<RadioField {...defaultProps} disabled={true} />);
    
    const radioButtons = screen.getAllByRole('radio');
    radioButtons.forEach(radio => {
      expect(radio).toBeDisabled();
    });
  });
  
  test('works correctly with no selection', () => {
    render(<RadioField {...defaultProps} value={null} />);
    
    const radioButtons = screen.getAllByRole('radio');
    radioButtons.forEach(radio => {
      expect(radio).not.toBeChecked();
    });
    
    // Try with undefined value
    render(<RadioField {...defaultProps} value={undefined} />);
    
    const radioButtons2 = screen.getAllByRole('radio');
    radioButtons2.forEach(radio => {
      expect(radio).not.toBeChecked();
    });
  });
});
