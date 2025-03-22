import BaseDataService from './baseDataService';

/**
 * Primary data service for handling primary datasource operations
 */
class PrimaryDataService extends BaseDataService {
  constructor() {
    super();
    // Mock data for primary datasource
    this.mockData = {
      projects: [
        { id: 1, name: 'Project Alpha', resourceAllocation: 100, optimizationStrategy: 'cpc' },
        { id: 2, name: 'Project Beta', resourceAllocation: 200, optimizationStrategy: 'cpm' },
        { id: 3, name: 'Project Gamma', resourceAllocation: 150, optimizationStrategy: 'cpv' },
      ],
      categoryGroups: [
        { id: 1, name: 'Group A', value: 500 },
        { id: 2, name: 'Group B', value: 750 },
        { id: 3, name: 'Group C', value: 1000 },
      ],
      optimizationStrategies: [
        { value: 'cpc', label: 'Performance Based', description: 'Optimize for cost per click' },
        { value: 'cpm', label: 'Impression Based', description: 'Optimize for cost per thousand impressions' },
        { value: 'cpv', label: 'Engagement Based', description: 'Optimize for cost per view' }
      ]
    };
  }

  /**
   * Get all projects
   * @returns {Promise} - Promise that resolves with the projects
   */
  getAllProjects() {
    return this.httpService.get('/api/primary/projects', this.mockData.projects);
  }

  /**
   * Get all category groups
   * @returns {Promise} - Promise that resolves with the category groups
   */
  getAllCategoryGroups() {
    return this.httpService.get('/api/primary/category-groups', this.mockData.categoryGroups);
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
