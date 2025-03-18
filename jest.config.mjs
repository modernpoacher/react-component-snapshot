export default {
  bail: 1,
  verbose: true,
  rootDir: '.',
  roots: [
    './src'
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(mjs?|jsx?)$',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx']
}
