import createSecondarySchema from './secondarySchema';

describe('secondarySchema', () => {
  // Create a schema object for testing
  const schema = createSecondarySchema();

  // Valid test data
  const validData = {
    projectName: 'Test Secondary Project',
    targetUrl: 'https://example.com',
    bidAmount: 0.05,
    dailyBudget: 10,
    targeting: {
      countries: ['US', 'CA'],
      devices: ['desktop', 'mobile']
    }
  };

  test('should validate valid Secondary project data', () => {
    const { error } = schema.validate(validData);
    expect(error).toBeUndefined();
  });

  describe('targetUrl validation', () => {
    test('should reject invalid URL', () => {
      const data = { ...validData, targetUrl: 'not-a-url' };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Target URL must be a valid URL');
    });

    test('should reject empty target URL', () => {
      const data = { ...validData, targetUrl: '' };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Target URL is required');
    });

    test('should require target URL field', () => {
      const { targetUrl, ...data } = validData;
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Target URL is required');
    });
  });

  describe('bidAmount validation', () => {
    test('should reject non-numeric bid amount', () => {
      const data = { ...validData, bidAmount: 'invalid' };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Bid amount must be a number');
    });

    test('should reject bid amount less than $0.01', () => {
      const data = { ...validData, bidAmount: 0.001 };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Bid amount must be at least $0.01');
    });

    test('should require bid amount field', () => {
      const { bidAmount, ...data } = validData;
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('Bid amount is required');
    });
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

  describe('targeting validation', () => {
    test('should reject targeting without countries', () => {
      const data = {
        ...validData,
        targeting: {
          ...validData.targeting,
          countries: []
        }
      };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('At least one country must be selected');
    });

    test('should reject targeting without devices', () => {
      const data = {
        ...validData,
        targeting: {
          ...validData.targeting,
          devices: []
        }
      };
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('At least one device must be selected');
    });

    test('should require targeting field', () => {
      const { targeting, ...data } = validData;
      const { error } = schema.validate(data);
      expect(error).toBeDefined();
      expect(error.message).toContain('required');
    });
  });
});
