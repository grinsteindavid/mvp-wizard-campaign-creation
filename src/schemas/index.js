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

// For backward compatibility
const createGoogleSchema = createPrimarySchema;
const createRevContentSchema = createSecondarySchema;
const createYahooSchema = createTertiarySchema;

export {
  baseSchema,
  createPrimarySchema,
  createSecondarySchema,
  createTertiarySchema,
  // For backward compatibility
  createGoogleSchema,
  createRevContentSchema,
  createYahooSchema,
  schemaCreators
};
