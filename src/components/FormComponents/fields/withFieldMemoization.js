import { memo } from 'react';

/**
 * Higher-Order Component that applies memoization to field components
 * with a consistent comparison function
 * 
 * @param {React.ComponentType} FieldComponent - The field component to memoize
 * @returns {React.MemoExoticComponent} - The memoized component
 */
const withFieldMemoization = (FieldComponent) => {
  // Create a display name for the wrapped component
  const displayName = FieldComponent.displayName || FieldComponent.name || 'Component';
  
  // Apply memoization with a standard comparison function
  const MemoizedComponent = memo(FieldComponent, (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.error === nextProps.error &&
      prevProps.disabled === nextProps.disabled &&
      prevProps.field.name === nextProps.field.name &&
      prevProps.field.type === nextProps.field.type
    );
  });
  
  // Set a display name for the memoized component
  MemoizedComponent.displayName = `withFieldMemoization(${displayName})`;
  
  return MemoizedComponent;
};

export default withFieldMemoization;
