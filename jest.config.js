module.exports = {
  // Use SWC for transforming JavaScript and JSX
  transform: {
    '^.+\\.(js|jsx)$': ['@swc/jest', {
      jsc: {
        parser: {
          syntax: 'ecmascript',
          jsx: true
        },
        transform: {
          react: {
            runtime: 'automatic'
          }
        }
      }
    }],
  },
  // Setup files to run before each test
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // Test environment for React
  testEnvironment: 'jsdom',
  // Modules to mock
  moduleNameMapper: {
    // Mock CSS imports
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Mock image imports
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  // Collect coverage from these directories
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.d.ts',
    '!src/index.js',
    '!src/reportWebVitals.js'
  ],
  // Coverage directory
  coverageDirectory: 'coverage',
  // Test match patterns
  testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,jsx}', '<rootDir>/src/**/*.{spec,test}.{js,jsx}'],
  // Watch plugins
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  // Reset mocks between tests
  resetMocks: true
};
