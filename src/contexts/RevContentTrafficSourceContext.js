import { createContext } from 'react';
import { createTrafficSourceProvider, createUseTrafficSource, baseActions } from './BaseTrafficSourceContext';

// Create the context
const RevContentTrafficSourceContext = createContext();

// Initial state specific to RevContent
const initialState = {
  targetUrl: '',
  bidAmount: '',
  dailyBudget: '',
  targeting: {
    countries: [],
    devices: []
  }
};

// RevContent-specific reducer actions
const revContentActions = {
  UPDATE_TARGETING: 'UPDATE_TARGETING'
};

// RevContent-specific reducer
const revContentReducer = (state, action) => {
  switch (action.type) {
    case revContentActions.UPDATE_TARGETING:
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

// Field definitions for RevContent
const revContentFields = {
  campaignName: {
    label: 'Campaign Name',
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
  dailyBudget: {
    label: 'Daily Budget',
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
export const RevContentTrafficSourceProvider = createTrafficSourceProvider(
  RevContentTrafficSourceContext,
  initialState,
  revContentReducer,
  revContentFields
);

// Create the custom hook
export const useRevContentTrafficSource = createUseTrafficSource(RevContentTrafficSourceContext, 'RevContent');

// Export actions for use in components
export const revContentTrafficSourceActions = {
  ...baseActions,
  ...revContentActions
};
