import React from 'react';
import { GoogleTrafficSourceProvider } from './GoogleTrafficSourceContext';
import { RevContentTrafficSourceProvider } from './RevContentTrafficSourceContext';
import { YahooTrafficSourceProvider } from './YahooTrafficSourceContext';

// Map of traffic source IDs to their provider components
const trafficSourceProviders = {
  google: GoogleTrafficSourceProvider,
  revcontent: RevContentTrafficSourceProvider,
  yahoo: YahooTrafficSourceProvider
};

// Traffic source names for display
export const trafficSourceNames = {
  google: 'Google Ads',
  revcontent: 'RevContent',
  yahoo: 'Yahoo Gemini'
};

// Traffic source descriptions
export const trafficSourceDescriptions = {
  google: 'Create campaigns for Google Search and Display Network',
  revcontent: 'Native advertising platform for content recommendation',
  yahoo: 'Search and native advertising on Yahoo properties'
};

// Component that renders the appropriate provider based on the traffic source
export const TrafficSourceFactory = ({ source, children }) => {
  const Provider = trafficSourceProviders[source];
  
  if (!Provider) {
    return <div>Invalid traffic source: {source}</div>;
  }
  
  return <Provider>{children}</Provider>;
};

// List of available traffic sources for selection
export const availableTrafficSources = [
  {
    id: 'google',
    name: trafficSourceNames.google,
    description: trafficSourceDescriptions.google
  },
  {
    id: 'revcontent',
    name: trafficSourceNames.revcontent,
    description: trafficSourceDescriptions.revcontent
  },
  {
    id: 'yahoo',
    name: trafficSourceNames.yahoo,
    description: trafficSourceDescriptions.yahoo
  }
];
