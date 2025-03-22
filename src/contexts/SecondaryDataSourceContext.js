import { createContext, useReducer, useEffect } from 'react';
import { createDataSourceBuilders, createUseDataSource, baseActions } from './BaseDataSourceContext';
import secondaryDataService from '../services/http/secondaryDataService';

// Create the context
const SecondaryDataSourceContext = createContext();

// Initial state specific to Secondary Data Source
const initialState = {
  projectName: '',
  targetUrl: '',
  bidAmount: '',
  resourceAllocation: '',
  targeting: {
    countries: [],
    devices: []
  },
  segments: [],
  metrics: [],
  availableCountries: [],
  availableDevices: []
};

// Secondary-specific reducer actions
const secondaryActions = {
  UPDATE_TARGETING: 'UPDATE_TARGETING',
  SET_SEGMENTS: 'SET_SEGMENTS',
  SET_METRICS: 'SET_METRICS',
  SET_COUNTRIES: 'SET_COUNTRIES',
  SET_DEVICES: 'SET_DEVICES'
};

// Secondary-specific reducer
const secondaryReducer = (state, action) => {
  switch (action.type) {
    case secondaryActions.UPDATE_TARGETING:
      return {
        ...state,
        targeting: {
          ...state.targeting,
          [action.field]: action.value
        }
      };
    case secondaryActions.SET_SEGMENTS:
      return {
        ...state,
        segments: action.payload
      };
    case secondaryActions.SET_METRICS:
      return {
        ...state,
        metrics: action.payload
      };
    case secondaryActions.SET_COUNTRIES:
      return {
        ...state,
        availableCountries: action.payload
      };
    case secondaryActions.SET_DEVICES:
      return {
        ...state,
        availableDevices: action.payload
      };
    default:
      // Return the state unchanged to let the base reducer handle it
      return state;
  }
};

// Field definitions for Secondary Data Source
const secondaryFields = {
  projectName: {
    label: 'Project Name',
    type: 'text',
    required: true,
    validation: { min: 3, max: 50 }
  },
  targetUrl: {
    label: 'Target URL',
    type: 'url',
    required: true
  },
  bidAmount: {
    label: 'Bid Amount',
    type: 'number',
    required: true,
    validation: { min: 0.01, step: 0.01 }
  },
  resourceAllocation: {
    label: 'Resource Allocation',
    type: 'number',
    required: true,
    validation: { min: 5 }
  },
  targeting: {
    label: 'Targeting',
    type: 'group',
    fields: {
      countries: {
        label: 'Countries',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'us', label: 'United States' },
          { value: 'ca', label: 'Canada' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'au', label: 'Australia' }
        ]
      },
      devices: {
        label: 'Devices',
        type: 'checkboxes',
        options: [
          { value: 'desktop', label: 'Desktop' },
          { value: 'mobile', label: 'Mobile' },
          { value: 'tablet', label: 'Tablet' }
        ]
      }
    }
  }
};

// Get the building blocks from the base context
const builders = createDataSourceBuilders(initialState, secondaryReducer, secondaryFields);

// Create the provider component with custom side effects
export const SecondaryDataSourceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(builders.combinedReducer, builders.combinedInitialState);
  
  // Secondary-specific actions
  const updateTargeting = (field, value) => {
    dispatch({ type: secondaryActions.UPDATE_TARGETING, field, value });
  };
  
  const setSegments = (segments) => {
    dispatch({ type: secondaryActions.SET_SEGMENTS, payload: segments });
  };
  
  const setMetrics = (metrics) => {
    dispatch({ type: secondaryActions.SET_METRICS, payload: metrics });
  };
  
  const setCountries = (countries) => {
    dispatch({ type: secondaryActions.SET_COUNTRIES, payload: countries });
  };
  
  const setDevices = (devices) => {
    dispatch({ type: secondaryActions.SET_DEVICES, payload: devices });
  };
  
  // Custom side effect - Load data from services on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load countries for targeting
        const countries = await secondaryDataService.getCountries();
        setCountries(countries);
      } catch (error) {
        console.error('Error loading data from services:', error);
      }
    };
    
    loadData();
  }, []);
  
  // Create the context value with base actions and secondary-specific actions
  const contextValue = {
    ...builders.createContextValue(state, dispatch),
    updateTargeting,
    setSegments,
    setMetrics,
    setCountries,
    setDevices
  };
  
  return (
    <SecondaryDataSourceContext.Provider value={contextValue}>
      {children}
    </SecondaryDataSourceContext.Provider>
  );
};

// Create the custom hook
export const useSecondaryDataSource = createUseDataSource(SecondaryDataSourceContext, 'Secondary');

// Export actions for use in components
export const secondaryDataSourceActions = {
  ...baseActions,
  ...secondaryActions
};
