import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextAreaField from './TextAreaField';

describe('TextAreaField', () => {
  const defaultProps = {
    field: {
      name: 'description',
      label: 'Description',
      placeholder: 'Enter description',
      helpText: 'Provide a detailed description'
    },
    value: '',
    onChange: jest.fn(),
    error: null
  };

  test('renders textarea with label and placeholder', () => {
    render(<TextAreaField {...defaultProps} />);
    
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter description')).toBeInTheDocument();
  });

  test('displays current value', () => {
    render(<TextAreaField {...defaultProps} value="This is a test description" />);
    
    expect(screen.getByLabelText('Description')).toHaveValue('This is a test description');
  });

  test('calls onChange when value changes', () => {
    render(<TextAreaField {...defaultProps} />);
    
    const textarea = screen.getByLabelText('Description');
    fireEvent.change(textarea, { target: { value: 'New description' } });
    
    expect(defaultProps.onChange).toHaveBeenCalledWith('description', 'New description');
  });

  test('displays error message when error is provided', () => {
    render(<TextAreaField {...defaultProps} error="Description is required" />);
    
    expect(screen.getByText('Description is required')).toBeInTheDocument();
    // hasError is a prop for styled-components, not an HTML attribute
  });

  test('displays help text when provided', () => {
    render(<TextAreaField {...defaultProps} />);
    
    expect(screen.getByText('Provide a detailed description')).toBeInTheDocument();
  });

  test('sets rows attribute from field props', () => {
    render(<TextAreaField {...defaultProps} field={{ ...defaultProps.field, rows: 6 }} />);
    
    expect(screen.getByLabelText('Description')).toHaveAttribute('rows', '6');
  });

  test('uses default rows when not specified', () => {
    render(<TextAreaField {...defaultProps} />);
    
    expect(screen.getByLabelText('Description')).toHaveAttribute('rows', '4');
  });

  test('can be disabled', () => {
    render(<TextAreaField {...defaultProps} disabled={true} />);
    
    expect(screen.getByLabelText('Description')).toBeDisabled();
  });
});
