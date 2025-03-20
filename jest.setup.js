// Import Jest DOM extensions
import '@testing-library/jest-dom';

// Mock console.error to reduce noise in tests
const originalConsoleError = console.error;
console.error = (...args) => {
  // Filter out React-specific warnings that are expected in tests
  const suppressedWarnings = [
    'Warning: ReactDOM.render is no longer supported',
    'Warning: An update to',
    'Warning: Failed prop type',
    'Warning: Each child in a list',
    'Warning: validateDOMNesting',
  ];
  
  const isSupressedWarning = suppressedWarnings.some(warning => 
    args[0] && typeof args[0] === 'string' && args[0].includes(warning)
  );
  
  if (!isSupressedWarning) {
    originalConsoleError(...args);
  }
};

// Mock matchMedia if it doesn't exist (for jsdom environment)
if (typeof window !== 'undefined') {
  window.matchMedia = window.matchMedia || function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
    };
  };
}

// Set up any global mocks or test environment configuration here
