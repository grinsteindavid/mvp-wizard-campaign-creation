import {
  baseSchema,
  createGoogleSchema,
  createRevContentSchema,
  createYahooSchema,
  schemaCreators
} from './index';

describe('schemas index', () => {
  test('should export baseSchema', () => {
    expect(baseSchema).toBeDefined();
    expect(baseSchema.campaignName).toBeDefined();
  });

  test('should export createGoogleSchema function', () => {
    expect(typeof createGoogleSchema).toBe('function');
    const schema = createGoogleSchema();
    expect(schema.describe().type).toBe('object');
  });

  test('should export createRevContentSchema function', () => {
    expect(typeof createRevContentSchema).toBe('function');
    const schema = createRevContentSchema();
    expect(schema.describe().type).toBe('object');
  });

  test('should export createYahooSchema function', () => {
    expect(typeof createYahooSchema).toBe('function');
    const schema = createYahooSchema();
    expect(schema.describe().type).toBe('object');
  });

  test('should export schemaCreators object with all traffic sources', () => {
    expect(schemaCreators).toBeDefined();
    expect(schemaCreators.google).toBe(createGoogleSchema);
    expect(schemaCreators.revcontent).toBe(createRevContentSchema);
    expect(schemaCreators.yahoo).toBe(createYahooSchema);
  });

  test('should create valid schemas for each traffic source', () => {
    const trafficSources = Object.keys(schemaCreators);
    expect(trafficSources).toContain('google');
    expect(trafficSources).toContain('revcontent');
    expect(trafficSources).toContain('yahoo');

    trafficSources.forEach(source => {
      const createSchema = schemaCreators[source];
      expect(typeof createSchema).toBe('function');
      
      const schema = createSchema();
      expect(schema.describe().type).toBe('object');
    });
  });
});
