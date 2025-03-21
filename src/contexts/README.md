# Contexts

## Overview

This directory contains React Context providers that manage state throughout the application. The contexts are organized into two main categories:

1. **Wizard Context** - Manages navigation and step progression
2. **Data Source Contexts** - Manage data source-specific data and validation

## WizardContext

The `WizardContext` is responsible for managing the navigation flow of the wizard interface. It has been designed with a clear separation of concerns, focusing solely on navigation and step management.

### Key Features

- **Step Navigation**: Provides methods for moving between wizard steps (`nextStep`, `prevStep`, `setStep`)
- **Data Source Selection**: Tracks the selected data source type
- **Progress Tracking**: Maintains the `lastCompletedStep` to track user progress
- **Reset Functionality**: Allows resetting the wizard state

### Usage

```jsx
import { useWizard } from '../contexts/WizardContext';

function MyComponent() {
  const { currentStep, nextStep, prevStep, dataSource } = useWizard();
  
  return (
    <div>
      <p>Current step: {currentStep}</p>
      <button onClick={prevStep}>Previous</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
}
```

## Data Source Contexts

The application uses a factory pattern for data source contexts. Each data source has its own context that extends from the `BaseDataSourceContext`.

### BaseDataSourceContext

Provides common functionality for all data source contexts:

- Form field state management
- Validation state tracking
- Submission state management (isSubmitting, isSubmitted)
- Error handling

### Data Source-Specific Contexts

The application includes several data source contexts:

- **PrimaryDataSourceContext**: Manages Google-specific campaign data
- **SecondaryDataSourceContext**: Manages Yahoo-specific campaign data
- **TertiaryDataSourceContext**: Manages RevContent-specific campaign data

Each context extends the base functionality with source-specific fields and validation.

### DataSourceFactory

The `DataSourceFactory` component dynamically selects and provides the appropriate data source context based on the selected source type.

### Usage

```jsx
import { usePrimaryDataSource } from '../contexts/PrimaryDataSourceContext';

function GoogleCampaignForm() {
  const { state, updateField, setValidationResult } = usePrimaryDataSource();
  
  return (
    <form>
      <input 
        value={state.campaignName} 
        onChange={(e) => updateField('campaignName', e.target.value)} 
      />
      {state.errors.campaignName && (
        <p className="error">{state.errors.campaignName}</p>
      )}
    </form>
  );
}
```

## Context Integration

The contexts work together to create a seamless wizard experience:

1. `WizardContext` manages the step navigation
2. `DataSourceFactory` provides the appropriate data source context
3. Data source contexts manage the form data and validation

This separation of concerns makes the code more maintainable and testable.
