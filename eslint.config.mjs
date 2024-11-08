import globals from 'globals';
import pluginJs from '@eslint/js';
import dicodingConfig from 'eslint-config-dicodingacademy';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    ...dicodingConfig,
  },
  pluginJs.configs.recommended,
];
