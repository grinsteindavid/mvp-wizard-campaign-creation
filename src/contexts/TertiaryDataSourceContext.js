import { createContext, useReducer, useEffect } from 'react';
import { createDataSourceBuilders, createUseDataSource, baseActions } from './BaseDataSourceContext';
import tertiaryDataService from '../services/http/tertiaryDataService';

// Create the context
const TertiaryDataSourceContext = createContext();

// Initial state specific to Tertiary Data Source
const initialState = {
  projectObjective: '',
  startDate: '',
  endDate: '',
  resources: {
    amount: '',
    type: ''
  },
  optimization: {
    strategy: '',
    amount: ''
  },
  channels: [],
  audiences: [],
  availableProjectObjectives: [],
  availableResourceTypes: [],
  availableOptimizationStrategies: []
};

// Tertiary-specific reducer actions
const tertiaryActions = {
  UPDATE_RESOURCES: 'UPDATE_RESOURCES',
  UPDATE_OPTIMIZATION: 'UPDATE_OPTIMIZATION',
  SET_CHANNELS: 'SET_CHANNELS',
  SET_AUDIENCES: 'SET_AUDIENCES',
  SET_PROJECT_OBJECTIVES: 'SET_PROJECT_OBJECTIVES',
  SET_RESOURCE_TYPES: 'SET_RESOURCE_TYPES',
  SET_OPTIMIZATION_STRATEGIES: 'SET_OPTIMIZATION_STRATEGIES'
};

// Tertiary-specific reducer
const tertiaryReducer = (state, action) => {
  switch (action.type) {
    case tertiaryActions.UPDATE_RESOURCES:
      return {
        ...state,
        resources: {
          ...state.resources,
          [action.field]: action.value
        }
      };
    case tertiaryActions.UPDATE_OPTIMIZATION:
      return {
        ...state,
        optimization: {
          ...state.optimization,
          [action.field]: action.value
        }
      };
    case tertiaryActions.SET_CHANNELS:
      return {
        ...state,
        channels: action.payload
      };
    case tertiaryActions.SET_AUDIENCES:
      return {
        ...state,
        audiences: action.payload
      };
    case tertiaryActions.SET_PROJECT_OBJECTIVES:
      return {
        ...state,
        availableProjectObjectives: action.payload
      };
    case tertiaryActions.SET_RESOURCE_TYPES:
      return {
        ...state,
        availableResourceTypes: action.payload
      };
    case tertiaryActions.SET_OPTIMIZATION_STRATEGIES:
      return {
        ...state,
        availableOptimizationStrategies: action.payload
      };
    default:
      // Return the state unchanged to let the base reducer handle it
      return state;
  }
};

// Field definitions for Tertiary Data Source
const tertiaryFields = {
  projectTitle: {
    label: 'Project Title',
    type: 'text',
    required: true,
    validation: { min: 3, max: 50 }
  },
  projectObjective: {
    label: 'Project Objective',
    type: 'select',
    required: true,
    options: [
      { value: 'visits', label: 'Website Visits' },
      { value: 'awareness', label: 'Brand Awareness' },
      { value: 'conversions', label: 'Conversions' }
    ]
  },
  startDate: {
    label: 'Start Date',
    type: 'date',
    required: true
  },
  endDate: {
    label: 'End Date',
    type: 'date',
    required: false
  },
  resources: {
    label: 'Resources',
    type: 'group',
    fields: {
      amount: {
        label: 'Amount',
        type: 'number',
        required: true,
        validation: { min: 10 }
      },
      type: {
        label: 'Resource Type',
        type: 'select',
        required: true,
        options: [
          { value: 'daily', label: 'Daily' },
          { value: 'lifetime', label: 'Lifetime' }
        ]
      }
    }
  },
  optimization: {
    label: 'Optimization',
    type: 'group',
    fields: {
      strategy: {
        label: 'Optimization Strategy',
        type: 'select',
        required: true,
        options: [
          { value: 'manual', label: 'Manual' },
          { value: 'auto', label: 'Automatic' }
        ]
      },
      amount: {
        label: 'Target Value',
        type: 'number',
        required: true,
        validation: { min: 0.01, step: 0.01 },
        dependsOn: { field: 'strategy', value: 'manual' }
      }
    }
  }
};

// Get the building blocks from the base context
const builders = createDataSourceBuilders(initialState, tertiaryReducer, tertiaryFields);

// Create the provider component with custom side effects
export const TertiaryDataSourceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(builders.combinedReducer, builders.combinedInitialState);
  
  // Tertiary-specific actions
  const updateResources = (field, value) => {
    dispatch({ type: tertiaryActions.UPDATE_RESOURCES, field, value });
  };
  
  const updateOptimization = (field, value) => {
    dispatch({ type: tertiaryActions.UPDATE_OPTIMIZATION, field, value });
  };
  
  const setChannels = (channels) => {
    dispatch({ type: tertiaryActions.SET_CHANNELS, payload: channels });
  };
  
  const setAudiences = (audiences) => {
    dispatch({ type: tertiaryActions.SET_AUDIENCES, payload: audiences });
  };
  
  const setProjectObjectives = (objectives) => {
    dispatch({ type: tertiaryActions.SET_PROJECT_OBJECTIVES, payload: objectives });
  };
  
  const setResourceTypes = (types) => {
    dispatch({ type: tertiaryActions.SET_RESOURCE_TYPES, payload: types });
  };
  
  const setOptimizationStrategies = (strategies) => {
    dispatch({ type: tertiaryActions.SET_OPTIMIZATION_STRATEGIES, payload: strategies });
  };
  
  // Custom side effect - Load data from services on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load resource types
        const resourceTypes = await tertiaryDataService.getResourceTypes();
        setResourceTypes(resourceTypes);
        
        // Load optimization strategies
        const strategies = await tertiaryDataService.getOptimizationStrategies();
        setOptimizationStrategies(strategies);
      } catch (error) {
        console.error('Error loading data from services:', error);
      }
    };
    
    loadData();
  }, []);
  
  // Create the context value with base actions and tertiary-specific actions
  const contextValue = {
    ...builders.createContextValue(state, dispatch),
    updateResources,
    updateOptimization,
    setChannels,
    setAudiences,
    setProjectObjectives,
    setResourceTypes,
    setOptimizationStrategies
  };
  
  return (
    <TertiaryDataSourceContext.Provider value={contextValue}>
      {children}
    </TertiaryDataSourceContext.Provider>
  );
};

// Create the custom hook
export const useTertiaryDataSource = createUseDataSource(TertiaryDataSourceContext, 'Tertiary');

// Export actions for use in components
export const tertiaryDataSourceActions = {
  ...baseActions,
  ...tertiaryActions
};
