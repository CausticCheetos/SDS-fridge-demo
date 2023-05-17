module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|scss)$": "jest-css-modules"
  }
};
