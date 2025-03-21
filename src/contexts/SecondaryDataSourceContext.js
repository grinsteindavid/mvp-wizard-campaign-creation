import { createContext } from 'react';
import { createDataSourceProvider, createUseDataSource, baseActions } from './BaseDataSourceContext';
import { secondaryDataService } from '../services/http';

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
  }
};

// Secondary-specific reducer actions
const secondaryActions = {
  UPDATE_TARGETING: 'UPDATE_TARGETING'
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

// Create the provider component
export const SecondaryDataSourceProvider = createDataSourceProvider(
  SecondaryDataSourceContext,
  initialState,
  secondaryReducer,
  secondaryFields,
  secondaryDataService
);

// Create the custom hook
export const useSecondaryDataSource = createUseDataSource(SecondaryDataSourceContext, 'Secondary');

// Export actions for use in components
export const secondaryDataSourceActions = {
  ...baseActions,
  ...secondaryActions
};
