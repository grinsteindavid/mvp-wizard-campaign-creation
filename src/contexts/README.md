# Contexts

## Overview

This directory contains React Context providers that manage state throughout the application. The contexts are organized into two main categories:

1. **Wizard Context** - Manages navigation and step progression
2. **Traffic Source Contexts** - Manage traffic source-specific data and validation

## WizardContext

The `WizardContext` is responsible for managing the navigation flow of the wizard interface. It has been designed with a clear separation of concerns, focusing solely on navigation and step management.

### Key Features

- **Step Navigation**: Provides methods for moving between wizard steps (`nextStep`, `prevStep`, `setStep`)
- **Traffic Source Selection**: Tracks the selected traffic source type
- **Progress Tracking**: Maintains the `lastCompletedStep` to track user progress
- **Reset Functionality**: Allows resetting the wizard state

### Usage

```jsx
import { useWizard } from '../contexts/WizardContext';

function MyComponent() {
  const { currentStep, nextStep, prevStep, trafficSource } = useWizard();
  
  return (
    <div>
      <p>Current step: {currentStep}</p>
      <button onClick={prevStep}>Previous</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
}
```

## Traffic Source Contexts

The application uses a factory pattern for traffic source contexts. Each traffic source has its own context that extends from the `BaseTrafficSourceContext`.

### BaseTrafficSourceContext

Provides common functionality for all traffic source contexts:

- Form field state management
- Validation state tracking
- Submission state management (isSubmitting, isSubmitted)
- Error handling

### Traffic Source-Specific Contexts

The application includes several traffic source contexts:

- **GoogleTrafficSourceContext**: Manages Google-specific campaign data
- **YahooTrafficSourceContext**: Manages Yahoo-specific campaign data
- **RevContentTrafficSourceContext**: Manages RevContent-specific campaign data

Each context extends the base functionality with source-specific fields and validation.

### TrafficSourceFactory

The `TrafficSourceFactory` component dynamically selects and provides the appropriate traffic source context based on the selected source type.

### Usage

```jsx
import { useGoogleTrafficSource } from '../contexts/GoogleTrafficSourceContext';

function GoogleCampaignForm() {
  const { state, updateField, setValidationResult } = useGoogleTrafficSource();
  
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
2. `TrafficSourceFactory` provides the appropriate traffic source context
3. Traffic source contexts manage the form data and validation

This separation of concerns makes the code more maintainable and testable.
