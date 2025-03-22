import BaseDataService from './baseDataService';

/**
 * Secondary data service for handling secondary datasource operations
 */
class SecondaryDataService extends BaseDataService {
  constructor() {
    super();
    // Mock data for secondary datasource
    this.mockData = {
      segments: [
        { id: 1, name: 'Segment X', priority: 'high', coverage: 85 },
        { id: 2, name: 'Segment Y', priority: 'medium', coverage: 65 },
        { id: 3, name: 'Segment Z', priority: 'low', coverage: 45 },
      ],
      metrics: [
        { id: 1, name: 'Conversion Rate', value: 2.5, target: 3.0 },
        { id: 2, name: 'Engagement Score', value: 7.8, target: 8.0 },
        { id: 3, name: 'Retention Index', value: 65, target: 70 },
      ],
      countries: [
        { value: 'us', label: 'United States', population: '331 million' },
        { value: 'ca', label: 'Canada', population: '38 million' },
        { value: 'uk', label: 'United Kingdom', population: '67 million' },
        { value: 'au', label: 'Australia', population: '25 million' }
      ],
      devices: [
        { value: 'desktop', label: 'Desktop', marketShare: '42%' },
        { value: 'mobile', label: 'Mobile', marketShare: '51%' },
        { value: 'tablet', label: 'Tablet', marketShare: '7%' }
      ]
    };
  }

  /**
   * Get all segments
   * @returns {Promise} - Promise that resolves with the segments
   */
  getAllSegments() {
    return this.httpService.get('/api/secondary/segments', this.mockData.segments);
  }

  /**
   * Get all metrics
   * @returns {Promise} - Promise that resolves with the metrics
   */
  getAllMetrics() {
    return this.httpService.get('/api/secondary/metrics', this.mockData.metrics);
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
