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

export default [js.configs.recommended, ...tseslint.configs.recommended, prettierConfig, {
  plugins: {
    react,
    'react-hooks': reactHooks,
    'jsx-a11y': jsxA11y,
    import: importPlugin,
    prettier: prettierPlugin
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
    // 'import/no-restricted-paths': [
    //   'error',
    //   {
    //     zones: [
    //       {
    //         target: './src/features/**/*.{ts,tsx}',
    //         from: './src/features/**/components/**',
    //         except: ['./src/shared/**'],
    //         message: 'Feature는 다른 Feature의 Component를 직접 import할 수 없습니다. Shared Layer를 사용하세요.',
    //       },
    //       // Shared Layer가 Feature Layer import하는 것을 허용
    //       // 단, Shared UI 컴포넌트가 Redux 상태(selector, slice)에 접근하는 것은 허용
    //       // {
    //       //   target: './src/shared/**/*.{ts,tsx}',
    //       //   from: './src/features/**',
    //       //   message: 'Shared Layer는 Feature를 import할 수 없습니다.',
    //       // },
    //     ],
    //   },
    // ],
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      typescript: {}
    }
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
