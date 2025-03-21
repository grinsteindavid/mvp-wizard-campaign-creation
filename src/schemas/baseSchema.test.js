import Joi from 'joi';
import baseSchema from './baseSchema';

describe('baseSchema', () => {
  // Create a schema object for testing
  const schema = Joi.object(baseSchema);

  test('should validate valid project name', () => {
    const validData = { projectName: 'Test Project' };
    const { error } = schema.validate(validData);
    expect(error).toBeUndefined();
  });

  test('should reject empty project name', () => {
    const invalidData = { projectName: '' };
    const { error } = schema.validate(invalidData);
    expect(error).toBeDefined();
    expect(error.message).toContain('Project name is required');
  });

  test('should reject project name shorter than 3 characters', () => {
    const invalidData = { projectName: 'AB' };
    const { error } = schema.validate(invalidData);
    expect(error).toBeDefined();
    expect(error.message).toContain('Project name must be at least 3 characters');
  });

  test('should reject project name longer than 50 characters', () => {
    const invalidData = { projectName: 'A'.repeat(51) };
    const { error } = schema.validate(invalidData);
    expect(error).toBeDefined();
    expect(error.message).toContain('Project name cannot exceed 50 characters');
  });

  test('should require project name field', () => {
    const invalidData = {};
    const { error } = schema.validate(invalidData);
    expect(error).toBeDefined();
    expect(error.message).toContain('required');
  });
});
