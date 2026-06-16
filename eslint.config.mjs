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
import checkFile from 'eslint-plugin-check-file';

export default [js.configs.recommended, ...tseslint.configs.recommended, prettierConfig, {
  plugins: {
    react,
    'react-hooks': reactHooks,
    'jsx-a11y': jsxA11y,
    import: importPlugin,
    prettier: prettierPlugin,
    boundaries,
    'check-file': checkFile
  },
  rules: {
    'no-console': 'warn',
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
    // 'jsx-a11y/anchor-is-valid': 'warn',
    // 'jsx-a11y/click-events-have-key-events': 'warn',

    // TypeScript rules
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_' }
    ],
    '@typescript-eslint/no-explicit-any': 'warn',

    // Naming conventions
    '@typescript-eslint/naming-convention': [
      'error',
      // 기본: camelCase
      {
        selector: 'default',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      // import: camelCase 또는 PascalCase
      {
        selector: 'import',
        format: ['camelCase', 'PascalCase'],
      },
      // 변수: camelCase, UPPER_CASE(상수), PascalCase(컴포넌트)
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      // 함수: camelCase 또는 PascalCase
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      // 타입 관련: PascalCase
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      // 타입 속성: PascalCase, UPPER_CASE, camelCase (외부 API 등)
      {
        selector: 'typeProperty',
        format: ['PascalCase', 'UPPER_CASE', 'camelCase', 'snake_case'],
        leadingUnderscore: 'allow',
      },
      // 인터페이스 I 접두사 금지
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },
      // 객체 리터럴 속성 - 모든 형식 허용 (HTTP 헤더, 상수 객체 등)
      {
        selector: 'objectLiteralProperty',
        format: null,
      },
      // 객체 리터럴 메서드 - 모든 형식 허용
      {
        selector: 'objectLiteralMethod',
        format: null,
      },
    ],

    // Filename naming conventions
    'check-file/filename-naming-convention': [
      'error',
      {
        // React 컴포넌트: PascalCase
        '**/components/!(index).*': 'PASCAL_CASE',
        '**/components/*/!(index).*': 'PASCAL_CASE',
        '**/sections/*.{ts,tsx}': 'PASCAL_CASE',
        '**/sections/*/*.{ts,tsx}': 'PASCAL_CASE',
        // 그 외 파일: camelCase
        'src/shared/!(components|sections)/*.{ts,tsx}': 'CAMEL_CASE',
        'src/features/*/!(components|sections)/*.{ts,tsx}': 'CAMEL_CASE',
      },
      {
        ignoreMiddleExtensions: true,
      }
    ],
    'check-file/folder-naming-convention': [
      'error',
      {
        // src/app 디렉토리는 nextjs 특수 디렉토리가 많아서 일단 제외
        'src/!(app)/**': 'CAMEL_CASE',
      }
    ],

    // Import rules
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        pathGroups: [
          // @/ 경로 별칭 → internal 그룹 맨 앞
          {
            pattern: '@/**',
            group: 'internal',
            position: 'before',
          },
          // 로컬 컴포넌트 별칭 → internal 그룹 맨 뒤 (filepond/react 이후에 위치)
          { pattern: '@atoms',       group: 'internal', position: 'after' },
          { pattern: '@icons',       group: 'internal', position: 'after' },
          { pattern: '@aggrid',      group: 'internal', position: 'after' },
          { pattern: '@uiux/**',     group: 'internal', position: 'after' },
          { pattern: '@common/**',   group: 'internal', position: 'after' },
          { pattern: '@features/**', group: 'internal', position: 'after' },
          { pattern: '@layout/**',   group: 'internal', position: 'after' },
          { pattern: '@hooks/**',    group: 'internal', position: 'after' },
          { pattern: '@grid/**',     group: 'internal', position: 'after' },
        ],
        // 'external' 을 제외 목록에서 빼야 scoped 별칭(@atoms 등)에도 pathGroups 가 적용됨
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc' },
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
    '.prettierrc.cjs',
    'public',
    'public/**',
  ]
}, ...storybook.configs["flat/recommended"], {
  rules: {
    // Disable redundant story name warning
    'storybook/no-redundant-story-name': 'off',
  }
}];