import React from 'react';
import { GoogleTrafficSourceProvider, useGoogleTrafficSource } from './GoogleTrafficSourceContext';
import { RevContentTrafficSourceProvider, useRevContentTrafficSource } from './RevContentTrafficSourceContext';
import { YahooTrafficSourceProvider, useYahooTrafficSource } from './YahooTrafficSourceContext';

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

// Each traffic source gets its own provider component to avoid conditional hooks

// Google Provider+Consumer component
const GoogleTrafficSource = ({ children }) => {
  if (typeof children !== 'function') {
    console.error('GoogleTrafficSource children must be a function');
    return null;
  }
  
  return (
    <GoogleTrafficSourceProvider>
      <GoogleTrafficSourceConsumer>{children}</GoogleTrafficSourceConsumer>
    </GoogleTrafficSourceProvider>
  );
};

// Google Consumer component (separate to avoid hook rules issues)
const GoogleTrafficSourceConsumer = ({ children }) => {
  try {
    const contextValue = useGoogleTrafficSource();
    console.log('Google context found:', contextValue ? 'available' : 'missing', contextValue);
    return children(contextValue);
  } catch (error) {
    console.error('Error in GoogleTrafficSourceConsumer:', error);
    return <div>Error getting Google context: {error.message}</div>;
  }
};

// RevContent Provider+Consumer component
const RevContentTrafficSource = ({ children }) => {
  if (typeof children !== 'function') {
    console.error('RevContentTrafficSource children must be a function');
    return null;
  }
  
  return (
    <RevContentTrafficSourceProvider>
      <RevContentTrafficSourceConsumer>{children}</RevContentTrafficSourceConsumer>
    </RevContentTrafficSourceProvider>
  );
};

// RevContent Consumer component
const RevContentTrafficSourceConsumer = ({ children }) => {
  try {
    const contextValue = useRevContentTrafficSource();
    console.log('RevContent context found:', contextValue ? 'available' : 'missing', contextValue);
    return children(contextValue);
  } catch (error) {
    console.error('Error in RevContentTrafficSourceConsumer:', error);
    return <div>Error getting RevContent context: {error.message}</div>;
  }
};

// Yahoo Provider+Consumer component
const YahooTrafficSource = ({ children }) => {
  if (typeof children !== 'function') {
    console.error('YahooTrafficSource children must be a function');
    return null;
  }
  
  return (
    <YahooTrafficSourceProvider>
      <YahooTrafficSourceConsumer>{children}</YahooTrafficSourceConsumer>
    </YahooTrafficSourceProvider>
  );
};

// Yahoo Consumer component
const YahooTrafficSourceConsumer = ({ children }) => {
  try {
    const contextValue = useYahooTrafficSource();
    console.log('Yahoo context found:', contextValue ? 'available' : 'missing', contextValue);
    return children(contextValue);
  } catch (error) {
    console.error('Error in YahooTrafficSourceConsumer:', error);
    return <div>Error getting Yahoo context: {error.message}</div>;
  }
};

/**
 * TrafficSourceFactory component
 * Factory that selects the appropriate traffic source component
 * @param {string} source - The traffic source ID ('google', 'revcontent', 'yahoo')
 * @param {function} children - Function that receives the traffic source context value
 */
export const TrafficSourceFactory = ({ source, children }) => {
  console.log('TrafficSourceFactory rendering for source:', source);
  
  // Verify children is a function
  if (typeof children !== 'function') {
    console.error('TrafficSourceFactory children must be a function', { childrenType: typeof children });
    return <div>Error: TrafficSourceFactory requires a function as children</div>;
  }
  
  // Use the appropriate component based on the source
  switch (source) {
    case 'google':
      return <GoogleTrafficSource>{children}</GoogleTrafficSource>;
    case 'revcontent':
      return <RevContentTrafficSource>{children}</RevContentTrafficSource>;
    case 'yahoo':
      return <YahooTrafficSource>{children}</YahooTrafficSource>;
    default:
      console.error('Unknown traffic source:', source);
      return <div>Invalid traffic source: {source}</div>;
  }
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
