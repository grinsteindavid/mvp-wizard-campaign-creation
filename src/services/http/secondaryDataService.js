import BaseDataService from './baseDataService';

/**
 * Secondary data service for handling secondary datasource operations
 */
class SecondaryDataService extends BaseDataService {
  constructor() {
    super();
    // Mock data for secondary datasource that matches secondarySchema structure
    this.mockData = {
      countries: [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'au', label: 'Australia' },
        { value: 'de', label: 'Germany' },
        { value: 'fr', label: 'France' }
      ],
      devices: [
        { value: 'desktop', label: 'Desktop' },
        { value: 'mobile', label: 'Mobile' },
        { value: 'tablet', label: 'Tablet' }
      ]
    };
  }


  /**
   * Get all countries for targeting
   * @returns {Promise} - Promise that resolves with the countries
   */
  getCountries() {
    return this.httpService.get('/api/secondary/countries', this.mockData.countries);
  }

  /**
   * Get all devices for targeting
   * @returns {Promise} - Promise that resolves with the devices
   */
  getDevices() {
    return this.httpService.get('/api/secondary/devices', this.mockData.devices);
  }
}

// Create and export a singleton instance
const secondaryDataService = new SecondaryDataService();
export default secondaryDataService;
