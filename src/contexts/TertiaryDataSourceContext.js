import { createContext, useReducer, useEffect } from 'react';
import { createDataSourceBuilders, createUseDataSource, baseActions } from './BaseDataSourceContext';
import tertiaryDataService from '../services/http/tertiaryDataService';

// Create the context
const TertiaryDataSourceContext = createContext();

// Initial state specific to Tertiary Data Source - aligned with tertiarySchema
const initialState = {
  projectName: '',
  projectObjective: '',
  startDate: '',
  endDate: '',
  budget: {
    amount: '',
    type: ''
  },
  bidding: {
    strategy: '',
    amount: ''
  },
  // Available options for selection - not part of schema validation
  availableObjectives: [],
  availableBudgetTypes: [],
  availableBiddingStrategies: []
};

// Tertiary-specific reducer actions
const tertiaryActions = {
  UPDATE_BUDGET: 'UPDATE_BUDGET',
  UPDATE_BIDDING: 'UPDATE_BIDDING',

  SET_OBJECTIVES: 'SET_OBJECTIVES',
  SET_BUDGET_TYPES: 'SET_BUDGET_TYPES',
  SET_BIDDING_STRATEGIES: 'SET_BIDDING_STRATEGIES'
};

// Tertiary-specific reducer
const tertiaryReducer = (state, action) => {
  switch (action.type) {
    case tertiaryActions.UPDATE_BUDGET:
      return {
        ...state,
        budget: {
          ...state.budget,
          [action.field]: action.value
        }
      };
    case tertiaryActions.UPDATE_BIDDING:
      return {
        ...state,
        bidding: {
          ...state.bidding,
          [action.field]: action.value
        }
      };

    case tertiaryActions.SET_OBJECTIVES:
      return {
        ...state,
        availableObjectives: action.payload
      };
    case tertiaryActions.SET_BUDGET_TYPES:
      return {
        ...state,
        availableBudgetTypes: action.payload
      };
    case tertiaryActions.SET_BIDDING_STRATEGIES:
      return {
        ...state,
        availableBiddingStrategies: action.payload
      };
    default:
      // Return the state unchanged to let the base reducer handle it
      return state;
  }
};

// Field definitions for Tertiary Data Source - aligned with tertiarySchema
const tertiaryFields = {
  projectName: {
    label: 'Project Name',
    type: 'text',
    required: true,
    validation: { min: 3, max: 50 }
  },
  projectObjective: {
    label: 'Project Objective',
    type: 'select',
    required: true
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
  budget: {
    label: 'Budget',
    type: 'group',
    fields: {
      amount: {
        label: 'Amount',
        type: 'number',
        required: true,
        validation: { min: 10 }
      },
      type: {
        label: 'Budget Type',
        type: 'select',
        required: true
      }
    }
  },
  bidding: {
    label: 'Bidding',
    type: 'group',
    fields: {
      strategy: {
        label: 'Bidding Strategy',
        type: 'select',
        required: true
      },
      amount: {
        label: 'Bid Amount',
        type: 'number',
        required: false,
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
  const updateBudget = (field, value) => {
    dispatch({ type: tertiaryActions.UPDATE_BUDGET, field, value });
  };
  
  const updateBidding = (field, value) => {
    dispatch({ type: tertiaryActions.UPDATE_BIDDING, field, value });
  };
  

  
  const setObjectives = (objectives) => {
    dispatch({ type: tertiaryActions.SET_OBJECTIVES, payload: objectives });
  };
  
  const setBudgetTypes = (types) => {
    dispatch({ type: tertiaryActions.SET_BUDGET_TYPES, payload: types });
  };
  
  const setBiddingStrategies = (strategies) => {
    dispatch({ type: tertiaryActions.SET_BIDDING_STRATEGIES, payload: strategies });
  };
  
  // Custom side effect - Load data from services on mount
  useEffect(() => {
    const loadData = async () => {
      try {

        
        // Load objectives
        const objectives = await tertiaryDataService.getObjectives();
        setObjectives(objectives);
        
        // Load budget types
        const budgetTypes = await tertiaryDataService.getBudgetTypes();
        setBudgetTypes(budgetTypes);
        
        // Load bidding strategies
        const strategies = await tertiaryDataService.getBiddingStrategies();
        setBiddingStrategies(strategies);
      } catch (error) {
        console.error('Error loading data from services:', error);
      }
    };
    
    loadData();
  }, []);
  
  // Create the context value with base actions and tertiary-specific actions
  const contextValue = {
    ...builders.createContextValue(state, dispatch),
    updateBudget,
    updateBidding,

    setObjectives,
    setBudgetTypes,
    setBiddingStrategies
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
