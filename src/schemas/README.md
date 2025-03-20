# Schemas

## Overview

This directory contains validation schemas for the application's form data. The schemas are built using [Joi](https://joi.dev/), a powerful schema description language and data validator for JavaScript.

## Schema Structure

The schemas are organized in a hierarchical structure:

1. **baseSchema.js** - Contains common validation rules used across all traffic sources
2. **Traffic Source-Specific Schemas** - Extend the base schema with source-specific validation rules
   - googleSchema.js
   - yahooSchema.js
   - revContentSchema.js
3. **index.js** - Exports all schemas and provides utility functions for schema selection

## Base Schema

The `baseSchema` defines validation rules for fields that are common across all traffic sources:

```javascript
// Example from baseSchema.js
const baseSchema = {
  campaignName: Joi.string().min(3).max(50).required().messages({
    'string.empty': 'Campaign name is required',
    'string.min': 'Campaign name must be at least 3 characters',
    'string.max': 'Campaign name cannot exceed 50 characters'
  })
};
```

## Traffic Source-Specific Schemas

Each traffic source has its own schema that extends the base schema with fields specific to that source:

### Google Schema

Contains validation rules for Google-specific campaign fields such as:
- Ad group name
- Keywords
- Bid amount
- Targeting options

### Yahoo Schema

Contains validation rules for Yahoo-specific campaign fields such as:
- Campaign budget
- Audience targeting
- Ad format options

### RevContent Schema

Contains validation rules for RevContent-specific campaign fields such as:
- Content categories
- Placement options
- Bid strategy

## Schema Usage

The schemas are used in conjunction with the Traffic Source Contexts to validate form data before submission:

```javascript
// Example usage in a validation service
import { getSchemaForSource } from '../schemas';

function validateCampaignData(source, data) {
  const schema = getSchemaForSource(source);
  const result = schema.validate(data, { abortEarly: false });
  
  if (result.error) {
    // Transform Joi errors into a more usable format
    const errors = {};
    result.error.details.forEach(detail => {
      errors[detail.path[0]] = detail.message;
    });
    return { isValid: false, errors };
  }
  
  return { isValid: true };
}
```

## Benefits

1. **Centralized Validation Logic**: All validation rules are defined in one place
2. **Consistent Error Messages**: Standardized error messages across the application
3. **Extensibility**: Easy to add new validation rules or traffic sources
4. **Separation of Concerns**: Validation logic is separated from UI components
5. **Testability**: Schemas can be tested independently of the UI
