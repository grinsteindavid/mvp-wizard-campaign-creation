import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { RevContentTrafficSourceProvider, useRevContentTrafficSource, revContentTrafficSourceActions } from './RevContentTrafficSourceContext';

// Test component that uses the RevContent traffic source context
const TestComponent = () => {
  const { 
    state, 
    updateField, 
    dispatch 
  } = useRevContentTrafficSource();

  return (
    <div>
      <div data-testid="campaign-name">{state.campaignName}</div>
      <div data-testid="target-url">{state.targetUrl}</div>
      <div data-testid="bid-amount">{state.bidAmount}</div>
      <div data-testid="daily-budget">{state.dailyBudget}</div>
      <div data-testid="targeting-countries">{state.targeting.countries.length}</div>
      <div data-testid="targeting-devices">{state.targeting.devices.length}</div>
      <button 
        data-testid="update-campaign-name" 
        onClick={() => updateField('campaignName', 'RevContent Test Campaign')}
      >
        Update Campaign Name
      </button>
      <button 
        data-testid="update-target-url" 
        onClick={() => updateField('targetUrl', 'https://example.com')}
      >
        Update Target URL
      </button>
      <button 
        data-testid="add-country" 
        onClick={() => dispatch({ 
          type: revContentTrafficSourceActions.UPDATE_TARGETING, 
          field: 'countries', 
          value: [...state.targeting.countries, 'US'] 
        })}
      >
        Add Country
      </button>
      <button 
        data-testid="add-device" 
        onClick={() => dispatch({ 
          type: revContentTrafficSourceActions.UPDATE_TARGETING, 
          field: 'devices', 
          value: [...state.targeting.devices, 'mobile'] 
        })}
      >
        Add Device
      </button>
    </div>
  );
};

describe('RevContentTrafficSourceContext', () => {
  test('provides initial state values', () => {
    render(
      <RevContentTrafficSourceProvider>
        <TestComponent />
      </RevContentTrafficSourceProvider>
    );

    expect(screen.getByTestId('campaign-name').textContent).toBe('');
    expect(screen.getByTestId('target-url').textContent).toBe('');
    expect(screen.getByTestId('bid-amount').textContent).toBe('');
    expect(screen.getByTestId('daily-budget').textContent).toBe('');
    expect(screen.getByTestId('targeting-countries').textContent).toBe('0');
    expect(screen.getByTestId('targeting-devices').textContent).toBe('0');
  });

  test('updateField updates a field value', () => {
    render(
      <RevContentTrafficSourceProvider>
        <TestComponent />
      </RevContentTrafficSourceProvider>
    );

    act(() => {
      screen.getByTestId('update-campaign-name').click();
    });

    expect(screen.getByTestId('campaign-name').textContent).toBe('RevContent Test Campaign');

    act(() => {
      screen.getByTestId('update-target-url').click();
    });

    expect(screen.getByTestId('target-url').textContent).toBe('https://example.com');
  });

  test('UPDATE_TARGETING action updates targeting fields', () => {
    render(
      <RevContentTrafficSourceProvider>
        <TestComponent />
      </RevContentTrafficSourceProvider>
    );

    expect(screen.getByTestId('targeting-countries').textContent).toBe('0');
    expect(screen.getByTestId('targeting-devices').textContent).toBe('0');

    act(() => {
      screen.getByTestId('add-country').click();
    });

    expect(screen.getByTestId('targeting-countries').textContent).toBe('1');

    act(() => {
      screen.getByTestId('add-device').click();
    });

    expect(screen.getByTestId('targeting-devices').textContent).toBe('1');
  });

  test('revContentTrafficSourceActions exports the correct action types', () => {
    expect(revContentTrafficSourceActions).toEqual({
      UPDATE_FIELD: 'UPDATE_FIELD',
      SET_VALIDATION_RESULT: 'SET_VALIDATION_RESULT',
      SET_SUBMITTING: 'SET_SUBMITTING',
      SET_SUBMITTED: 'SET_SUBMITTED',
      RESET_FORM: 'RESET_FORM',
      UPDATE_TARGETING: 'UPDATE_TARGETING'
    });
  });

  test('throws error when useRevContentTrafficSource is used outside of RevContentTrafficSourceProvider', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useRevContentTrafficSource must be used within a RevContentTrafficSourceProvider');

    // Restore console.error
    console.error = originalError;
  });
});
