import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { TertiaryDataSourceProvider, useTertiaryDataSource, tertiaryDataSourceActions } from './TertiaryDataSourceContext';

// Test component that uses the Tertiary data source context
const TestComponent = () => {
  const { 
    state, 
    updateField, 
    dispatch 
  } = useTertiaryDataSource();

  return (
    <div>
      <div data-testid="project-title">{state.projectTitle}</div>
      <div data-testid="project-objective">{state.projectObjective}</div>
      <div data-testid="start-date">{state.startDate}</div>
      <div data-testid="end-date">{state.endDate}</div>
      <div data-testid="resources-amount">{state.resources.amount}</div>
      <div data-testid="resources-type">{state.resources.type}</div>
      <div data-testid="optimization-strategy">{state.optimization.strategy}</div>
      <div data-testid="optimization-amount">{state.optimization.amount}</div>
      <button 
        data-testid="update-project-title" 
        onClick={() => updateField('projectTitle', 'Tertiary Test Project')}
      >
        Update Project Title
      </button>
      <button 
        data-testid="update-project-objective" 
        onClick={() => updateField('projectObjective', 'awareness')}
      >
        Update Project Objective
      </button>
      <button 
        data-testid="update-resources" 
        onClick={() => dispatch({ 
          type: tertiaryDataSourceActions.UPDATE_RESOURCES, 
          field: 'amount', 
          value: '500' 
        })}
      >
        Update Resources Amount
      </button>
      <button 
        data-testid="update-resources-type" 
        onClick={() => dispatch({ 
          type: tertiaryDataSourceActions.UPDATE_RESOURCES, 
          field: 'type', 
          value: 'daily' 
        })}
      >
        Update Resources Type
      </button>
      <button 
        data-testid="update-optimization" 
        onClick={() => dispatch({ 
          type: tertiaryDataSourceActions.UPDATE_OPTIMIZATION, 
          field: 'strategy', 
          value: 'manual' 
        })}
      >
        Update Optimization Strategy
      </button>
    </div>
  );
};

describe('TertiaryDataSourceContext', () => {
  test('provides initial state values', () => {
    render(
      <TertiaryDataSourceProvider>
        <TestComponent />
      </TertiaryDataSourceProvider>
    );

    expect(screen.getByTestId('project-title').textContent).toBe('');
    expect(screen.getByTestId('project-objective').textContent).toBe('');
    expect(screen.getByTestId('start-date').textContent).toBe('');
    expect(screen.getByTestId('end-date').textContent).toBe('');
    expect(screen.getByTestId('resources-amount').textContent).toBe('');
    expect(screen.getByTestId('resources-type').textContent).toBe('');
    expect(screen.getByTestId('optimization-strategy').textContent).toBe('');
    expect(screen.getByTestId('optimization-amount').textContent).toBe('');
  });

  test('updateField updates a field value', () => {
    render(
      <TertiaryDataSourceProvider>
        <TestComponent />
      </TertiaryDataSourceProvider>
    );

    act(() => {
      screen.getByTestId('update-project-title').click();
    });

    expect(screen.getByTestId('project-title').textContent).toBe('Tertiary Test Project');

    act(() => {
      screen.getByTestId('update-project-objective').click();
    });

    expect(screen.getByTestId('project-objective').textContent).toBe('awareness');
  });

  test('UPDATE_RESOURCES and UPDATE_OPTIMIZATION actions update nested fields', () => {
    render(
      <TertiaryDataSourceProvider>
        <TestComponent />
      </TertiaryDataSourceProvider>
    );

    // Test resources amount update
    act(() => {
      screen.getByTestId('update-resources').click();
    });

    expect(screen.getByTestId('resources-amount').textContent).toBe('500');

    // Test resources type update
    act(() => {
      screen.getByTestId('update-resources-type').click();
    });

    expect(screen.getByTestId('resources-type').textContent).toBe('daily');

    // Test optimization strategy update
    act(() => {
      screen.getByTestId('update-optimization').click();
    });

    expect(screen.getByTestId('optimization-strategy').textContent).toBe('manual');
  });

  test('tertiaryDataSourceActions exports the correct action types', () => {
    expect(tertiaryDataSourceActions).toEqual({
      UPDATE_FIELD: 'UPDATE_FIELD',
      SET_VALIDATION_RESULT: 'SET_VALIDATION_RESULT',
      SET_SUBMITTING: 'SET_SUBMITTING',
      SET_SUBMITTED: 'SET_SUBMITTED',
      RESET_FORM: 'RESET_FORM',
      UPDATE_RESOURCES: 'UPDATE_RESOURCES',
      UPDATE_OPTIMIZATION: 'UPDATE_OPTIMIZATION'
    });
  });

  test('throws error when useTertiaryDataSource is used outside of TertiaryDataSourceProvider', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTertiaryDataSource must be used within a TertiaryDataSourceProvider');

    // Restore console.error
    console.error = originalError;
  });
});
