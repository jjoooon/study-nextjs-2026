const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFiles: ['<rootDir>/tests/polyfills.ts'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^msw/node$': '<rootDir>/node_modules/msw/lib/node/index.js',
    '^msw/native$': '<rootDir>/node_modules/msw/lib/native/index.js',
    '^@mswjs/interceptors/(.*)$': '<rootDir>/node_modules/@mswjs/interceptors/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(msw|@mswjs|@bundled-es-modules|@redocly|openapi-types|until-async|strict-event-emitter|@openapi|@redocly)/)',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
