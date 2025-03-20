import { createContext } from 'react';
import { createTrafficSourceProvider, createUseTrafficSource, baseActions } from './BaseTrafficSourceContext';

// Create the context
const YahooTrafficSourceContext = createContext();

// Initial state specific to Yahoo
const initialState = {
  campaignObjective: '',
  startDate: '',
  endDate: '',
  budget: {
    amount: '',
    type: ''
  },
  bidding: {
    strategy: '',
    amount: ''
  }
};

// Yahoo-specific reducer actions
const yahooActions = {
  UPDATE_BUDGET: 'UPDATE_BUDGET',
  UPDATE_BIDDING: 'UPDATE_BIDDING'
};

// Yahoo-specific reducer
const yahooReducer = (state, action) => {
  switch (action.type) {
    case yahooActions.UPDATE_BUDGET:
      return {
        ...state,
        budget: {
          ...state.budget,
          [action.field]: action.value
        }
      };
    case yahooActions.UPDATE_BIDDING:
      return {
        ...state,
        bidding: {
          ...state.bidding,
          [action.field]: action.value
        }
      };
    default:
      // Return the state unchanged to let the base reducer handle it
      return state;
  }
};

// Field definitions for Yahoo
const yahooFields = {
  campaignName: {
    label: 'Campaign Name',
    type: 'text',
    required: true,
    validation: { min: 3, max: 50 }
  },
  campaignObjective: {
    label: 'Campaign Objective',
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
        required: true,
        options: [
          { value: 'daily', label: 'Daily' },
          { value: 'lifetime', label: 'Lifetime' }
        ]
      }
    }
  },
  bidding: {
    label: 'Bidding',
    type: 'group',
    fields: {
      strategy: {
        label: 'Bid Strategy',
        type: 'select',
        required: true,
        options: [
          { value: 'manual', label: 'Manual' },
          { value: 'auto', label: 'Automatic' }
        ]
      },
      amount: {
        label: 'Bid Amount',
        type: 'number',
        required: true,
        validation: { min: 0.01, step: 0.01 },
        dependsOn: { field: 'strategy', value: 'manual' }
      }
    }
  }
};

// Create the provider component
export const YahooTrafficSourceProvider = createTrafficSourceProvider(
  YahooTrafficSourceContext,
  initialState,
  yahooReducer,
  yahooFields
);

// Create the custom hook
export const useYahooTrafficSource = createUseTrafficSource(YahooTrafficSourceContext, 'Yahoo');

// Export actions for use in components
export const yahooTrafficSourceActions = {
  ...baseActions,
  ...yahooActions
};
