import { createContext } from 'react';
import { createDataSourceProvider, createUseDataSource, baseActions } from './BaseDataSourceContext';

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
  }
};

// Tertiary-specific reducer actions
const tertiaryActions = {
  UPDATE_RESOURCES: 'UPDATE_RESOURCES',
  UPDATE_OPTIMIZATION: 'UPDATE_OPTIMIZATION'
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

// Create the provider component
export const TertiaryDataSourceProvider = createDataSourceProvider(
  TertiaryDataSourceContext,
  initialState,
  tertiaryReducer,
  tertiaryFields
);

// Create the custom hook
export const useTertiaryDataSource = createUseDataSource(TertiaryDataSourceContext, 'Tertiary');

// Export actions for use in components
export const tertiaryDataSourceActions = {
  ...baseActions,
  ...tertiaryActions
};
