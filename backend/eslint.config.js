import eslintPluginPrettier from 'eslint-plugin-prettier';
import jest from 'eslint-plugin-jest';
import globals from 'globals';

export default [
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    ignores: [
      '**/dist/**',
      '**/__tests__/**',
      '**/*.test.js',
      '**/node_modules/**',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
      jest,
    },
    rules: {
      'prettier/prettier': 'warn',

      'jest/no-done-callback': 'off',
      'jest/valid-expect': 'off',
      'require-yield': 'off',
      'no-unused-vars': ['warn', { varsIgnorePattern: '^_' }],
      'no-console': 'off',

      'no-empty': 'off',
      'no-extra-semi': 'off',
      'no-undef': 'off',
      'no-useless-escape': 'off',
      'spaced-comment': 'off',
      semi: 'off',

      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
