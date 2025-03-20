import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ArrayField from './ArrayField';

describe('ArrayField', () => {
  const mockField = {
    type: 'array',
    name: 'addresses',
    label: 'Addresses',
    fields: {
      street: {
        type: 'text',
        name: 'street',
        label: 'Street'
      },
      city: {
        type: 'text',
        name: 'city',
        label: 'City'
      }
    }
  };
  
  const mockValues = [
    { street: '123 Main St', city: 'New York' },
    { street: '456 Oak Ave', city: 'Los Angeles' }
  ];
  
  test('renders array title and items', () => {
    render(
      <ArrayField 
        field={mockField} 
        value={mockValues} 
        onChange={() => {}} 
        errors={{}} 
      />
    );
    
    expect(screen.getByText('Addresses')).toBeInTheDocument();
    expect(screen.getAllByLabelText('Street')).toHaveLength(2);
    expect(screen.getAllByLabelText('City')).toHaveLength(2);
  });
  
  test('displays item values correctly', () => {
    render(
      <ArrayField 
        field={mockField} 
        value={mockValues} 
        onChange={() => {}} 
        errors={{}} 
      />
    );
    
    const streetInputs = screen.getAllByLabelText('Street');
    const cityInputs = screen.getAllByLabelText('City');
    
    expect(streetInputs[0]).toHaveValue('123 Main St');
    expect(cityInputs[0]).toHaveValue('New York');
    expect(streetInputs[1]).toHaveValue('456 Oak Ave');
    expect(cityInputs[1]).toHaveValue('Los Angeles');
  });
  
  test('adds a new item when Add button is clicked', () => {
    const handleChange = jest.fn();
    
    render(
      <ArrayField 
        field={mockField} 
        value={mockValues} 
        onChange={handleChange} 
        errors={{}} 
      />
    );
    
    fireEvent.click(screen.getByText('Add Address'));
    
    expect(handleChange).toHaveBeenCalledWith('addresses', [
      ...mockValues,
      { street: '', city: '' }
    ]);
  });
  
  test('removes an item when Remove button is clicked', () => {
    const handleChange = jest.fn();
    
    render(
      <ArrayField 
        field={mockField} 
        value={mockValues} 
        onChange={handleChange} 
        errors={{}} 
      />
    );
    
    // Click the first remove button (×)
    fireEvent.click(screen.getAllByText('×')[0]);
    
    expect(handleChange).toHaveBeenCalledWith('addresses', [
      { street: '456 Oak Ave', city: 'Los Angeles' }
    ]);
  });
  
  test('updates an item field when its value changes', () => {
    const handleChange = jest.fn();
    
    render(
      <ArrayField 
        field={mockField} 
        value={mockValues} 
        onChange={handleChange} 
        errors={{}} 
      />
    );
    
    fireEvent.change(screen.getAllByLabelText('Street')[0], {
      target: { value: '789 Pine St' }
    });
    
    expect(handleChange).toHaveBeenCalledWith('addresses', [
      { street: '789 Pine St', city: 'New York' },
      { street: '456 Oak Ave', city: 'Los Angeles' }
    ]);
  });
});
