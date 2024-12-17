import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.js'], // Применяется ко всем JS-файлам
    languageOptions: {
      ecmaVersion: 'latest', // Используем последнюю версию ECMAScript
      sourceType: 'module', // Указываем модульный тип
      globals: {
        ...globals.node, // Включаем глобальные переменные Node.js
      },
    },
    rules: {
      'no-unused-vars': ['warn', { args: 'none', varsIgnorePattern: '^_' }],
      'no-undef': 'error', // Ошибка при использовании необъявленных переменных
    },
  },
  pluginJs.configs.recommended, // Подключаем рекомендованные правила ESLint
];
