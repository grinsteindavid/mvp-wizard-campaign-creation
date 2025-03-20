import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { GoogleTrafficSourceProvider, useGoogleTrafficSource, googleTrafficSourceActions } from './GoogleTrafficSourceContext';

// Test component that uses the Google traffic source context
const TestComponent = () => {
  const { 
    state, 
    updateField, 
    dispatch 
  } = useGoogleTrafficSource();

  return (
    <div>
      <div data-testid="campaign-name">{state.campaignName}</div>
      <div data-testid="daily-budget">{state.dailyBudget}</div>
      <div data-testid="bid-strategy">{state.bidStrategy}</div>
      <div data-testid="keywords">{state.keywords}</div>
      <div data-testid="ad-groups-count">{state.adGroups.length}</div>
      {state.adGroups.map((group, index) => (
        <div key={index} data-testid={`ad-group-${index}`}>
          {group.name} - {group.cpc}
        </div>
      ))}
      <button 
        data-testid="update-campaign-name" 
        onClick={() => updateField('campaignName', 'Google Test Campaign')}
      >
        Update Campaign Name
      </button>
      <button 
        data-testid="update-daily-budget" 
        onClick={() => updateField('dailyBudget', '100')}
      >
        Update Daily Budget
      </button>
      <button 
        data-testid="add-ad-group" 
        onClick={() => dispatch({ type: googleTrafficSourceActions.ADD_AD_GROUP })}
      >
        Add Ad Group
      </button>
      <button 
        data-testid="update-ad-group" 
        onClick={() => {
          if (state.adGroups.length > 0) {
            dispatch({ 
              type: googleTrafficSourceActions.UPDATE_AD_GROUP, 
              index: 0, 
              field: 'name', 
              value: 'Test Group' 
            });
          }
        }}
      >
        Update Ad Group
      </button>
      <button 
        data-testid="remove-ad-group" 
        onClick={() => {
          if (state.adGroups.length > 0) {
            dispatch({ 
              type: googleTrafficSourceActions.REMOVE_AD_GROUP, 
              index: 0 
            });
          }
        }}
      >
        Remove Ad Group
      </button>
    </div>
  );
};

describe('GoogleTrafficSourceContext', () => {
  test('provides initial state values', () => {
    render(
      <GoogleTrafficSourceProvider>
        <TestComponent />
      </GoogleTrafficSourceProvider>
    );

    expect(screen.getByTestId('campaign-name').textContent).toBe('');
    expect(screen.getByTestId('daily-budget').textContent).toBe('');
    expect(screen.getByTestId('bid-strategy').textContent).toBe('');
    expect(screen.getByTestId('keywords').textContent).toBe('');
    expect(screen.getByTestId('ad-groups-count').textContent).toBe('0');
  });

  test('updateField updates a field value', () => {
    render(
      <GoogleTrafficSourceProvider>
        <TestComponent />
      </GoogleTrafficSourceProvider>
    );

    act(() => {
      screen.getByTestId('update-campaign-name').click();
    });

    expect(screen.getByTestId('campaign-name').textContent).toBe('Google Test Campaign');

    act(() => {
      screen.getByTestId('update-daily-budget').click();
    });

    expect(screen.getByTestId('daily-budget').textContent).toBe('100');
  });

  test('ADD_AD_GROUP action adds a new ad group', () => {
    render(
      <GoogleTrafficSourceProvider>
        <TestComponent />
      </GoogleTrafficSourceProvider>
    );

    expect(screen.getByTestId('ad-groups-count').textContent).toBe('0');

    act(() => {
      screen.getByTestId('add-ad-group').click();
    });

    expect(screen.getByTestId('ad-groups-count').textContent).toBe('1');
  });

  test('UPDATE_AD_GROUP action updates an ad group', () => {
    render(
      <GoogleTrafficSourceProvider>
        <TestComponent />
      </GoogleTrafficSourceProvider>
    );

    // First add an ad group
    act(() => {
      screen.getByTestId('add-ad-group').click();
    });

    // Then update it
    act(() => {
      screen.getByTestId('update-ad-group').click();
    });

    expect(screen.getByTestId('ad-group-0').textContent).toBe('Test Group - ');
  });

  test('REMOVE_AD_GROUP action removes an ad group', () => {
    render(
      <GoogleTrafficSourceProvider>
        <TestComponent />
      </GoogleTrafficSourceProvider>
    );

    // First add an ad group
    act(() => {
      screen.getByTestId('add-ad-group').click();
    });

    expect(screen.getByTestId('ad-groups-count').textContent).toBe('1');

    // Then remove it
    act(() => {
      screen.getByTestId('remove-ad-group').click();
    });

    expect(screen.getByTestId('ad-groups-count').textContent).toBe('0');
  });

  test('googleTrafficSourceActions exports the correct action types', () => {
    expect(googleTrafficSourceActions).toEqual({
      UPDATE_FIELD: 'UPDATE_FIELD',
      SET_VALIDATION_RESULT: 'SET_VALIDATION_RESULT',
      SET_SUBMITTING: 'SET_SUBMITTING',
      SET_SUBMITTED: 'SET_SUBMITTED',
      RESET_FORM: 'RESET_FORM',
      ADD_AD_GROUP: 'ADD_AD_GROUP',
      REMOVE_AD_GROUP: 'REMOVE_AD_GROUP',
      UPDATE_AD_GROUP: 'UPDATE_AD_GROUP'
    });
  });

  test('throws error when useGoogleTrafficSource is used outside of GoogleTrafficSourceProvider', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useGoogleTrafficSource must be used within a GoogleTrafficSourceProvider');

    // Restore console.error
    console.error = originalError;
  });
});
