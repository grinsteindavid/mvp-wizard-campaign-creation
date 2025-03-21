/**
 * Base HTTP service for making API requests
 * Currently only mocks responses, but can be extended to use fetch/axios for real API calls
 */
class HttpService {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
    this.mockDelay = 500; // Default delay for mock responses in milliseconds
  }

  /**
   * Set the mock delay for simulating network latency
   * @param {number} delayMs - Delay in milliseconds
   */
  setMockDelay(delayMs) {
    this.mockDelay = delayMs;
  }

  /**
   * Create a mock response with the given data and status
   * @param {any} data - Response data
   * @param {number} status - HTTP status code
   * @param {boolean} success - Whether the request was successful
   * @returns {Promise} - Promise that resolves with the mock response
   */
  createMockResponse(data, status = 200, success = true) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (success) {
          resolve({
            data,
            status,
            ok: status >= 200 && status < 300,
            headers: { 'content-type': 'application/json' },
          });
        } else {
          reject({
            data,
            status,
            ok: false,
            headers: { 'content-type': 'application/json' },
          });
        }
      }, this.mockDelay);
    });
  }

  /**
   * Create a mock error response
   * @param {string} message - Error message
   * @param {number} status - HTTP status code
   * @returns {Promise} - Promise that rejects with the mock error
   */
  createMockError(message, status = 400) {
    return this.createMockResponse({ error: message }, status, false);
  }

  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} mockData - Mock data to return (for mock mode)
   * @returns {Promise} - Promise that resolves with the response
   */
  async get(endpoint, mockData = null) {
    // In a real implementation, this would use fetch or axios
    // return fetch(`${this.baseUrl}${endpoint}`);
    
    return this.createMockResponse(mockData);
  }

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request payload
   * @param {Object} mockData - Mock data to return (for mock mode)
   * @returns {Promise} - Promise that resolves with the response
   */
  async post(endpoint, data, mockData = null) {
    // In a real implementation, this would use fetch or axios
    // return fetch(`${this.baseUrl}${endpoint}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // });
    
    return this.createMockResponse(mockData || data);
  }

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request payload
   * @param {Object} mockData - Mock data to return (for mock mode)
   * @returns {Promise} - Promise that resolves with the response
   */
  async put(endpoint, data, mockData = null) {
    // In a real implementation, this would use fetch or axios
    // return fetch(`${this.baseUrl}${endpoint}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // });
    
    return this.createMockResponse(mockData || data);
  }

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @param {Object} mockData - Mock data to return (for mock mode)
   * @returns {Promise} - Promise that resolves with the response
   */
  async delete(endpoint, mockData = null) {
    // In a real implementation, this would use fetch or axios
    // return fetch(`${this.baseUrl}${endpoint}`, {
    //   method: 'DELETE',
    // });
    
    return this.createMockResponse(mockData || { success: true });
  }
}

export default HttpService;
