import React from 'react';
import { PrimaryDataSourceProvider, usePrimaryDataSource } from './PrimaryDataSourceContext';
import { SecondaryDataSourceProvider, useSecondaryDataSource } from './SecondaryDataSourceContext';
import { TertiaryDataSourceProvider, useTertiaryDataSource } from './TertiaryDataSourceContext';

// Data source names for display
export const dataSourceNames = {
  primary: 'Primary Integration',
  secondary: 'Content Discovery',
  tertiary: 'Network Integration'
};

// Data source descriptions
export const dataSourceDescriptions = {
  primary: 'Create projects for search and display networks',
  secondary: 'Native discovery platform for content recommendation',
  tertiary: 'Search and discovery on network properties'
};

// Each data source gets its own provider component to avoid conditional hooks

// Primary Provider+Consumer component
const PrimaryDataSource = ({ children }) => {
  if (typeof children !== 'function') {
    console.error('PrimaryDataSource children must be a function');
    return null;
  }
  
  return (
    <PrimaryDataSourceProvider>
      <PrimaryDataSourceConsumer>{children}</PrimaryDataSourceConsumer>
    </PrimaryDataSourceProvider>
  );
};

// Primary Consumer component (separate to avoid hook rules issues)
const PrimaryDataSourceConsumer = ({ children }) => {
  try {
    const contextValue = usePrimaryDataSource();
    console.log('Primary context found:', contextValue ? 'available' : 'missing', contextValue);
    return children(contextValue);
  } catch (error) {
    console.error('Error in PrimaryDataSourceConsumer:', error);
    return <div>Error getting Primary context: {error.message}</div>;
  }
};

// Secondary Provider+Consumer component
const SecondaryDataSource = ({ children }) => {
  if (typeof children !== 'function') {
    console.error('SecondaryDataSource children must be a function');
    return null;
  }
  
  return (
    <SecondaryDataSourceProvider>
      <SecondaryDataSourceConsumer>{children}</SecondaryDataSourceConsumer>
    </SecondaryDataSourceProvider>
  );
};

// Secondary Consumer component
const SecondaryDataSourceConsumer = ({ children }) => {
  try {
    const contextValue = useSecondaryDataSource();
    console.log('Secondary context found:', contextValue ? 'available' : 'missing', contextValue);
    return children(contextValue);
  } catch (error) {
    console.error('Error in SecondaryDataSourceConsumer:', error);
    return <div>Error getting Secondary context: {error.message}</div>;
  }
};

// Tertiary Provider+Consumer component
const TertiaryDataSource = ({ children }) => {
  if (typeof children !== 'function') {
    console.error('TertiaryDataSource children must be a function');
    return null;
  }
  
  return (
    <TertiaryDataSourceProvider>
      <TertiaryDataSourceConsumer>{children}</TertiaryDataSourceConsumer>
    </TertiaryDataSourceProvider>
  );
};

// Tertiary Consumer component
const TertiaryDataSourceConsumer = ({ children }) => {
  try {
    const contextValue = useTertiaryDataSource();
    console.log('Tertiary context found:', contextValue ? 'available' : 'missing', contextValue);
    return children(contextValue);
  } catch (error) {
    console.error('Error in TertiaryDataSourceConsumer:', error);
    return <div>Error getting Tertiary context: {error.message}</div>;
  }
};

/**
 * DataSourceFactory component
 * Factory that selects the appropriate data source component
 * @param {string} source - The data source ID ('primary', 'secondary', 'tertiary')
 * @param {function} children - Function that receives the data source context value
 */
export const DataSourceFactory = ({ source, children }) => {
  console.log('DataSourceFactory rendering for source:', source);
  
  // Verify children is a function
  if (typeof children !== 'function') {
    console.error('DataSourceFactory children must be a function', { childrenType: typeof children });
    return <div>Error: DataSourceFactory requires a function as children</div>;
  }
  
  // Use the appropriate component based on the source
  switch (source) {
    case 'primary':
      return <PrimaryDataSource>{children}</PrimaryDataSource>;
    case 'secondary':
      return <SecondaryDataSource>{children}</SecondaryDataSource>;
    case 'tertiary':
      return <TertiaryDataSource>{children}</TertiaryDataSource>;
    default:
      console.error('Unknown data source:', source);
      return <div>Invalid data source: {source}</div>;
  }
};

// List of available data sources for selection
export const availableDataSources = [
  {
    id: 'primary',
    name: dataSourceNames.primary,
    description: dataSourceDescriptions.primary
  },
  {
    id: 'secondary',
    name: dataSourceNames.secondary,
    description: dataSourceDescriptions.secondary
  },
  {
    id: 'tertiary',
    name: dataSourceNames.tertiary,
    description: dataSourceDescriptions.tertiary
  }
];
