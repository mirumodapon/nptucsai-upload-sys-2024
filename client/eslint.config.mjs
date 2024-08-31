import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import pluginJsonc from 'eslint-plugin-jsonc';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx,mjs}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    ...stylistic.configs.customize({
      indent: 2,
      quotes: 'single',
      semi: true,
      commaDangle: 'never'
    })
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { stylistic, reactHooks, reactRefresh },
    rules: {
      'stylistic/array-bracket-newline': ['error', 'consistent'],
      'stylistic/object-curly-newline': ['error', { multiline: true, consistent: true }],
      'stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
      'stylistic/semi-style': ['error', 'last'],
      'stylistic/space-before-function-paren': ['error', { anonymous: 'always', asyncArrow: 'always', named: 'never' }],
      'stylistic/jsx-one-expression-per-line': ['error', { allow: 'literal' }]
    }
  },
  ...pluginJsonc.configs['flat/base'],
  {
    files: ['**/*.json'],
    rules: {
      'jsonc/indent': ['error', 2],
      'jsonc/key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'strict' }],
      'jsonc/no-dupe-keys': ['error'],
      'jsonc/no-floating-decimal': ['error'],
      'jsonc/no-multi-str': ['error'],
      'jsonc/no-sparse-arrays': ['error'],
      'jsonc/comma-style': ['error', 'last'],
      'jsonc/comma-dangle': ['error'],
      'jsonc/array-bracket-newline': ['error', { multiline: true, minItems: null }],
      'jsonc/array-bracket-spacing': ['error', 'never'],
      'jsonc/object-curly-spacing': ['error', 'always']
    }
  }
);
