/* eslint-disable import/first */
// Mock dependencies first - must be before imports
jest.mock('../utils/validationUtils');
jest.mock('../schemas');

// Import modules
import { validateCampaign, validateField } from './validationService';
import { formatValidationErrors, extractNestedSchema } from '../utils/validationUtils';
import { schemaCreators } from '../schemas';

describe('validationService', () => {
  // Mock schema and its methods
  const mockSchema = {
    validate: jest.fn(),
    extract: jest.fn()
  };
  
  // Setup before each test
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Setup validation utils mocks
    formatValidationErrors.mockImplementation((error) => {
      if (!error) return {};
      return { campaignName: 'Campaign name is required' };
    });
    
    extractNestedSchema.mockReturnValue(null);
    
    // Setup schema creators
    schemaCreators.google = jest.fn().mockReturnValue(mockSchema);
    schemaCreators.revcontent = jest.fn().mockReturnValue(mockSchema);
    schemaCreators.yahoo = jest.fn().mockReturnValue(mockSchema);
  });
  
  describe('validateCampaign', () => {
    test('should return isValid true when validation passes', () => {
      // Setup
      mockSchema.validate.mockReturnValue({ error: null });
      
      // Execute
      const result = validateCampaign('google', { campaignName: 'Test Campaign' });
      
      // Verify
      expect(result).toEqual({
        isValid: true,
        errors: {}
      });
    });
    
    test('should return isValid false with errors when validation fails', () => {
      // Setup
      const mockError = { details: [{ path: ['campaignName'], message: 'Campaign name is required' }] };
      mockSchema.validate.mockReturnValue({ error: mockError });
      
      // Execute
      const result = validateCampaign('google', {});
      
      // Verify
      expect(result).toEqual({
        isValid: false,
        errors: { campaignName: 'Campaign name is required' }
      });
    });
    
    test('should return isValid false when traffic source is invalid', () => {
      // Execute
      const result = validateCampaign('invalid', {});
      
      // Verify
      expect(result).toEqual({
        isValid: false,
        errors: { general: 'Invalid traffic source' }
      });
    });
  });
  
  describe('validateField', () => {
    test('should return isValid true when field validation passes', () => {
      // Setup
      const mockFieldSchema = { validate: jest.fn().mockReturnValue({ error: null }) };
      mockSchema.extract.mockReturnValue(mockFieldSchema);
      
      // Execute
      const result = validateField('google', 'campaignName', 'Test Campaign');
      
      // Verify
      expect(result).toEqual({
        isValid: true,
        error: null
      });
    });
    
    test('should return isValid false with error when field validation fails', () => {
      // Setup
      const mockFieldSchema = { 
        validate: jest.fn().mockReturnValue({ 
          error: { message: 'Campaign name is required' } 
        }) 
      };
      mockSchema.extract.mockReturnValue(mockFieldSchema);
      
      // Execute
      const result = validateField('google', 'campaignName', '');
      
      // Verify
      expect(result).toEqual({
        isValid: false,
        error: 'Campaign name is required'
      });
    });
    
    test('should return isValid false when traffic source is invalid', () => {
      // Execute
      const result = validateField('invalid', 'campaignName', 'Test Campaign');
      
      // Verify
      expect(result).toEqual({
        isValid: false,
        error: 'Invalid traffic source'
      });
    });
  });
});
