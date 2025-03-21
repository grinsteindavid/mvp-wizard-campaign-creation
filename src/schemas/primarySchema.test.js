import createPrimarySchema from './primarySchema';

describe('primarySchema', () => {
  // Create a schema object for testing
  const schema = createPrimarySchema();

  // Valid test data
  const validData = {
    projectName: 'Test Primary Project',
    dailyBudget: 10,
    bidStrategy: 'cpc',
    keywords: 'test, keywords, primary',
    categoryGroups: [
      {
        name: 'Category Group 1',
        cpc: 0.5
      }
    ]
  };

  test('should validate valid Primary project data', () => {
    const { error } = schema.validate(validData);
    expect(error).toBeUndefined();
  });

  test('should validate multiple category groups', () => {
    const data = {
      ...validData,
      categoryGroups: [
        { name: 'Category Group 1', cpc: 0.5 },
        { name: 'Category Group 2', cpc: 1.0 }
      ]
    };
    const { error } = schema.validate(data);
    expect(error).toBeUndefined();
  });

  describe('dailyBudget validation', () => {
    test('should reject non-numeric daily budget', () => {
      const data = { ...validData, dailyBudget: 'invalid' };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Daily budget must be a number');
    });

    test('should reject daily budget less than $5', () => {
      const data = { ...validData, dailyBudget: 4 };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Daily budget must be at least $5');
    });

    test('should require daily budget field', () => {
      const { dailyBudget, ...data } = validData;
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Daily budget is required');
    });
  });

  describe('bidStrategy validation', () => {
    test('should validate all valid bid strategies', () => {
      const validStrategies = ['cpc', 'cpm', 'cpv'];
      
      validStrategies.forEach(strategy => {
        const data = { ...validData, bidStrategy: strategy };
        const { error } = schema.validate(data);
        expect(error).toBeUndefined();
      });
    });

    test('should reject invalid bid strategy', () => {
      const data = { ...validData, bidStrategy: 'invalid' };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Please select a valid bid strategy');
    });

    test('should require bid strategy field', () => {
      const { bidStrategy, ...data } = validData;
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Bid strategy is required');
    });
  });

  describe('keywords validation', () => {
    test('should reject empty keywords', () => {
      const data = { ...validData, keywords: '' };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Keywords are required');
    });

    test('should require keywords field', () => {
      const { keywords, ...data } = validData;
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('required');
    });
  });

  describe('categoryGroups validation', () => {
    test('should reject empty category groups array', () => {
      const data = { ...validData, categoryGroups: [] };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('At least one category group is required');
    });

    test('should require category groups field', () => {
      const { categoryGroups, ...data } = validData;
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Category groups are required');
    });

    test('should reject category group without name', () => {
      const data = {
        ...validData,
        categoryGroups: [
          { name: 'Valid Group', cpc: 0.5 },
          { cpc: 0.5 } // This one is missing the name
        ]
      };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('required');
    });

    test('should reject category group with invalid CPC', () => {
      const data = {
        ...validData,
        categoryGroups: [{ name: 'Category Group 1', cpc: 0 }]
      };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Max CPC must be at least $0.01');
    });

    test('should reject category group without CPC', () => {
      const data = {
        ...validData,
        categoryGroups: [{ name: 'Category Group 1' }]
      };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Max CPC is required');
    });
  });
});
