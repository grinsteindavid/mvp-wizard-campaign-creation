import React from 'react';
import { render, screen } from '@testing-library/react';
import FormField from './FormField';

describe('FormField', () => {
  test('renders the appropriate field component based on field type', () => {
    const textField = {
      type: 'text',
      name: 'testField',
      label: 'Test Field'
    };
    
    render(
      <FormField 
        field={textField} 
        value="" 
        onChange={() => {}} 
        error={null} 
      />
    );
    
    expect(screen.getByLabelText('Test Field')).toBeInTheDocument();
  });
  
  test('displays error message for unsupported field type', () => {
    const unsupportedField = {
      type: 'unsupported',
      name: 'testField',
      label: 'Test Field'
    };
    
    render(
      <FormField 
        field={unsupportedField} 
        value="" 
        onChange={() => {}} 
        error={null} 
      />
    );
    
    expect(screen.getByText('Unsupported field type: unsupported')).toBeInTheDocument();
  });
});
