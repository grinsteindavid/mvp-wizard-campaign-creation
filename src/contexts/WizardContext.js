import React, { createContext, useContext, useReducer } from 'react';

// Initial state for the wizard
const initialState = {
  currentStep: 0,
  trafficSource: null,
  campaignData: {},
  isValid: false,
  errors: {}
};

// Reducer function to handle state updates
const wizardReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_TRAFFIC_SOURCE':
      return { 
        ...state, 
        trafficSource: action.payload,
        // Reset campaign data when changing traffic source
        campaignData: {} 
      };
    case 'UPDATE_CAMPAIGN_DATA':
      return { 
        ...state, 
        campaignData: { ...state.campaignData, ...action.payload } 
      };
    case 'SET_VALIDATION_RESULT':
      return { 
        ...state, 
        isValid: action.payload.isValid,
        errors: action.payload.errors || {} 
      };
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

  // Actions with debug logging
  const setStep = (step) => {
    console.log('WizardContext - Setting step to:', step);
    dispatch({ type: 'SET_STEP', payload: step });
  };
  
  const setTrafficSource = (source) => {
    console.log('WizardContext - Setting traffic source to:', source);
    dispatch({ type: 'SET_TRAFFIC_SOURCE', payload: source });
    // Debug log to verify the state was updated
    setTimeout(() => console.log('WizardContext - Traffic source after update:', state.trafficSource), 0);
  };
  const updateCampaignData = (data) => dispatch({ type: 'UPDATE_CAMPAIGN_DATA', payload: data });
  const setValidationResult = (result) => dispatch({ type: 'SET_VALIDATION_RESULT', payload: result });
  const resetWizard = () => dispatch({ type: 'RESET_WIZARD' });

  const nextStep = () => setStep(state.currentStep + 1);
  const prevStep = () => setStep(state.currentStep - 1);

  const value = {
    ...state,
    setStep,
    nextStep,
    prevStep,
    setTrafficSource,
    updateCampaignData,
    setValidationResult,
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
