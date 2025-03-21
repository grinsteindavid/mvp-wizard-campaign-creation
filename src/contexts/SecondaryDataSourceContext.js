import { createContext, useReducer, useEffect } from 'react';
import { createDataSourceBuilders, createUseDataSource, baseActions } from './BaseDataSourceContext';
import secondaryDataService from '../services/http/secondaryDataService';
import { validateField } from '../services/validationService';

// Create the context
const SecondaryDataSourceContext = createContext();

// Initial state specific to Secondary Data Source - aligned with secondarySchema
const initialState = {
  projectName: '',
  targetUrl: '',
  bidAmount: '',
  dailyBudget: '',
  targeting: {
    countries: [],
    devices: []
  },
  // Available options for selection - not part of schema validation
  availableCountries: [],
  availableDevices: []
};

// Secondary-specific reducer actions
const secondaryActions = {
  UPDATE_TARGETING: 'UPDATE_TARGETING',

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

// Field definitions for Secondary Data Source - aligned with secondarySchema
// Validation is connected directly to the schema
const secondaryFields = {
  projectName: {
    label: 'Project Name',
    type: 'text',
    required: true,
    validateField: (value, formData) => validateField('secondary', 'projectName', value, formData)
  },
  targetUrl: {
    label: 'Target URL',
    type: 'url',
    required: true,
    validateField: (value, formData) => validateField('secondary', 'targetUrl', value, formData)
  },
  bidAmount: {
    label: 'Bid Amount',
    type: 'number',
    required: true,
    validateField: (value, formData) => validateField('secondary', 'bidAmount', value, formData)
  },
  dailyBudget: {
    label: 'Daily Budget',
    type: 'number',
    required: true,
    validateField: (value, formData) => validateField('secondary', 'dailyBudget', value, formData)
  },
  targeting: {
    label: 'Targeting',
    type: 'group',
    validateField: (value, formData) => validateField('secondary', 'targeting', value, formData),
    fields: {
      countries: {
        label: 'Countries',
        type: 'multiselect',
        required: true,
        validateField: (value, formData) => validateField('secondary', 'targeting.countries', value, formData)
      },
      devices: {
        label: 'Devices',
        type: 'checkboxes',
        required: true,
        validateField: (value, formData) => validateField('secondary', 'targeting.devices', value, formData)
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
        const {data: countries} = await secondaryDataService.getCountries();
        setCountries(countries);
        
        // Load devices for targeting
        const {data: devices} = await secondaryDataService.getDevices();
        setDevices(devices);
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
