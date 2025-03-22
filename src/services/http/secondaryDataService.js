import BaseDataService from './baseDataService';

/**
 * Secondary data service for handling secondary datasource operations
 */
class SecondaryDataService extends BaseDataService {
  constructor() {
    super();
    // Mock data for secondary datasource
    this.mockData = {
      countries: [
        { value: 'us', label: 'United States', population: '331 million' },
        { value: 'ca', label: 'Canada', population: '38 million' },
        { value: 'uk', label: 'United Kingdom', population: '67 million' },
        { value: 'au', label: 'Australia', population: '25 million' }
      ],
    };
  }

  /**
   * Get all countries for targeting
   * @returns {Promise} - Promise that resolves with the countries
   */
  getCountries() {
    return this.httpService.get('/api/secondary/countries', this.mockData.countries);
  }
}

// Create and export a singleton instance
const secondaryDataService = new SecondaryDataService();
export default secondaryDataService;
