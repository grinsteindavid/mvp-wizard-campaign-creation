import HttpService from './httpService';

/**
 * Base data service that all specific data services can extend
 */
class BaseDataService {
  constructor() {
    this.httpService = new HttpService();
  }

  /**
   * Get all items
   * @param {Object} mockData - Optional mock data to return
   * @returns {Promise} - Promise that resolves with the response
   */
  getAll(mockData = null) {
    return this.httpService.get('/api/items', mockData);
  }

  /**
   * Get item by ID
   * @param {string|number} id - Item ID
   * @param {Object} mockData - Optional mock data to return
   * @returns {Promise} - Promise that resolves with the response
   */
  getById(id, mockData = null) {
    return this.httpService.get(`/api/items/${id}`, mockData);
  }

  /**
   * Create a new item
   * @param {Object} data - Item data
   * @param {Object} mockData - Optional mock data to return
   * @returns {Promise} - Promise that resolves with the response
   */
  create(data, mockData = null) {
    return this.httpService.post('/api/items', data, mockData);
  }

  /**
   * Update an existing item
   * @param {string|number} id - Item ID
   * @param {Object} data - Updated item data
   * @param {Object} mockData - Optional mock data to return
   * @returns {Promise} - Promise that resolves with the response
   */
  update(id, data, mockData = null) {
    return this.httpService.put(`/api/items/${id}`, data, mockData);
  }

  /**
   * Delete an item
   * @param {string|number} id - Item ID
   * @param {Object} mockData - Optional mock data to return
   * @returns {Promise} - Promise that resolves with the response
   */
  delete(id, mockData = null) {
    return this.httpService.delete(`/api/items/${id}`, mockData);
  }
}

export default BaseDataService;
