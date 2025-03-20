import { formatValidationErrors, extractNestedSchema } from './validationUtils';

describe('validationUtils', () => {
  describe('formatValidationErrors', () => {
    test('should return empty object when error is null', () => {
      expect(formatValidationErrors(null)).toEqual({});
    });
    
    test('should format Joi error details into object with paths as keys', () => {
      const mockError = {
        details: [
          { path: ['campaignName'], message: 'Campaign name is required' },
          { path: ['dailyBudget'], message: 'Daily budget must be at least $5' },
          { path: ['adGroups', 0, 'name'], message: 'Ad group name is required' }
        ]
      };
      
      const result = formatValidationErrors(mockError);
      
      expect(result).toEqual({
        'campaignName': 'Campaign name is required',
        'dailyBudget': 'Daily budget must be at least $5',
        'adGroups.0.name': 'Ad group name is required'
      });
    });
    
    test('should handle empty details array', () => {
      const mockError = { details: [] };
      expect(formatValidationErrors(mockError)).toEqual({});
    });
  });
  
  describe('extractNestedSchema', () => {
    test('should return null when schema or fieldPath is null', () => {
      expect(extractNestedSchema(null, 'field')).toBeNull();
      expect(extractNestedSchema({}, null)).toBeNull();
    });
    
    test('should extract top-level field schema', () => {
      const mockFieldSchema = { type: 'string' };
      const mockSchema = {
        extract: jest.fn().mockReturnValue(mockFieldSchema)
      };
      
      const result = extractNestedSchema(mockSchema, 'campaignName');
      
      expect(result).toBe(mockFieldSchema);
      expect(mockSchema.extract).toHaveBeenCalledWith('campaignName');
    });
    
    test('should extract nested field schema', () => {
      const mockNestedSchema = { type: 'string' };
      const mockAdGroupSchema = {
        extract: jest.fn().mockReturnValue(mockNestedSchema)
      };
      const mockAdGroupsSchema = {
        extract: jest.fn().mockReturnValue(mockAdGroupSchema)
      };
      const mockSchema = {
        extract: jest.fn().mockReturnValue(mockAdGroupsSchema)
      };
      
      const result = extractNestedSchema(mockSchema, 'adGroups.0.name');
      
      expect(result).toBe(mockNestedSchema);
      expect(mockSchema.extract).toHaveBeenCalledWith('adGroups');
      expect(mockAdGroupsSchema.extract).toHaveBeenCalledWith('0');
      expect(mockAdGroupSchema.extract).toHaveBeenCalledWith('name');
    });
    
    test('should return null when a part of the path cannot be extracted', () => {
      const mockSchema = {
        extract: jest.fn().mockReturnValue(null)
      };
      
      const result = extractNestedSchema(mockSchema, 'adGroups.0.name');
      
      expect(result).toBeNull();
    });
  });
});
