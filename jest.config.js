const {
  TEST_AUTHORIZATION_TOKEN,
  TEST_MONGODB_URL,
} = require('./tests/constants');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    'test/(.*)': '<rootDir>/test/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  reporters: ['default', 'jest-junit'],
};

process.env = Object.assign(process.env, {
  MONGODB_URL: TEST_MONGODB_URL,
  AUTHORIZATION_TOKEN: TEST_AUTHORIZATION_TOKEN,
});
