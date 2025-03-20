import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { YahooTrafficSourceProvider, useYahooTrafficSource, yahooTrafficSourceActions } from './YahooTrafficSourceContext';

// Test component that uses the Yahoo traffic source context
const TestComponent = () => {
  const { 
    state, 
    updateField, 
    dispatch 
  } = useYahooTrafficSource();

  return (
    <div>
      <div data-testid="campaign-name">{state.campaignName}</div>
      <div data-testid="campaign-objective">{state.campaignObjective}</div>
      <div data-testid="start-date">{state.startDate}</div>
      <div data-testid="end-date">{state.endDate}</div>
      <div data-testid="budget-amount">{state.budget.amount}</div>
      <div data-testid="budget-type">{state.budget.type}</div>
      <div data-testid="bidding-strategy">{state.bidding.strategy}</div>
      <div data-testid="bidding-amount">{state.bidding.amount}</div>
      <button 
        data-testid="update-campaign-name" 
        onClick={() => updateField('campaignName', 'Yahoo Test Campaign')}
      >
        Update Campaign Name
      </button>
      <button 
        data-testid="update-campaign-objective" 
        onClick={() => updateField('campaignObjective', 'awareness')}
      >
        Update Campaign Objective
      </button>
      <button 
        data-testid="update-budget" 
        onClick={() => dispatch({ 
          type: yahooTrafficSourceActions.UPDATE_BUDGET, 
          field: 'amount', 
          value: '500' 
        })}
      >
        Update Budget Amount
      </button>
      <button 
        data-testid="update-budget-type" 
        onClick={() => dispatch({ 
          type: yahooTrafficSourceActions.UPDATE_BUDGET, 
          field: 'type', 
          value: 'daily' 
        })}
      >
        Update Budget Type
      </button>
      <button 
        data-testid="update-bidding" 
        onClick={() => dispatch({ 
          type: yahooTrafficSourceActions.UPDATE_BIDDING, 
          field: 'strategy', 
          value: 'manual' 
        })}
      >
        Update Bidding Strategy
      </button>
    </div>
  );
};

describe('YahooTrafficSourceContext', () => {
  test('provides initial state values', () => {
    render(
      <YahooTrafficSourceProvider>
        <TestComponent />
      </YahooTrafficSourceProvider>
    );

    expect(screen.getByTestId('campaign-name').textContent).toBe('');
    expect(screen.getByTestId('campaign-objective').textContent).toBe('');
    expect(screen.getByTestId('start-date').textContent).toBe('');
    expect(screen.getByTestId('end-date').textContent).toBe('');
    expect(screen.getByTestId('budget-amount').textContent).toBe('');
    expect(screen.getByTestId('budget-type').textContent).toBe('');
    expect(screen.getByTestId('bidding-strategy').textContent).toBe('');
    expect(screen.getByTestId('bidding-amount').textContent).toBe('');
  });

  test('updateField updates a field value', () => {
    render(
      <YahooTrafficSourceProvider>
        <TestComponent />
      </YahooTrafficSourceProvider>
    );

    act(() => {
      screen.getByTestId('update-campaign-name').click();
    });

    expect(screen.getByTestId('campaign-name').textContent).toBe('Yahoo Test Campaign');

    act(() => {
      screen.getByTestId('update-campaign-objective').click();
    });

    expect(screen.getByTestId('campaign-objective').textContent).toBe('awareness');
  });

  test('UPDATE_BUDGET and UPDATE_BIDDING actions update nested fields', () => {
    render(
      <YahooTrafficSourceProvider>
        <TestComponent />
      </YahooTrafficSourceProvider>
    );

    // Test budget amount update
    act(() => {
      screen.getByTestId('update-budget').click();
    });

    expect(screen.getByTestId('budget-amount').textContent).toBe('500');

    // Test budget type update
    act(() => {
      screen.getByTestId('update-budget-type').click();
    });

    expect(screen.getByTestId('budget-type').textContent).toBe('daily');

    // Test bidding strategy update
    act(() => {
      screen.getByTestId('update-bidding').click();
    });

    expect(screen.getByTestId('bidding-strategy').textContent).toBe('manual');
  });

  test('yahooTrafficSourceActions exports the correct action types', () => {
    expect(yahooTrafficSourceActions).toEqual({
      UPDATE_FIELD: 'UPDATE_FIELD',
      SET_VALIDATION_RESULT: 'SET_VALIDATION_RESULT',
      SET_SUBMITTING: 'SET_SUBMITTING',
      SET_SUBMITTED: 'SET_SUBMITTED',
      RESET_FORM: 'RESET_FORM',
      UPDATE_BUDGET: 'UPDATE_BUDGET',
      UPDATE_BIDDING: 'UPDATE_BIDDING'
    });
  });

  test('throws error when useYahooTrafficSource is used outside of YahooTrafficSourceProvider', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useYahooTrafficSource must be used within a YahooTrafficSourceProvider');

    // Restore console.error
    console.error = originalError;
  });
});
