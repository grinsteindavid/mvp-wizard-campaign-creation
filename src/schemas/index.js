import baseSchema from './baseSchema';
import createGoogleSchema from './googleSchema';
import createRevContentSchema from './revContentSchema';
import createYahooSchema from './yahooSchema';

// Map of traffic sources to their validation schema creators
const schemaCreators = {
  google: createGoogleSchema,
  revcontent: createRevContentSchema,
  yahoo: createYahooSchema
};

export {
  baseSchema,
  createGoogleSchema,
  createRevContentSchema,
  createYahooSchema,
  schemaCreators
};
