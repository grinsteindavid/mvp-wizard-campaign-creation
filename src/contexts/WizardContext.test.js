import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { WizardProvider, useWizard } from './WizardContext';

// Test component that uses the wizard context
const TestComponent = () => {
  const { 
    currentStep, 
    trafficSource, 
    lastCompletedStep, 
    setStep, 
    nextStep, 
    prevStep, 
    setTrafficSource, 
    setLastCompletedStep, 
    resetWizard 
  } = useWizard();

  return (
    <div>
      <div data-testid="current-step">{currentStep}</div>
      <div data-testid="traffic-source">{trafficSource || 'none'}</div>
      <div data-testid="last-completed-step">{lastCompletedStep}</div>
      <button data-testid="set-step" onClick={() => setStep(2)}>Set Step</button>
      <button data-testid="next-step" onClick={nextStep}>Next Step</button>
      <button data-testid="prev-step" onClick={prevStep}>Prev Step</button>
      <button data-testid="set-traffic-source" onClick={() => setTrafficSource('google')}>Set Traffic Source</button>
      <button data-testid="set-last-completed" onClick={() => setLastCompletedStep(3)}>Set Last Completed</button>
      <button data-testid="reset-wizard" onClick={resetWizard}>Reset</button>
    </div>
  );
};

describe('WizardContext', () => {
  test('provides initial state values', () => {
    render(
      <WizardProvider>
        <TestComponent />
      </WizardProvider>
    );

    expect(screen.getByTestId('current-step').textContent).toBe('0');
    expect(screen.getByTestId('traffic-source').textContent).toBe('none');
    expect(screen.getByTestId('last-completed-step').textContent).toBe('-1');
  });

  test('setStep updates current step', () => {
    render(
      <WizardProvider>
        <TestComponent />
      </WizardProvider>
    );

    act(() => {
      screen.getByTestId('set-step').click();
    });

    expect(screen.getByTestId('current-step').textContent).toBe('2');
  });

  test('nextStep increments current step', () => {
    render(
      <WizardProvider>
        <TestComponent />
      </WizardProvider>
    );

    act(() => {
      screen.getByTestId('next-step').click();
    });

    expect(screen.getByTestId('current-step').textContent).toBe('1');
    expect(screen.getByTestId('last-completed-step').textContent).toBe('0');
  });

  test('prevStep decrements current step', () => {
    render(
      <WizardProvider>
        <TestComponent />
      </WizardProvider>
    );

    // First set step to 2
    act(() => {
      screen.getByTestId('set-step').click();
    });

    // Then go back
    act(() => {
      screen.getByTestId('prev-step').click();
    });

    expect(screen.getByTestId('current-step').textContent).toBe('1');
  });

  test('setTrafficSource updates traffic source', () => {
    render(
      <WizardProvider>
        <TestComponent />
      </WizardProvider>
    );

    act(() => {
      screen.getByTestId('set-traffic-source').click();
    });

    expect(screen.getByTestId('traffic-source').textContent).toBe('google');
  });

  test('setLastCompletedStep updates last completed step', () => {
    render(
      <WizardProvider>
        <TestComponent />
      </WizardProvider>
    );

    act(() => {
      screen.getByTestId('set-last-completed').click();
    });

    expect(screen.getByTestId('last-completed-step').textContent).toBe('3');
  });

  test('resetWizard resets state to initial values', () => {
    render(
      <WizardProvider>
        <TestComponent />
      </WizardProvider>
    );

    // First make some changes
    act(() => {
      screen.getByTestId('set-step').click();
      screen.getByTestId('set-traffic-source').click();
      screen.getByTestId('set-last-completed').click();
    });

    // Then reset
    act(() => {
      screen.getByTestId('reset-wizard').click();
    });

    // Check that values are reset
    expect(screen.getByTestId('current-step').textContent).toBe('0');
    expect(screen.getByTestId('traffic-source').textContent).toBe('none');
    expect(screen.getByTestId('last-completed-step').textContent).toBe('-1');
  });

  test('throws error when useWizard is used outside of WizardProvider', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useWizard must be used within a WizardProvider');

    // Restore console.error
    console.error = originalError;
  });
});
