import React, { createContext, useContext, useReducer } from 'react';

// Initial state for the wizard - focusing only on navigation concerns
const initialState = {
  currentStep: 0,
  trafficSource: null, // Only needed for source selection, not for storing campaign data
  lastCompletedStep: -1
};

// Reducer function to handle state updates - simplified for navigation only
const wizardReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_TRAFFIC_SOURCE':
      return { ...state, trafficSource: action.payload };
    case 'SET_LAST_COMPLETED_STEP':
      return { ...state, lastCompletedStep: action.payload };
    case 'RESET_WIZARD':
      return initialState;
    default:
      return state;
  }
};

// Create the context
const WizardContext = createContext();

// Provider component
export const WizardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  // Actions with debug logging - focused on navigation only
  const setStep = (step) => {
    console.log('WizardContext - Setting step to:', step);
    dispatch({ type: 'SET_STEP', payload: step });
  };
  
  const setTrafficSource = (source) => {
    console.log('WizardContext - Setting traffic source to:', source);
    dispatch({ type: 'SET_TRAFFIC_SOURCE', payload: source });
    // Note: The state won't be updated until after this function completes
    // and React re-renders, so we can't log the updated state here.
    console.log('WizardContext - Traffic source update dispatched');
  };

  const setLastCompletedStep = (step) => {
    dispatch({ type: 'SET_LAST_COMPLETED_STEP', payload: step });
  };

  const resetWizard = () => dispatch({ type: 'RESET_WIZARD' });

  const nextStep = () => {
    const nextStepIndex = state.currentStep + 1;
    setStep(nextStepIndex);
    
    // Update last completed step if we're moving forward
    if (state.lastCompletedStep < state.currentStep) {
      setLastCompletedStep(state.currentStep);
    }
  };
  
  const prevStep = () => setStep(state.currentStep - 1);

  const value = {
    currentStep: state.currentStep,
    trafficSource: state.trafficSource,
    lastCompletedStep: state.lastCompletedStep,
    setStep,
    nextStep,
    prevStep,
    setTrafficSource,
    setLastCompletedStep,
    resetWizard
  };

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
};

// Custom hook for using the wizard context
export const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
};
