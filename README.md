# Lingo - a website for learning foreign languages ​​using flashcards

### Website layout - https://www.figma.com/design/UQWkvgWLuCy3Wzu2MSgnmO/lingo?node-id=2-15&t=2fMlDC7a1MtTvanE-1

MVP functionality of the website:
- User registration/authorization
- Creating playlists with cards
- Interactive knowledge testing (well remembered - the card will not be shown twice as long, poorly - twice as often)
- Storing cards in playlists: creating groups of words for convenient study/repetition of specific words at the right time for the user

### Technology stack:
- React + vite + scss+ tailwindcss
- Node.js + express
- Git + docker

# Project launch:
## 1. Clone the repository<br>
```
git clone https://github.com/DenisGradov/lingo-cards 
cd lingo-project 
``` 
## 2. Creating an .env file in the project root: 
```
BACKEND_PORT=5000
FRONTEND_PORT=3000
ALLOWED_ORIGINS=http://localhost:3000,http://
BACKEND_PORT=5000
FRONTEND_PORT=3000ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
VITE_BACKEND_URL=http://localhost:5000
```
## 3. Running the project<Br> 
Manually: 
``` 
cd backend 
npm install
npm run dev 
``` 
``` 
cd lingo-frontend
npm install
npm run dev
```
Or via docker-compose:
``` 
docker-compose up -d --build 
```
### Лабораторна №2: Налаштування проєкту та інструментів розробки

#### Виконані завдання:
1. **Налаштування Prettier** для автоматичного форматування коду:
   - Додано конфігураційні файли: 
     - [backend/.prettierrc](./backend/.prettierrc)
     - [lingo-frontend/.prettierrc](./lingo-frontend/.prettierrc)
   - Додано ігнорування певних файлів і папок у:
     - [backend/.prettierignore](./backend/.prettierignore)
     - [lingo-frontend/.prettierignore](./lingo-frontend/.prettierignore)
   - Додано команду для запуску форматування в `package.json`:
     ```bash
     npm run format
     ```

2. **Налаштування ESLint** для статичного аналізу коду:
   - Додано конфігураційні файли:
     - [backend/eslint.config.js](./backend/eslint.config.js)
     - [lingo-frontend/eslint.config.js](./lingo-frontend/eslint.config.js)
   - Додано команду для перевірки коду в `package.json`:
     ```bash
     npm run lint
     ```

3. **Налаштування Git-хуків за допомогою Husky**:
   - Ініціалізовано Husky:
     - [backend/.husky/pre-commit](./backend/.husky/pre-commit)
     - [lingo-frontend/.husky/pre-commit](./lingo-frontend/.husky/pre-commit)
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