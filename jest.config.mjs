export default {
  bail: 1,
  verbose: true,
  rootDir: '.',
  roots: [
    './src'
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|mjs?)$',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules\\/(?!react-component-name)\\/'
  ],
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx']
}
