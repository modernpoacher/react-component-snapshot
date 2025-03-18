import globals from 'globals'
import standard from '@sequencemedia/eslint-config-standard/configs/recommended/merge'
import typescript from '@sequencemedia/eslint-config-typescript/configs/recommended/merge'
import babelParser from '@babel/eslint-parser'
import typescriptParser from '@typescript-eslint/parser'
import reactPlugin from 'eslint-plugin-react'

const reactParserOptions = {
  ecmaFeatures: {
    jsx: true
  }
}

const reactPlugins = {
  react: reactPlugin
}

const reactRules = {
  'no-unused-vars': [
    'error',
    {
      varsIgnorePattern: 'React'
    }
  ],
  quotes: [
    'error',
    'single'
  ],
  'jsx-quotes': [
    'error',
    'prefer-single'
  ],
  'react/jsx-indent': [
    'error',
    2,
    {
      checkAttributes: true,
      indentLogicalExpressions: true
    }
  ]
}

const reactSettings = {
  react: {
    version: 'detect'
  }
}

export default [
  /**
   *  React config for all `jsx` files
   */
  {
    ...reactPlugin.configs.flat.recommended,
    settings: {
      ...reactSettings
    }
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
      parser: babelParser,
      parserOptions: {
        ...reactParserOptions,
        project: null
      },
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      ...reactPlugins
    }, // @ts-expect-error Storybook
    rules: {
      ...reactRules
    },
    settings: {
      ...reactSettings
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
      parser: babelParser,
      parserOptions: {
        ...reactParserOptions,
        project: null
      },
      globals: {
        ...globals.browser,
        ...globals.jest
      }
    },
    plugins: {
      ...reactPlugins
    }, // @ts-expect-error Storybook
    rules: {
      ...reactRules
    },
    settings: {
      ...reactSettings
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
