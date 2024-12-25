import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import jest from 'eslint-plugin-jest';
import globals from 'globals';

export default [
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    ignores: ['**/dist/**', '**/__tests__/**', '**/*.test.js'],
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
      react,
      jest,
    },
    rules: {
      'prettier/prettier': 'error',
      ...eslintConfigPrettier.rules,
      'jest/no-done-callback': 'off',
      'require-yield': 'off',
      'no-unused-vars': ['warn', { varsIgnorePattern: '^_' }],
      'jest/no-done-callback': 'off',
      'jest/valid-expect': 'off',
      'require-yield': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
