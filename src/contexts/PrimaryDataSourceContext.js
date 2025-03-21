import { createContext } from 'react';
import { createDataSourceProvider, createUseDataSource, baseActions } from './BaseDataSourceContext';
import { primaryDataService } from '../services/http';

// Create the context
const PrimaryDataSourceContext = createContext();

// Initial state specific to Primary Integration
const initialState = {
  projectName: '',
  resourceAllocation: '',
  optimizationStrategy: '',
  keyTerms: '',
  categoryGroups: []
};

// Primary-specific reducer actions
const primaryActions = {
  ADD_CATEGORY_GROUP: 'ADD_CATEGORY_GROUP',
  REMOVE_CATEGORY_GROUP: 'REMOVE_CATEGORY_GROUP',
  UPDATE_CATEGORY_GROUP: 'UPDATE_CATEGORY_GROUP'
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

// Create the provider component
export const PrimaryDataSourceProvider = createDataSourceProvider(
  PrimaryDataSourceContext,
  initialState,
  primaryReducer,
  primaryFields,
  primaryDataService
);

// Create the custom hook
export const usePrimaryDataSource = createUseDataSource(PrimaryDataSourceContext, 'Primary');

// Export actions for use in components
export const primaryDataSourceActions = {
  ...baseActions,
  ...primaryActions
};
