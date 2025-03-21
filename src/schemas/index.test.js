import {
  baseSchema,
  createPrimarySchema,
  createSecondarySchema,
  createTertiarySchema,
  createGoogleSchema,
  createRevContentSchema,
  createYahooSchema,
  schemaCreators
} from './index';

describe('schemas index', () => {
  test('should export baseSchema', () => {
    expect(baseSchema).toBeDefined();
    expect(baseSchema.projectName).toBeDefined();
  });

  test('should export createPrimarySchema function', () => {
    expect(typeof createPrimarySchema).toBe('function');
    const schema = createPrimarySchema();
    expect(schema.describe().type).toBe('object');
  });

  test('should export createSecondarySchema function', () => {
    expect(typeof createSecondarySchema).toBe('function');
    const schema = createSecondarySchema();
    expect(schema.describe().type).toBe('object');
  });

  test('should export createTertiarySchema function', () => {
    expect(typeof createTertiarySchema).toBe('function');
    const schema = createTertiarySchema();
    expect(schema.describe().type).toBe('object');
  });

  test('should export backward compatibility functions', () => {
    expect(createGoogleSchema).toBe(createPrimarySchema);
    expect(createRevContentSchema).toBe(createSecondarySchema);
    expect(createYahooSchema).toBe(createTertiarySchema);
  });

  test('should export schemaCreators object with all data sources', () => {
    expect(schemaCreators).toBeDefined();
    expect(schemaCreators.primary).toBe(createPrimarySchema);
    expect(schemaCreators.secondary).toBe(createSecondarySchema);
    expect(schemaCreators.tertiary).toBe(createTertiarySchema);
  });

  test('should create valid schemas for each data source', () => {
    const dataSources = Object.keys(schemaCreators);
    expect(dataSources).toContain('primary');
    expect(dataSources).toContain('secondary');
    expect(dataSources).toContain('tertiary');

    dataSources.forEach(source => {
      const createSchema = schemaCreators[source];
      expect(typeof createSchema).toBe('function');
      
      const schema = createSchema();
      expect(schema.describe().type).toBe('object');
    });
  });
});
