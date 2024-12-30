import eslintPluginPrettier from 'eslint-plugin-prettier';
import jest from 'eslint-plugin-jest';
import globals from 'globals';

export default [
  {
    ignores: ['*'],
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
      'prettier/prettier': 'off',
      'no-unused-vars': 'off',
      'require-yield': 'off',
      'jest/no-done-callback': 'off',
      'jest/valid-expect': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
