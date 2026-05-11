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
import reactCompiler from "eslint-plugin-react-compiler"

export default [js.configs.recommended, ...tseslint.configs.recommended, reactCompiler.configs.recommended, prettierConfig, {
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
    'react-hooks/exhaustive-deps': 'warn',
    // v7에서 추가된 React Compiler 규칙들 - 현재 코드베이스에서 비활성화
    'react-hooks/refs': 'off',
    'react-hooks/immutability': 'off',
    'react-hooks/static-components': 'error',
    'react-hooks/set-state-in-effect': 'off',
    // 'react-hooks/use-memo': 'off',
    // 'react-hooks/preserve-manual-memoization': 'off',
    // 'react-hooks/error-boundaries': 'off',
    // 'react-hooks/purity': 'off',
    // 'react-hooks/set-state-in-render': 'off',
    // 'react-hooks/globals': 'off',
    // 'react-hooks/config': 'off',
    // 'react-hooks/gating': 'off',

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
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        alphabetize: { order: 'asc' }
      }
    ],
    'boundaries/dependencies': [
      'error',
      {
        default: 'disallow',
        rules: [
          {
            from: { type: 'shared' },
            allow: { to: { type: 'shared' } },
          },
          {
            from: { type: 'features' },
            allow: {
              to: [
                { type: 'shared' },
                // features/shared 폴더는 feature 간 공유 허용
                { type: 'features', captured: { featureName: 'shared' } },
              ],
            },
          },
        ],
      },
    ],
    'no-restricted-syntax': [
      "error",
      {
        "selector": "CallExpression[callee.name='useEffect'][arguments.1.type='ArrayExpression'][arguments.1.elements.length=0]",
        "message": "useEffect의 의존성 배열을 비우지 마세요. 초기 마운트 시에만 실행되는 로직은 커스텀 훅(useMounted)을 사용하세요."
      }
    ]
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    },
    'boundaries/elements': [
      {
        // src/features/* 의 각 폴더가 하나의 element, featureName으로 캡처
        type: 'features',
        pattern: 'src/features/*',
        capture: ['featureName'],
        mode: 'folder',
      },
      {
        type: 'shared',
        pattern: 'src/shared/*',
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
    // Storybook stories 파일 예외 처리
    '**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '**/*.stories.ts',
    '**/*.stories.tsx',
    '**/*.stories.js',
    '**/*.stories.jsx',
    '**/*.stories.mdx',
  ]
}, ...storybook.configs["flat/recommended"], {
  rules: {
    // Disable redundant story name warning
    'storybook/no-redundant-story-name': 'off',
  }
}];
