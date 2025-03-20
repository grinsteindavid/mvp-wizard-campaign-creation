import Joi from 'joi';
import baseSchema from './baseSchema';

describe('baseSchema', () => {
  // Create a schema object for testing
  const schema = Joi.object(baseSchema);

  test('should validate valid campaign name', () => {
    const validData = { campaignName: 'Test Campaign' };
    const { error } = schema.validate(validData);
    expect(error).toBeUndefined();
  });

  test('should reject empty campaign name', () => {
    const invalidData = { campaignName: '' };
    const { error } = schema.validate(invalidData);
    expect(error).toBeDefined();
    expect(error.message).toContain('Campaign name is required');
  });

  test('should reject campaign name shorter than 3 characters', () => {
    const invalidData = { campaignName: 'AB' };
    const { error } = schema.validate(invalidData);
    expect(error).toBeDefined();
    expect(error.message).toContain('Campaign name must be at least 3 characters');
  });

  test('should reject campaign name longer than 50 characters', () => {
    const invalidData = { campaignName: 'A'.repeat(51) };
    const { error } = schema.validate(invalidData);
    expect(error).toBeDefined();
    expect(error.message).toContain('Campaign name cannot exceed 50 characters');
  });

  test('should require campaign name field', () => {
    const invalidData = {};
    const { error } = schema.validate(invalidData);
    expect(error).toBeDefined();
    expect(error.message).toContain('required');
  });
});
