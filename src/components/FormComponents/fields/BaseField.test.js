import React from 'react';
import { render, screen } from '@testing-library/react';
import BaseField from './BaseField';

describe('BaseField', () => {
  const defaultProps = {
    field: {
      name: 'testField',
      label: 'Test Field'
    },
    children: <input id="testField" />,
    error: null
  };
  
  test('renders with label', () => {
    render(<BaseField {...defaultProps} />);
    
    expect(screen.getByText('Test Field')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
  
  test('displays error message when error is provided', () => {
    render(<BaseField {...defaultProps} error="This field is required" />);
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });
  
  test('displays help text when provided', () => {
    render(
      <BaseField 
        {...defaultProps} 
        field={{
          ...defaultProps.field,
          helpText: 'This is help text'
        }} 
      />
    );
    
    expect(screen.getByText('This is help text')).toBeInTheDocument();
  });
  
  test('renders children correctly', () => {
    const testId = 'test-child';
    const children = <div data-testid={testId}>Child Component</div>;
    
    render(<BaseField {...defaultProps} children={children} />);
    
    expect(screen.getByTestId(testId)).toBeInTheDocument();
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });
});
