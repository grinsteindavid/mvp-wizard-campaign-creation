import createTertiarySchema from './tertiarySchema';

describe('tertiarySchema', () => {
  // Create a schema object for testing
  const schema = createTertiarySchema();

  // Valid test data
  const validData = {
    projectName: 'Test Tertiary Project',
    projectObjective: 'visits',
    startDate: '2025-01-01',
    endDate: '2025-02-01',
    budget: {
      amount: 20,
      type: 'daily'
    },
    bidding: {
      strategy: 'manual',
      amount: 0.5
    }
  };

  test('should validate valid Tertiary project data', () => {
    const { error } = schema.validate(validData);
    expect(error).toBeUndefined();
  });

  describe('projectObjective validation', () => {
    test('should validate all valid project objectives', () => {
      const validObjectives = ['visits', 'awareness', 'conversions'];
      
      validObjectives.forEach(objective => {
        const data = { ...validData, projectObjective: objective };
        const { error } = schema.validate(data);
        expect(error).toBeUndefined();
      });
    });

    test('should reject invalid project objective', () => {
      const data = { ...validData, projectObjective: 'invalid' };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Please select a valid project objective');
    });

    test('should require project objective field', () => {
      const { projectObjective, ...data } = validData;
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Project objective is required');
    });
  });

  describe('date validation', () => {
    test('should reject invalid start date format', () => {
      const data = { ...validData, startDate: 'not-a-date' };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('must be in ISO 8601 date format');
    });

    test('should require start date field', () => {
      const { startDate, ...data } = validData;
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Start date is required');
    });

    test('should reject end date before start date', () => {
      const data = { ...validData, endDate: '2024-01-01' };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('End date must be after start date');
    });

    test('should allow empty end date', () => {
      const data = { ...validData, endDate: '' };
      const { error } = schema.validate(data);
      expect(error).toBeUndefined();
    });

    test('should allow null end date', () => {
      const data = { ...validData, endDate: null };
      const { error } = schema.validate(data);
      expect(error).toBeUndefined();
    });
  });

  describe('budget validation', () => {
    test('should reject budget amount less than $10', () => {
      const data = {
        ...validData,
        budget: { ...validData.budget, amount: 9 }
      };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Budget amount must be at least $10');
    });

    test('should reject non-numeric budget amount', () => {
      const data = {
        ...validData,
        budget: { ...validData.budget, amount: 'invalid' }
      };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Budget amount must be a number');
    });

    test('should validate all valid budget types', () => {
      const validTypes = ['daily', 'lifetime'];
      
      validTypes.forEach(type => {
        const data = {
          ...validData,
          budget: { ...validData.budget, type }
        };
        const { error } = schema.validate(data);
        expect(error).toBeUndefined();
      });
    });

    test('should reject invalid budget type', () => {
      const data = {
        ...validData,
        budget: { ...validData.budget, type: 'invalid' }
      };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Please select a valid budget type');
    });

    test('should require budget field', () => {
      const { budget, ...data } = validData;
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('required');
    });
  });

  describe('bidding validation', () => {
    test('should validate all valid bidding strategies', () => {
      const validStrategies = ['manual', 'auto'];
      
      validStrategies.forEach(strategy => {
        const data = {
          ...validData,
          bidding: { ...validData.bidding, strategy }
        };
        const { error } = schema.validate(data);
        expect(error).toBeUndefined();
      });
    });

    test('should reject invalid bidding strategy', () => {
      const data = {
        ...validData,
        bidding: { ...validData.bidding, strategy: 'invalid' }
      };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Please select a valid bid strategy');
    });

    test('should require bid amount for manual strategy', () => {
      const data = {
        ...validData,
        bidding: { strategy: 'manual' }
      };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Bid amount is required for manual bidding');
    });

    test('should allow empty bid amount for auto strategy', () => {
      const data = {
        ...validData,
        bidding: { strategy: 'auto', amount: '' }
      };
      const { error } = schema.validate(data);
      expect(error).toBeUndefined();
    });

    test('should require bidding field', () => {
      const { bidding, ...data } = validData;
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('required');
    });
  });
});
