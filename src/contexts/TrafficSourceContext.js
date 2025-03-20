import React, { createContext, useContext } from 'react';

// Create context for traffic sources
const TrafficSourceContext = createContext();

// Provider component
export const TrafficSourceProvider = ({ children, source }) => {
  // Each traffic source will have its own configuration
  const sourceConfigs = {
    google: {
      name: 'Google Ads',
      fields: {
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
      }
    },
    revcontent: {
      name: 'RevContent',
      fields: {
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
      }
    },
    yahoo: {
      name: 'Yahoo Gemini',
      fields: {
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
      }
    }
  };

  // Get the configuration for the current traffic source
  const currentSourceConfig = sourceConfigs[source] || null;

  return (
    <TrafficSourceContext.Provider value={currentSourceConfig}>
      {children}
    </TrafficSourceContext.Provider>
  );
};

// Custom hook for using the traffic source context
export const useTrafficSource = () => {
  const context = useContext(TrafficSourceContext);
  if (!context) {
    throw new Error('useTrafficSource must be used within a TrafficSourceProvider');
  }
  return context;
};
