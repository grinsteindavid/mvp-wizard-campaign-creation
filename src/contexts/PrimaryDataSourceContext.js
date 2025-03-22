import React, { createContext, useReducer, useEffect } from 'react';
import { createDataSourceBuilders, createUseDataSource, baseActions } from './BaseDataSourceContext';
import { primaryDataService } from '../services/http';

// Create the context
const PrimaryDataSourceContext = createContext();

// Initial state specific to Primary Integration
const initialState = {
  projectName: '',
  resourceAllocation: '',
  optimizationStrategy: '',
  keyTerms: '',
  categoryGroups: [],
  projects: [],
  availableCategoryGroups: [],
  availableOptimizationStrategies: []
};

// Primary-specific reducer actions
const primaryActions = {
  ADD_CATEGORY_GROUP: 'ADD_CATEGORY_GROUP',
  REMOVE_CATEGORY_GROUP: 'REMOVE_CATEGORY_GROUP',
  UPDATE_CATEGORY_GROUP: 'UPDATE_CATEGORY_GROUP',
  SET_PROJECTS: 'SET_PROJECTS',
  SET_CATEGORY_GROUPS: 'SET_CATEGORY_GROUPS',
  SET_OPTIMIZATION_STRATEGIES: 'SET_OPTIMIZATION_STRATEGIES'
};

// Primary-specific reducer
const primaryReducer = (state, action) => {
  switch (action.type) {
    case primaryActions.ADD_CATEGORY_GROUP:
      return {
        ...state,
        categoryGroups: [...state.categoryGroups, { name: '', value: '' }]
      };
    case primaryActions.REMOVE_CATEGORY_GROUP:
      return {
        ...state,
        categoryGroups: state.categoryGroups.filter((_, index) => index !== action.index)
      };
    case primaryActions.UPDATE_CATEGORY_GROUP:
      const updatedCategoryGroups = [...state.categoryGroups];
      updatedCategoryGroups[action.index] = {
        ...updatedCategoryGroups[action.index],
        [action.field]: action.value
      };
      return {
        ...state,
        categoryGroups: updatedCategoryGroups
      };
    case primaryActions.SET_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };
    case primaryActions.SET_CATEGORY_GROUPS:
      return {
        ...state,
        availableCategoryGroups: action.payload
      };
    case primaryActions.SET_OPTIMIZATION_STRATEGIES:
      return {
        ...state,
        availableOptimizationStrategies: action.payload
      };
    default:
      // Return the state unchanged to let the base reducer handle it
      return state;
  }
};

// Field definitions for Primary Integration
const primaryFields = {
  projectName: {
    label: 'Project Name',
    type: 'text',
    required: true,
    validation: { min: 3, max: 50 }
  },
  resourceAllocation: {
    label: 'Resource Allocation',
    type: 'number',
    required: true,
    validation: { min: 5 }
  },
  optimizationStrategy: {
    label: 'Optimization Strategy',
    type: 'select',
    required: true,
    options: [
      { value: 'cpc', label: 'Performance Based' },
      { value: 'cpm', label: 'Impression Based' },
      { value: 'cpv', label: 'Engagement Based' }
    ]
  },
  keyTerms: {
    label: 'Key Terms',
    type: 'textarea',
    required: true,
    placeholder: 'Enter key terms separated by commas'
  },
  categoryGroups: {
    label: 'Category Groups',
    type: 'array',
    required: true,
    fields: {
      name: {
        label: 'Group Name',
        type: 'text',
        required: true
      },
      value: {
        label: 'Max Value',
        type: 'number',
        required: true
      }
    }
  }
};

// Get the building blocks from the base context
const builders = createDataSourceBuilders(initialState, primaryReducer, primaryFields);

// Create the provider component with custom side effects
export const PrimaryDataSourceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(builders.combinedReducer, builders.combinedInitialState);
  
  // Primary-specific actions
  const addCategoryGroup = () => {
    dispatch({ type: primaryActions.ADD_CATEGORY_GROUP });
  };
  
  const removeCategoryGroup = (index) => {
    dispatch({ type: primaryActions.REMOVE_CATEGORY_GROUP, index });
  };
  
  const updateCategoryGroup = (index, field, value) => {
    dispatch({ type: primaryActions.UPDATE_CATEGORY_GROUP, index, field, value });
  };
  
  const setProjects = (projects) => {
    dispatch({ type: primaryActions.SET_PROJECTS, payload: projects });
  };
  
  const setCategoryGroups = (categoryGroups) => {
    dispatch({ type: primaryActions.SET_CATEGORY_GROUPS, payload: categoryGroups });
  };
  
  const setOptimizationStrategies = (strategies) => {
    dispatch({ type: primaryActions.SET_OPTIMIZATION_STRATEGIES, payload: strategies });
  };
  
  // Custom side effect - Load data from services on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load projects
        const projects = await primaryDataService.getAllProjects();
        setProjects(projects);
        
        // Load category groups
        const categoryGroups = await primaryDataService.getAllCategoryGroups();
        setCategoryGroups(categoryGroups);
        
        // Load optimization strategies
        const strategies = await primaryDataService.getOptimizationStrategies();
        setOptimizationStrategies(strategies);
      } catch (error) {
        console.error('Error loading data from services:', error);
      }
    };
    
    loadData();
  }, []);
  
  // Create the context value with base actions and primary-specific actions
  const contextValue = {
    ...builders.createContextValue(state, dispatch),
    addCategoryGroup,
    removeCategoryGroup,
    updateCategoryGroup,
    setProjects,
    setCategoryGroups,
    setOptimizationStrategies
  };
  
  return (
    <PrimaryDataSourceContext.Provider value={contextValue}>
      {children}
    </PrimaryDataSourceContext.Provider>
  );
};

// Create the custom hook
export const usePrimaryDataSource = createUseDataSource(PrimaryDataSourceContext, 'Primary');

// Export actions for use in components
export const primaryDataSourceActions = {
  ...baseActions,
  ...primaryActions
};
