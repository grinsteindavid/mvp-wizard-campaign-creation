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
   * Validate primary data source configuration
   * @param {Object} data - Configuration data
   * @returns {Promise} - Promise that resolves with validation results
   */
  validateConfiguration(data) {
    // Mock validation logic
    const errors = {};
    let isValid = true;
    
    if (!data.projectName || data.projectName.length < 3) {
      errors.projectName = 'Project name must be at least 3 characters';
      isValid = false;
    }
    
    if (!data.resourceAllocation || data.resourceAllocation < 5) {
      errors.resourceAllocation = 'Resource allocation must be at least 5';
      isValid = false;
    }
    
    if (!data.optimizationStrategy) {
      errors.optimizationStrategy = 'An optimization strategy must be selected';
      isValid = false;
    }
    
    if (!data.keyTerms) {
      errors.keyTerms = 'Key terms are required';
      isValid = false;
    }
    
    if (!data.categoryGroups || data.categoryGroups.length === 0) {
      errors.categoryGroups = 'At least one category group is required';
      isValid = false;
    } else {
      const categoryGroupErrors = data.categoryGroups.map(group => {
        const groupErrors = {};
        if (!group.name) groupErrors.name = 'Group name is required';
        if (!group.value) groupErrors.value = 'Group value is required';
        return Object.keys(groupErrors).length > 0 ? groupErrors : null;
      });
      
      if (categoryGroupErrors.some(error => error !== null)) {
        errors.categoryGroups = categoryGroupErrors;
        isValid = false;
      }
    }
    
    const mockResponse = { isValid, errors };
    return this.httpService.post('/api/primary/validate', data, mockResponse);
  }

  /**
   * Submit primary data source configuration
   * @param {Object} data - Configuration data
   * @returns {Promise} - Promise that resolves with submission result
   */
  submitConfiguration(data) {
    // Mock successful submission
    const mockResponse = {
      success: true,
      id: Math.floor(Math.random() * 10000),
      message: 'Primary data source configuration submitted successfully'
    };
    
    return this.httpService.post('/api/primary/submit', data, mockResponse);
  }
}

// Create and export a singleton instance
const primaryDataService = new PrimaryDataService();
export default primaryDataService;
