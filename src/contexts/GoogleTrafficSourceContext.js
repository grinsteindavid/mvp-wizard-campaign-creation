import { createContext } from 'react';
import { createTrafficSourceProvider, createUseTrafficSource, baseActions } from './BaseTrafficSourceContext';

// Create the context
const GoogleTrafficSourceContext = createContext();

// Initial state specific to Google Ads
const initialState = {
  dailyBudget: '',
  bidStrategy: '',
  keywords: '',
  adGroups: []
};

// Google-specific reducer actions
const googleActions = {
  ADD_AD_GROUP: 'ADD_AD_GROUP',
  REMOVE_AD_GROUP: 'REMOVE_AD_GROUP',
  UPDATE_AD_GROUP: 'UPDATE_AD_GROUP'
};

// Google-specific reducer
const googleReducer = (state, action) => {
  switch (action.type) {
    case googleActions.ADD_AD_GROUP:
      return {
        ...state,
        adGroups: [...state.adGroups, { name: '', cpc: '' }]
      };
    case googleActions.REMOVE_AD_GROUP:
      return {
        ...state,
        adGroups: state.adGroups.filter((_, index) => index !== action.index)
      };
    case googleActions.UPDATE_AD_GROUP:
      const updatedAdGroups = [...state.adGroups];
      updatedAdGroups[action.index] = {
        ...updatedAdGroups[action.index],
        [action.field]: action.value
      };
      return {
        ...state,
        adGroups: updatedAdGroups
      };
    default:
      // Return the state unchanged to let the base reducer handle it
      return state;
  }
};

// Field definitions for Google Ads
const googleFields = {
  campaignName: {
    label: 'Campaign Name',
    type: 'text',
    required: true,
    validation: { min: 3, max: 50 }
  },
  dailyBudget: {
    label: 'Daily Budget',
    type: 'number',
    required: true,
    validation: { min: 5 }
  },
  bidStrategy: {
    label: 'Bid Strategy',
    type: 'select',
    required: true,
    options: [
      { value: 'cpc', label: 'Cost Per Click' },
      { value: 'cpm', label: 'Cost Per Mille' },
      { value: 'cpv', label: 'Cost Per View' }
    ]
  },
  keywords: {
    label: 'Keywords',
    type: 'textarea',
    required: true,
    placeholder: 'Enter keywords separated by commas'
  },
  adGroups: {
    label: 'Ad Groups',
    type: 'array',
    required: true,
    fields: {
      name: {
        label: 'Group Name',
        type: 'text',
        required: true
      },
      cpc: {
        label: 'Max CPC',
        type: 'number',
        required: true
      }
    }
  }
};

// Create the provider component
export const GoogleTrafficSourceProvider = createTrafficSourceProvider(
  GoogleTrafficSourceContext,
  initialState,
  googleReducer,
  googleFields
);

// Create the custom hook
export const useGoogleTrafficSource = createUseTrafficSource(GoogleTrafficSourceContext, 'Google');

// Export actions for use in components
export const googleTrafficSourceActions = {
  ...baseActions,
  ...googleActions
};
