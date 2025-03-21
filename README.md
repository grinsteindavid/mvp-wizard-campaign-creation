# Workflow Wizard

[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://grinsteindavid.github.io/mvp-wizard)

## Overview

Workflow Wizard is a React-based multi-step form application that guides users through creating and managing projects across multiple data sources. It provides a streamlined, wizard-like interface for collecting and validating information specific to different data source integrations.

## Features

- **Multi-step Wizard Interface**: Guided step-by-step process for project creation
- **Data Source Selection**: Support for multiple data source integrations (Primary, Secondary, Tertiary)
- **Dynamic Form Generation**: Forms adapt based on the selected data source
- **Form Validation**: Comprehensive validation using Joi schemas
- **Context-based State Management**: Clean separation of navigation and data concerns
- **Responsive Design**: Mobile-friendly interface using styled-components

## Architecture

The application follows a modular architecture with clear separation of concerns:

### Core Components

1. **Wizard Component**: The main component orchestrating the wizard flow
2. **WizardContext**: Manages navigation state and step progression
3. **Data Source Contexts**: Handle data source-specific form data and validation
4. **Form Components**: Reusable form elements with validation support
5. **Validation Service**: Centralized validation using Joi schemas

### Wizard Flow

1. **Source Selection Step**: User selects a data source (Primary, Secondary, Tertiary)
2. **Project Setup Step**: User fills out a form with fields specific to the selected data source
3. **Review Step**: User reviews the entered information before submission

### Context Structure

- **WizardContext**: Handles navigation state (current step, selected data source)
- **BaseDataSourceContext**: Provides common functionality for all data source contexts
- **Specific Data Source Contexts**: Extend the base context with source-specific fields and validation

## Technology Stack

- **React**: UI library for building the interface
- **React Context API**: For state management
- **Styled Components**: For component-scoped styling
- **Formik**: Form handling and validation
- **Joi**: Schema validation
- **React Router**: For navigation

## Project Structure

```
src/
├── components/
│   ├── FormComponents/    # Reusable form elements
│   └── Wizard/            # Wizard-specific components
│       ├── Steps/         # Step components
│       ├── components/    # Wizard sub-components
│       ├── styled/        # Styled components
│       └── utils/         # Utility functions
├── contexts/              # React contexts
├── schemas/               # Validation schemas
├── services/              # Application services
└── utils/                 # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/grinsteindavid/mvp-wizard.git
cd mvp-wizard

# Install dependencies
npm install

# Start the development server
npm start
```

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
npm test
```

## Extending the Wizard

### Adding a New Data Source

1. Create a new data source context in `/src/contexts/`
2. Create a validation schema in `/src/schemas/`
3. Update the `DataSourceFactory` to include the new source
4. Add the new source to the selection options in `SourceSelectionStep`

### Customizing Form Fields

Form fields are defined in each data source context. To customize fields:

1. Modify the field definitions in the relevant data source context
2. Update the validation schema to match the new field requirements

## License

MIT
