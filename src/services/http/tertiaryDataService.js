import BaseDataService from './baseDataService';

/**
 * Tertiary data service for handling tertiary datasource operations
 */
class TertiaryDataService extends BaseDataService {
  constructor() {
    super();
    // Mock data for tertiary datasource
    this.mockData = {
      channels: [
        { id: 1, name: 'Channel A', type: 'social', efficiency: 0.75 },
        { id: 2, name: 'Channel B', type: 'display', efficiency: 0.82 },
        { id: 3, name: 'Channel C', type: 'search', efficiency: 0.91 },
      ],
      audiences: [
        { id: 1, name: 'Audience 1', size: 250000, cpm: 3.5 },
        { id: 2, name: 'Audience 2', size: 500000, cpm: 2.8 },
        { id: 3, name: 'Audience 3', size: 750000, cpm: 2.1 },
      ]
    };
  }

  /**
   * Get all channels
   * @returns {Promise} - Promise that resolves with the channels
   */
  getAllChannels() {
    return this.httpService.get('/api/tertiary/channels', this.mockData.channels);
  }

  /**
   * Get all audiences
   * @returns {Promise} - Promise that resolves with the audiences
   */
  getAllAudiences() {
    return this.httpService.get('/api/tertiary/audiences', this.mockData.audiences);
  }

  /**
   * Validate tertiary data source configuration
   * @param {Object} data - Configuration data
   * @returns {Promise} - Promise that resolves with validation results
   */
  validateConfiguration(data) {
    // Mock validation logic
    const errors = {};
    let isValid = true;
    
    // Implement tertiary-specific validation here
    // This would be replaced with actual validation logic
    
    const mockResponse = { isValid, errors };
    return this.httpService.post('/api/tertiary/validate', data, mockResponse);
  }

  /**
   * Submit tertiary data source configuration
   * @param {Object} data - Configuration data
   * @returns {Promise} - Promise that resolves with submission result
   */
  submitConfiguration(data) {
    // Mock successful submission
    const mockResponse = {
      success: true,
      id: Math.floor(Math.random() * 10000),
      message: 'Tertiary data source configuration submitted successfully'
    };
    
    return this.httpService.post('/api/tertiary/submit', data, mockResponse);
  }
}

// Create and export a singleton instance
const tertiaryDataService = new TertiaryDataService();
export default tertiaryDataService;
