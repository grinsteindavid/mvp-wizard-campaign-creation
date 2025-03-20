import React from 'react';
import { render, screen } from '@testing-library/react';
import { 
  TrafficSourceFactory, 
  trafficSourceNames, 
  trafficSourceDescriptions, 
  availableTrafficSources 
} from './TrafficSourceFactory';

// Test component that receives context from the factory
const TestConsumer = ({ contextValue }) => {
  if (!contextValue) return <div>No context provided</div>;
  
  return (
    <div>
      <div data-testid="has-context">true</div>
      <div data-testid="has-state">{contextValue.state ? 'true' : 'false'}</div>
      <div data-testid="has-fields">{contextValue.fields ? 'true' : 'false'}</div>
      <div data-testid="has-update-field">{typeof contextValue.updateField === 'function' ? 'true' : 'false'}</div>
    </div>
  );
};

describe('TrafficSourceFactory', () => {
  test('renders Google traffic source component when source is "google"', () => {
    render(
      <TrafficSourceFactory source="google">
        {(contextValue) => <TestConsumer contextValue={contextValue} />}
      </TrafficSourceFactory>
    );

    expect(screen.getByTestId('has-context').textContent).toBe('true');
    expect(screen.getByTestId('has-state').textContent).toBe('true');
    expect(screen.getByTestId('has-fields').textContent).toBe('true');
    expect(screen.getByTestId('has-update-field').textContent).toBe('true');
  });

  test('renders RevContent traffic source component when source is "revcontent"', () => {
    render(
      <TrafficSourceFactory source="revcontent">
        {(contextValue) => <TestConsumer contextValue={contextValue} />}
      </TrafficSourceFactory>
    );

    expect(screen.getByTestId('has-context').textContent).toBe('true');
    expect(screen.getByTestId('has-state').textContent).toBe('true');
    expect(screen.getByTestId('has-fields').textContent).toBe('true');
  });

  test('renders Yahoo traffic source component when source is "yahoo"', () => {
    render(
      <TrafficSourceFactory source="yahoo">
        {(contextValue) => <TestConsumer contextValue={contextValue} />}
      </TrafficSourceFactory>
    );

    expect(screen.getByTestId('has-context').textContent).toBe('true');
    expect(screen.getByTestId('has-state').textContent).toBe('true');
    expect(screen.getByTestId('has-fields').textContent).toBe('true');
  });

  test('renders error message for unknown traffic source', () => {
    render(
      <TrafficSourceFactory source="unknown">
        {(contextValue) => <TestConsumer contextValue={contextValue} />}
      </TrafficSourceFactory>
    );

    expect(screen.getByText('Invalid traffic source: unknown')).toBeInTheDocument();
  });

  test('renders error message when children is not a function', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();

    render(
      <TrafficSourceFactory source="google">
        <div>Not a function</div>
      </TrafficSourceFactory>
    );

    expect(screen.getByText('Error: TrafficSourceFactory requires a function as children')).toBeInTheDocument();

    // Restore console.error
    console.error = originalError;
  });

  test('trafficSourceNames contains the correct names', () => {
    expect(trafficSourceNames).toEqual({
      google: 'Google Ads',
      revcontent: 'RevContent',
      yahoo: 'Yahoo Gemini'
    });
  });

  test('trafficSourceDescriptions contains the correct descriptions', () => {
    expect(trafficSourceDescriptions).toEqual({
      google: 'Create campaigns for Google Search and Display Network',
      revcontent: 'Native advertising platform for content recommendation',
      yahoo: 'Search and native advertising on Yahoo properties'
    });
  });

  test('availableTrafficSources contains all traffic sources with correct data', () => {
    expect(availableTrafficSources).toEqual([
      {
        id: 'google',
        name: trafficSourceNames.google,
        description: trafficSourceDescriptions.google
      },
      {
        id: 'revcontent',
        name: trafficSourceNames.revcontent,
        description: trafficSourceDescriptions.revcontent
      },
      {
        id: 'yahoo',
        name: trafficSourceNames.yahoo,
        description: trafficSourceDescriptions.yahoo
      }
    ]);
  });
});
