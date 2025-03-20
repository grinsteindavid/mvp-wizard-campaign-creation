# Ad Campaign Wizard

A React-based wizard for creating ad campaigns across multiple traffic sources like Google Ads, RevContent, and Yahoo Gemini. This project provides a step-by-step interface for configuring and validating ad campaigns with different requirements based on the selected traffic source.

## Project Structure

```
src/
├── components/
│   ├── FormComponents/     # Generic reusable form components
│   │   ├── FormField.js    # Basic form field component
│   │   ├── FormGroup.js    # Component for grouped fields
│   │   ├── ArrayField.js   # Component for array fields
│   │   └── DynamicForm.js  # Dynamic form generator
│   └── Wizard/             # Wizard step components
│       ├── SourceSelectionStep.js  # Traffic source selection
│       ├── CampaignFormStep.js     # Campaign configuration
│       ├── ReviewStep.js           # Review and submit
│       └── Wizard.js               # Main wizard component
├── contexts/
│   ├── WizardContext.js    # Global wizard state management
│   └── TrafficSourceContext.js  # Traffic source configuration
└── services/
    └── validationService.js  # Joi validation for campaigns
```

## Features

- Multi-step wizard interface with progress tracking
- Dynamic form generation based on traffic source
- Different form field types (text, select, checkbox, arrays, etc.)
- Form validation using Joi
- Context-based state management
- Responsive design with styled-components

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# mvp-wizard-campaign-creation
