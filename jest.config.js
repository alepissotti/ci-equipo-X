module.exports = {
    testEnvironment: 'node',
    coveragePathIgnorePatterns: ['/node_modules/'],
    testMatch: ['**/__tests__/**/*.test.js'],
    verbose: true,
    setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.js']
};
