module.exports = {
  verbose: true,
  preset: 'react-native',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/test/**/*.(test|spec).(ts|tsx|js)'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!((jest-)?react-native|@react-native(-community)?)/)',
  ],
};
