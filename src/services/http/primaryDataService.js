import BaseDataService from './baseDataService';

/**
 * Primary data service for handling primary datasource operations
 */
class PrimaryDataService extends BaseDataService {
  constructor() {
    super();
    // Mock data for primary datasource
    this.mockData = {
      optimizationStrategies: [
        { value: 'cpc', label: 'Performance Based', description: 'Optimize for cost per click' },
        { value: 'cpm', label: 'Impression Based', description: 'Optimize for cost per thousand impressions' },
        { value: 'cpv', label: 'Engagement Based', description: 'Optimize for cost per view' }
      ]
    };
  }

  /**
   * Get all optimization strategies
   * @returns {Promise} - Promise that resolves with the optimization strategies
   */
  getOptimizationStrategies() {
    return this.httpService.get('/api/primary/optimization-strategies', this.mockData.optimizationStrategies);
  }
}

// Create and export a singleton instance
const primaryDataService = new PrimaryDataService();
export default primaryDataService;
