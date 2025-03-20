import React, { createContext, useContext, useReducer } from 'react';

// Base initial state for all traffic sources
const baseInitialState = {
  campaignName: '',
  isValid: false,
  errors: {}
};

// Base reducer actions that all traffic sources will have
const baseReducerActions = {
  UPDATE_FIELD: 'UPDATE_FIELD',
  SET_VALIDATION_RESULT: 'SET_VALIDATION_RESULT',
  RESET_FORM: 'RESET_FORM'
};

// Base reducer function that all traffic sources can extend
const baseReducer = (state, action) => {
  switch (action.type) {
    case baseReducerActions.UPDATE_FIELD:
      return {
        ...state,
        [action.field]: action.value
      };
    case baseReducerActions.SET_VALIDATION_RESULT:
      return {
        ...state,
        isValid: action.payload.isValid,
        errors: action.payload.errors || {}
      };
    case baseReducerActions.RESET_FORM:
      return { ...baseInitialState };
    default:
      return state;
  }
};

// Create the base context
const BaseTrafficSourceContext = createContext();

// Base provider component that can be extended
export const createTrafficSourceProvider = (SourceContext, initialState, reducer, fields) => {
  return ({ children }) => {
    // Combine base initial state with source-specific state
    const combinedInitialState = {
      ...baseInitialState,
      ...initialState
    };
    
    // Create a combined reducer that first tries the source-specific reducer,
    // then falls back to the base reducer
    const combinedReducer = (state, action) => {
      const newState = reducer ? reducer(state, action) : state;
      // If the source-specific reducer didn't handle the action (state unchanged),
      // use the base reducer
      return newState === state ? baseReducer(state, action) : newState;
    };
    
    const [state, dispatch] = useReducer(combinedReducer, combinedInitialState);
    
    // Common actions that all traffic sources will have
    const updateField = (field, value) => {
      dispatch({ type: baseReducerActions.UPDATE_FIELD, field, value });
    };
    
    const setValidationResult = (result) => {
      dispatch({ type: baseReducerActions.SET_VALIDATION_RESULT, payload: result });
    };
    
    const resetForm = () => {
      dispatch({ type: baseReducerActions.RESET_FORM });
    };
    
    // Create the context value with state, actions, and field definitions
    const contextValue = {
      state,
      fields,
      updateField,
      setValidationResult,
      resetForm,
      dispatch
    };
    
    return (
      <SourceContext.Provider value={contextValue}>
        {children}
      </SourceContext.Provider>
    );
  };
};

// Create a custom hook factory for traffic source contexts
export const createUseTrafficSource = (SourceContext, sourceName) => {
  return () => {
    const context = useContext(SourceContext);
    if (!context) {
      throw new Error(`use${sourceName}TrafficSource must be used within a ${sourceName}TrafficSourceProvider`);
    }
    return context;
  };
};

// Export the base actions for reuse
export const baseActions = baseReducerActions;

// Export the base context for potential direct use
export default BaseTrafficSourceContext;
