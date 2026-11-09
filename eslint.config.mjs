/**
 * @typedef {import('eslint').Linter.RulesRecord} RulesRecord
 */

import globals from 'globals'
import standard from '@sequencemedia/eslint-config-standard/configs/recommended/merge'
import typescript from '@sequencemedia/eslint-config-typescript/configs/recommended/merge'
import typescriptParser from '@typescript-eslint/parser'
import reactPlugin from '@eslint-react/eslint-plugin'

const reactParserOptions = {
  ecmaFeatures: {
    jsx: true
  }
}

/**
 * @type {RulesRecord}
 */
const reactRules = {
  'no-unused-vars': [
    'error',
    {
      varsIgnorePattern: 'React'
    }
  ],
  '@stylistic/quotes': [
    'error',
    'single'
  ],
  '@stylistic/jsx-quotes': [
    'error',
    'prefer-single'
  ],
  '@stylistic/indent': [
    'error',
    2,
    {
      SwitchCase: 1,
      ignoredNodes: [
        'TemplateLiteral *'
      ],
      offsetTernaryExpressions: true
    }
  ]
}

export default [
  /**
   *  React config for all `jsx` files
   */
  {
    ...reactPlugin.configs.recommended,
    files: [
      '**/*.jsx'
    ]
  },
  /**
   *  Standard config
   */
  standard({
    files: [
      '**/*.{mjs,cjs,mts,cts}'
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
      'src/**/*.{mjs,cjs,mts,cts}'
    ],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  }),
  /**
   *  Standard config for `jsx` files
   */
  standard({
    files: [
      'src/**/*.jsx'
    ],
    ignores: [
      'src/**/__tests__/**/*.jsx'
    ],
    languageOptions: {
      parserOptions: {
        ...reactParserOptions
      },
      globals: {
        ...globals.browser
      }
    },
    rules: {
      ...reactRules
    }
  }),
  /**
   *  Standard config for `jsx` files
   */
  standard({
    files: [
      'src/**/__tests__/**/*.jsx'
    ],
    languageOptions: {
      parserOptions: {
        ...reactParserOptions
      },
      globals: {
        ...globals.browser,
        ...globals.jest
      }
    },
    rules: {
      ...reactRules
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
        projectService: true
      },
      globals: {
        ...globals.browser,
        ReactComponentSnapshotTypes: 'readonly'
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  })
]
