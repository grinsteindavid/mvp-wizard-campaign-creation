# Form Components

A collection of reusable form components for building dynamic forms with validation.

## Components Structure

### Main Components

- **DynamicForm**: The main form component that renders fields based on a configuration object.
- **FormField**: A generic field component that renders the appropriate field type.
- **FormGroup**: A component for grouping related fields together.
- **ArrayField**: A component for handling arrays of form fields.

### Field Components

- **TextField**: For text, email, number, date, and URL inputs.
- **TextAreaField**: For multi-line text inputs.
- **SelectField**: For dropdown select inputs.
- **MultiSelectField**: For multi-select inputs.
- **CheckboxField**: For single checkbox inputs.
- **CheckboxesField**: For multiple checkbox inputs.
- **RadioField**: For radio button inputs.

### Styled Components

All styled components are centralized in `styled/FormElements.js` for consistent styling and easier maintenance.

## Usage Example

```jsx
import React, { useState } from 'react';
import DynamicForm from './components/FormComponents/DynamicForm';
import { validateProject } from './services/validationService';
import { prepareInitialValues } from './utils/formUtils';

const MyForm = ({ dataSource }) => {
  // Define form fields based on data source
  const fields = {
    campaignName: {
      type: 'text',
      label: 'Campaign Name',
      required: true
    },
    budget: {
      type: 'number',
      label: 'Budget',
      required: true,
      validation: {
        min: 0
      }
    },
    // Add more fields as needed
  };
  
  // Initialize form state
  const [values, setValues] = useState(prepareInitialValues(fields));
  const [errors, setErrors] = useState({});
  
  // Handle form changes
  const handleFormChange = (newValues) => {
    setValues(newValues);
    
    // Validate the form
    const { isValid, errors } = validateProject(dataSource, newValues);
    setErrors(errors);
  };
  
  return (
    <DynamicForm
      fields={fields}
      values={values}
      onChange={handleFormChange}
      errors={errors}
    />
  );
};

export default MyForm;
```

## Field Configuration

Each field in the form is configured with an object that specifies its properties:

```javascript
{
  type: 'text', // The field type
  label: 'Field Label', // The display label
  required: true, // Whether the field is required
  placeholder: 'Enter value...', // Placeholder text
  helpText: 'This is help text', // Additional help text
  validation: { // Validation rules
    min: 0,
    max: 100
  },
  options: [ // For select, multiselect, checkboxes, and radio fields
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]
}
```

## Form Groups

You can group related fields together using the `group` field type:

```javascript
{
  contactInfo: {
    type: 'group',
    label: 'Contact Information',
    fields: {
      name: {
        type: 'text',
        label: 'Name',
        required: true
      },
      email: {
        type: 'email',
        label: 'Email',
        required: true
      }
    }
  }
}
```

## Array Fields

You can create repeatable sections using the `array` field type:

```javascript
{
  addresses: {
    type: 'array',
    label: 'Addresses',
    fields: {
      street: {
        type: 'text',
        label: 'Street',
        required: true
      },
      city: {
        type: 'text',
        label: 'City',
        required: true
      },
      zipCode: {
        type: 'text',
        label: 'ZIP Code',
        required: true
      }
    }
  }
}
```

## Validation

Form validation is handled by the validation service using Joi schemas. The validation service returns an object with `isValid` and `errors` properties that can be passed to the DynamicForm component.
