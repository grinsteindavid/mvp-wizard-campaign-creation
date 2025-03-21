import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useApiRequest } from '../services/http';

// Base initial state for all data sources
const baseInitialState = {
  projectTitle: '',
  isValid: false,
  errors: {},
  isSubmitting: false,
  isSubmitted: false
};

// Base reducer actions that all data sources will have
const baseReducerActions = {
  UPDATE_FIELD: 'UPDATE_FIELD',
  SET_VALIDATION_RESULT: 'SET_VALIDATION_RESULT',
  SET_SUBMITTING: 'SET_SUBMITTING',
  SET_SUBMITTED: 'SET_SUBMITTED',
  RESET_FORM: 'RESET_FORM'
};

// Base reducer function that all data sources can extend
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
    case baseReducerActions.SET_SUBMITTING:
      return {
        ...state,
        isSubmitting: action.payload
      };
    case baseReducerActions.SET_SUBMITTED:
      return {
        ...state,
        isSubmitted: action.payload
      };
    case baseReducerActions.RESET_FORM:
      return { ...baseInitialState };
    default:
      return state;
  }
};

// Create the base context
const BaseDataSourceContext = createContext();

// Base provider component that can be extended
export const createDataSourceProvider = (SourceContext, initialState, reducer, fields, service = null) => {
  return ({ children }) => {
    // Combine base initial state with source-specific state
    const combinedInitialState = {
      ...baseInitialState,
      ...initialState,
      loading: false
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
    
    // Setup API request hook if a service is provided
    const api = useApiRequest(service);
    
    // Common actions that all data sources will have
    const updateField = (field, value) => {
      dispatch({ type: baseReducerActions.UPDATE_FIELD, field, value });
    };
    
    const setValidationResult = (result) => {
      dispatch({ type: baseReducerActions.SET_VALIDATION_RESULT, payload: result });
    };
    
    const setSubmitting = (isSubmitting) => {
      dispatch({ type: baseReducerActions.SET_SUBMITTING, payload: isSubmitting });
    };
    
    const setSubmitted = (isSubmitted) => {
      dispatch({ type: baseReducerActions.SET_SUBMITTED, payload: isSubmitted });
    };
    
    const resetForm = () => {
      dispatch({ type: baseReducerActions.RESET_FORM });
    };
    
    // Validate data through the service
    const validateData = async (data = state) => {
      if (!service) return;
      
      try {
        setSubmitting(true);
        const result = await api.execute(service.validateConfiguration.bind(service), data);
        setValidationResult(result);
        return result;
      } catch (error) {
        setValidationResult({ isValid: false, errors: { general: 'Validation failed' } });
        return { isValid: false, errors: { general: 'Validation failed' } };
      } finally {
        setSubmitting(false);
      }
    };
    
    // Submit data through the service
    const submitData = async (data = state) => {
      if (!service) return;
      
      try {
        setSubmitting(true);
        const validationResult = await validateData(data);
        
        if (!validationResult.isValid) {
          return { success: false };
        }
        
        const result = await api.execute(service.submitConfiguration.bind(service), data);
        setSubmitted(true);
        return result;
      } catch (error) {
        return { success: false, error: 'Submission failed' };
      } finally {
        setSubmitting(false);
      }
    };
    
    // Create the context value with state, actions, field definitions, and API integration
    const contextValue = {
      state,
      fields,
      updateField,
      setValidationResult,
      setSubmitting,
      setSubmitted,
      resetForm,
      dispatch,
      loading: state.isSubmitting || api.loading,
      error: api.error,
      validateData,
      submitData,
      service
    };
    
    // Effect to clear API errors when form state changes
    useEffect(() => {
      if (api.error) {
        api.clearError();
      }
    }, [state, api]);
    
    return (
      <SourceContext.Provider value={contextValue}>
        {children}
      </SourceContext.Provider>
    );
  };
};

// Create a custom hook factory for data source contexts
export const createUseDataSource = (SourceContext, sourceName) => {
  return () => {
    const context = useContext(SourceContext);
    if (!context) {
      throw new Error(`use${sourceName}DataSource must be used within a ${sourceName}DataSourceProvider`);
    }
    return context;
  };
};

// Export the base actions for reuse
export const baseActions = baseReducerActions;

// Export the base context for potential direct use
export default BaseDataSourceContext;
