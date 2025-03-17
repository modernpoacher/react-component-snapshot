import globals from 'globals'
import standard from '@sequencemedia/eslint-config-standard/configs/recommended/merge'
import typescript from '@sequencemedia/eslint-config-typescript/configs/recommended/merge'
import typescriptParser from '@typescript-eslint/parser'

export default [
  /**
   *  Standard config
   */
  standard({
    files: [
      '**/*.{js,mjs,cjs,mts,cts}'
    ],
    ignores: [
      'src'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    rules: {
      'no-use-before-define': 'off'
    }
  }),
  /**
   *  Standard config for `mjs` and `mts` files
   */
  standard({
    files: [
      'src/**/*.{js,mjs,cjs,mts,cts}'
    ],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  }),
  /**
   *  TypeScript config
   */
  typescript({
    files: [
      '**/*.{mts,cts}'
    ],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        projectService: true,
        project: 'tsconfig.json'
      },
      globals: {
        ...globals.browser,
        ReactComponentInstanceTypes: 'readonly'
      }
    }
  })
]
