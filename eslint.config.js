import js from '@eslint/js';
import react from 'eslint-plugin-react';
import globals from 'globals';

export default [
  js.configs.recommended,

  {
    files: ['**/*.{js,jsx}'],
    plugins: { react },

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser
      },
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },

    settings: {
      react: { version: 'detect' }
    },

    rules: {
      // Your formatting requirements
      quotes: ['error', 'single', { avoidEscape: true }],
      'jsx-quotes': ['error', 'prefer-double'],
      'object-curly-spacing': ['error', 'always'],

      // Fix the false positives for JSX component usage
      'no-unused-vars': 'off',
      'react/jsx-uses-vars': 'error',

      // Keep debugger forbidden (your lint output shows you have debugger statements)
      'no-debugger': 'error'
    }
  }
];
