// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import boundaries from 'eslint-plugin-boundaries';

export default [js.configs.recommended, ...tseslint.configs.recommended, prettierConfig, {
  plugins: {
    react,
    'react-hooks': reactHooks,
    'jsx-a11y': jsxA11y,
    import: importPlugin,
    prettier: prettierPlugin,
    boundaries
  },
  rules: {
    // Prettier rules
    'prettier/prettier': 'error',

    // React rules
    ...react.configs.recommended.rules,
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',

    // React Hooks rules
    ...reactHooks.configs.recommended.rules,
    // Allow ref as a prop for React 19
    'react-hooks/refs': 'off',
    // Relax exhaustive-deps for complex useCallback patterns
    'react-hooks/exhaustive-deps': 'warn',
    // Allow callbacks to reference later-declared functions when safe
    'react-hooks/immutability': 'off',

    // Accessibility rules
    'jsx-a11y/anchor-is-valid': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',

    // TypeScript rules
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_' }
    ],
    '@typescript-eslint/no-explicit-any': 'warn',

    // Import rules
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        alphabetize: { order: 'asc' }
      }
    ],
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        rules: [
          {
            from: 'shared',
            allow: ['shared'],
            message: 'Shared는 Shared와 Features를 import할 수 있습니다.',
          },
          {
            from: 'features',
            allow: ['shared'],
            message: 'Feature는 다른 Feature를 import할 수 없습니다. Shared Layer를 사용하세요.',
          },
        ],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      typescript: {}
    },
    'boundaries/elements': [
      {
        type: 'features',
        pattern: 'src/features/**/*',
        mode: 'folder',
      },
      {
        type: 'shared',
        pattern: 'src/shared/**/*',
        mode: 'folder',
      },
    ],
  }
}, {
  ignores: [
    'dist',
    'dist/**',
    'node_modules',
    'node_modules/**',
    '*.config.js',
    '*.config.cjs',
    '*.config.mjs',
    '.storybook',
    '.storybook/**',
    'storybook-static',
    'storybook-static/**',
    'coverage',
    '.prettierrc.cjs'
  ]
}, ...storybook.configs["flat/recommended"], {
  rules: {
    // Disable redundant story name warning
    'storybook/no-redundant-story-name': 'off',
  }
}];
