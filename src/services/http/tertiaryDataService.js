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
      ],
      projectObjectives: [
        { value: 'visits', label: 'Website Visits', description: 'Drive traffic to website' },
        { value: 'awareness', label: 'Brand Awareness', description: 'Increase brand recognition' },
        { value: 'conversions', label: 'Conversions', description: 'Generate leads or sales' }
      ],
      resourceTypes: [
        { value: 'daily', label: 'Daily', description: 'Budget spent evenly each day' },
        { value: 'lifetime', label: 'Lifetime', description: 'Budget spent over entire campaign duration' }
      ],
      optimizationStrategies: [
        { value: 'manual', label: 'Manual', description: 'Manually set bid amounts' },
        { value: 'auto', label: 'Automatic', description: 'System optimizes bids automatically' }
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
   * Get all project objectives
   * @returns {Promise} - Promise that resolves with the project objectives
   */
  getProjectObjectives() {
    return this.httpService.get('/api/tertiary/project-objectives', this.mockData.projectObjectives);
  }

  /**
   * Get all resource types
   * @returns {Promise} - Promise that resolves with the resource types
   */
  getResourceTypes() {
    return this.httpService.get('/api/tertiary/resource-types', this.mockData.resourceTypes);
  }

  /**
   * Get all optimization strategies
   * @returns {Promise} - Promise that resolves with the optimization strategies
   */
  getOptimizationStrategies() {
    return this.httpService.get('/api/tertiary/optimization-strategies', this.mockData.optimizationStrategies);
  }
}

// Create and export a singleton instance
const tertiaryDataService = new TertiaryDataService();
export default tertiaryDataService;
