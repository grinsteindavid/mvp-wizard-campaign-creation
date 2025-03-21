import { useState, useCallback } from 'react';

/**
 * Hook for making API requests with loading and error states
 * @param {Object} service - Instance of an HTTP service
 * @returns {Object} - API request utilities
 */
const useApiRequest = (service) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Executes an API request with loading and error handling
   * @param {Function} requestFn - Function that returns a promise (e.g., service.get)
   * @param {Array} requestArgs - Arguments to pass to the request function
   * @returns {Promise} - Promise that resolves with the response data
   */
  const execute = useCallback(async (requestFn, ...requestArgs) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await requestFn(...requestArgs);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      const errorMessage = err.data?.error || 'An unexpected error occurred';
      setError(errorMessage);
      throw err;
    }
  }, []);

  /**
   * Reset error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    execute,
    clearError
  };
};

export default useApiRequest;
