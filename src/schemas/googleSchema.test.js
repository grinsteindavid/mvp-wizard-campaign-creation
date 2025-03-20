import createGoogleSchema from './googleSchema';

describe('googleSchema', () => {
  // Create a schema object for testing
  const schema = createGoogleSchema();

  // Valid test data
  const validData = {
    campaignName: 'Test Google Campaign',
    dailyBudget: 10,
    bidStrategy: 'cpc',
    keywords: 'test, keywords, google',
    adGroups: [
      {
        name: 'Ad Group 1',
        cpc: 0.5
      }
    ]
  };

  test('should validate valid Google campaign data', () => {
    const { error } = schema.validate(validData);
    expect(error).toBeUndefined();
  });

  test('should validate multiple ad groups', () => {
    const data = {
      ...validData,
      adGroups: [
        { name: 'Ad Group 1', cpc: 0.5 },
        { name: 'Ad Group 2', cpc: 1.0 }
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

  describe('adGroups validation', () => {
    test('should reject empty ad groups array', () => {
      const data = { ...validData, adGroups: [] };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('At least one ad group is required');
    });

    test('should require ad groups field', () => {
      const { adGroups, ...data } = validData;
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Ad groups are required');
    });

    test('should reject ad group without name', () => {
      const data = {
        ...validData,
        adGroups: [
          { name: 'Valid Group', cpc: 0.5 },
          { cpc: 0.5 } // This one is missing the name
        ]
      };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('required');
    });

    test('should reject ad group with invalid CPC', () => {
      const data = {
        ...validData,
        adGroups: [{ name: 'Ad Group 1', cpc: 0 }]
      };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Max CPC must be at least $0.01');
    });

    test('should reject ad group without CPC', () => {
      const data = {
        ...validData,
        adGroups: [{ name: 'Ad Group 1' }]
      };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Max CPC is required');
    });
  });
});
