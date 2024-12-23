### Лабораторна №2: Налаштування проєкту та інструментів розробки

#### Виконані завдання:

1. **Налаштування Prettier** для автоматичного форматування коду:

   - Додано конфігураційні файли:
     - [../.prettierrc](../.prettierrc) (backend)
     - [../../lingo-frontend/.prettierrc](../../lingo-frontend/.prettierrc) (frontend)
   - Додано ігнорування певних файлів і папок у:
     - [backend/.prettierignore](https://github.com/DenisGradov/lingo-cards/blob/lab2/backend/.prettierignore) (backend)
     - [lingo-frontend/.prettierignore](https://github.com/DenisGradov/lingo-cards/blob/lab2/lingo-frontend/.prettierignore) (frontend)
   - Додано команду для запуску форматування в `package.json`:
     ```bash
     npm run format
     ```

2. **Налаштування ESLint** для статичного аналізу коду:

   - Додано конфігураційні файли:
     - [backend/eslint.config.js](https://github.com/DenisGradov/lingo-cards/blob/lab2/backend/eslint.config.js) (backend)
     - [lingo-frontend/eslint.config.js](https://github.com/DenisGradov/lingo-cards/blob/lab2/lingo-frontend/eslint.config.js) (frontend)
   - Додано команду для перевірки коду в `package.json`:
     ```bash
     npm run lint
     ```

3. **Налаштування Git-хуків за допомогою Husky**:

   - Ініціалізовано Husky:
     - [backend/.husky/pre-commit](https://github.com/DenisGradov/lingo-cards/blob/lab2/backend/.husky/pre-commit) (backend)
     - [lingo-frontend/.husky/pre-commit](https://github.com/DenisGradov/lingo-cards/blob/lab2/lingo-frontend/.husky/pre-commit) (frontend)
   - Додано хук `pre-commit`, який запускає автоматичну перевірку коду (ESLint) та форматування (Prettier) перед кожним комітом.

4. **Перевірка збірки та роботи середовища розробки**:
   - Виконано запуск серверної частини:
     ```bash
     cd backend
     npm run dev
     ```
   - Виконано запуск клієнтської частини:
     ```bash
     cd lingo-frontend
     npm run dev
     ```
