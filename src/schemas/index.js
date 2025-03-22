import baseSchema from './baseSchema';
import createPrimarySchema from './primarySchema';
import createSecondarySchema from './secondarySchema';
import createTertiarySchema from './tertiarySchema';

// Map of data sources to their validation schema creators
const schemaCreators = {
  primary: createPrimarySchema,
  secondary: createSecondarySchema,
  tertiary: createTertiarySchema
};



export {
  baseSchema,
  createPrimarySchema,
  createSecondarySchema,
  createTertiarySchema,
  schemaCreators
};
