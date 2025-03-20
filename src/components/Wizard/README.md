# Wizard Component

## Overview

The Wizard component provides a step-by-step interface for creating ad campaigns across different traffic sources. It follows a structured flow that guides users through selecting a traffic source, configuring campaign details, and reviewing before submission.

## Architecture

The Wizard implementation follows a modular architecture with clear separation of concerns:

1. **WizardComponent**: The main component that orchestrates the wizard flow
2. **WizardContext**: Manages navigation state and step progression (located in `/src/contexts/WizardContext.js`)
3. **Step Components**: Individual components for each step of the wizard
4. **Styled Components**: UI elements specific to the wizard interface
5. **Constants**: Configuration for wizard steps

## Wizard Steps

The wizard consists of three main steps:

1. **Source Selection Step**: Allows users to select a traffic source (Google, Yahoo, RevContent)
2. **Campaign Form Step**: Displays a form with fields specific to the selected traffic source
3. **Review Step**: Shows a summary of the campaign details before submission

Each step is implemented as a separate component in the `Steps` directory.

## Component Structure

```
Wizard/
├── Steps/
│   ├── SourceSelectionStep.js   # Traffic source selection
│   ├── CampaignFormStep.js      # Traffic source-specific form
│   └── ReviewStep.js            # Campaign review and submission
├── styled/
│   └── WizardElements.js        # Styled components for the wizard UI
├── components/                  # Reusable components specific to the wizard
├── utils/                       # Utility functions for the wizard
├── constants.js                 # Configuration constants
├── index.js                     # Entry point for the wizard
└── WizardComponent.js           # Main wizard component
```

## Integration with Contexts

The Wizard component integrates with two types of contexts:

1. **WizardContext**: Manages the navigation state (current step, selected traffic source)
2. **Traffic Source Contexts**: Manage the form data specific to each traffic source

The `WizardComponent` uses the `TrafficSourceFactory` to dynamically provide the appropriate traffic source context based on the selected source.

## Usage

To use the Wizard component in your application:

```jsx
import { WizardProvider } from './contexts/WizardContext';
import Wizard from './components/Wizard';

function App() {
  return (
    <WizardProvider>
      <Wizard />
    </WizardProvider>
  );
}
```

## Flow Logic

1. **Step Navigation**:
   - The wizard tracks the current step in the WizardContext
   - Navigation between steps is controlled by the `nextStep` and `prevStep` methods
   - The wizard ensures that a traffic source is selected before proceeding to later steps

2. **Traffic Source Selection**:
   - When a traffic source is selected, it's stored in the WizardContext
   - The appropriate traffic source context is then provided to subsequent steps

3. **Form Validation**:
   - Each traffic source has its own validation schema
   - Validation is performed before allowing navigation to the next step
   - Errors are displayed inline with the form fields

4. **Submission**:
   - The final step allows reviewing all entered information
   - Upon submission, the campaign data is sent to the server
   - Submission state (loading, success, error) is tracked in the traffic source context

## Extending the Wizard

To add a new traffic source:

1. Create a new traffic source context in `/src/contexts/`
2. Create a new schema in `/src/schemas/`
3. Update the `TrafficSourceFactory` to include the new source
4. Add the new source to the selection options in `SourceSelectionStep`
