import React from 'react';
import { render } from '@testing-library/react';
import withFieldMemoization from './withFieldMemoization';

describe('withFieldMemoization', () => {
  // Mock component to test memoization
  const TestComponent = jest.fn(({ field, value, error, disabled }) => {
    return <div data-testid="test-component">{value}</div>;
  });
  
  // Apply the memoization HOC to our test component
  const MemoizedComponent = withFieldMemoization(TestComponent);
  
  beforeEach(() => {
    TestComponent.mockClear();
  });
  
  test('should not re-render when props have not changed', () => {
    const initialProps = {
      field: { name: 'test', type: 'text' },
      value: 'test-value',
      error: null,
      disabled: false,
      onChange: jest.fn()
    };
    
    const { rerender } = render(<MemoizedComponent {...initialProps} />);
    
    // Initial render should call the component once
    expect(TestComponent).toHaveBeenCalledTimes(1);
    
    // Rerender with the same props
    rerender(<MemoizedComponent {...initialProps} />);
    
    // Component should still have been called only once (no re-render)
    expect(TestComponent).toHaveBeenCalledTimes(1);
  });
  
  test('should re-render when value changes', () => {
    const initialProps = {
      field: { name: 'test', type: 'text' },
      value: 'test-value',
      error: null,
      disabled: false,
      onChange: jest.fn()
    };
    
    const { rerender } = render(<MemoizedComponent {...initialProps} />);
    
    // Initial render should call the component once
    expect(TestComponent).toHaveBeenCalledTimes(1);
    
    // Rerender with a different value
    rerender(<MemoizedComponent {...initialProps} value="new-value" />);
    
    // Component should be called again (should re-render)
    expect(TestComponent).toHaveBeenCalledTimes(2);
  });
  
  test('should re-render when error changes', () => {
    const initialProps = {
      field: { name: 'test', type: 'text' },
      value: 'test-value',
      error: null,
      disabled: false,
      onChange: jest.fn()
    };
    
    const { rerender } = render(<MemoizedComponent {...initialProps} />);
    
    // Initial render should call the component once
    expect(TestComponent).toHaveBeenCalledTimes(1);
    
    // Rerender with an error
    rerender(<MemoizedComponent {...initialProps} error="This field is required" />);
    
    // Component should be called again (should re-render)
    expect(TestComponent).toHaveBeenCalledTimes(2);
  });
  
  test('should re-render when disabled status changes', () => {
    const initialProps = {
      field: { name: 'test', type: 'text' },
      value: 'test-value',
      error: null,
      disabled: false,
      onChange: jest.fn()
    };
    
    const { rerender } = render(<MemoizedComponent {...initialProps} />);
    
    // Initial render should call the component once
    expect(TestComponent).toHaveBeenCalledTimes(1);
    
    // Rerender with disabled=true
    rerender(<MemoizedComponent {...initialProps} disabled={true} />);
    
    // Component should be called again (should re-render)
    expect(TestComponent).toHaveBeenCalledTimes(2);
  });
  
  test('should re-render when field name changes', () => {
    const initialProps = {
      field: { name: 'test', type: 'text' },
      value: 'test-value',
      error: null,
      disabled: false,
      onChange: jest.fn()
    };
    
    const { rerender } = render(<MemoizedComponent {...initialProps} />);
    
    // Initial render should call the component once
    expect(TestComponent).toHaveBeenCalledTimes(1);
    
    // Rerender with a different field name
    rerender(<MemoizedComponent {...initialProps} field={{ ...initialProps.field, name: 'renamed' }} />);
    
    // Component should be called again (should re-render)
    expect(TestComponent).toHaveBeenCalledTimes(2);
  });
  
  test('should re-render when field type changes', () => {
    const initialProps = {
      field: { name: 'test', type: 'text' },
      value: 'test-value',
      error: null,
      disabled: false,
      onChange: jest.fn()
    };
    
    const { rerender } = render(<MemoizedComponent {...initialProps} />);
    
    // Initial render should call the component once
    expect(TestComponent).toHaveBeenCalledTimes(1);
    
    // Rerender with a different field type
    rerender(<MemoizedComponent {...initialProps} field={{ ...initialProps.field, type: 'email' }} />);
    
    // Component should be called again (should re-render)
    expect(TestComponent).toHaveBeenCalledTimes(2);
  });
  
  test('should not re-render when field properties other than name and type change', () => {
    const initialProps = {
      field: { name: 'test', type: 'text', label: 'Test Label' },
      value: 'test-value',
      error: null,
      disabled: false,
      onChange: jest.fn()
    };
    
    const { rerender } = render(<MemoizedComponent {...initialProps} />);
    
    // Initial render should call the component once
    expect(TestComponent).toHaveBeenCalledTimes(1);
    
    // Rerender with a different field label (not compared in memo)
    rerender(<MemoizedComponent {...initialProps} field={{ ...initialProps.field, label: 'New Label' }} />);
    
    // Component should still have been called only once (no re-render)
    expect(TestComponent).toHaveBeenCalledTimes(1);
  });
});
