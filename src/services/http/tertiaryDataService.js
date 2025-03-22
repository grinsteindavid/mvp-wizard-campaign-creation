import BaseDataService from './baseDataService';

/**
 * Tertiary data service for handling tertiary datasource operations
 */
class TertiaryDataService extends BaseDataService {
  constructor() {
    super();
    // Mock data for tertiary datasource
    this.mockData = {
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
