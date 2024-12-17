/** @type {import('@stryker-mutator/api/core').StrykerOptions} */
export default {
  testRunner: 'jest',
  jest: {
    configFile: 'jest.config.js',
    enableFindRelatedTests: false,
  },
  reporters: ['clear-text', 'progress', 'html'],
  coverageAnalysis: 'off',
  mutate: [
    'db/**/*.js'
  ],
  timeoutMS: 5000,
};
