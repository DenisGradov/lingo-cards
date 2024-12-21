# Лабораторна робота №7: Розгортання програмного забезпечення

## Зміст
1. [Налаштування CI](#1-налаштування-ci)
2. [Налаштування CD](#2-налаштування-cd)
3. [Доступність сервісу](#3-доступність-сервісу)
4. [Висновок](#4-висновок)
5. [Подальші кроки](#5-подальші-кроки)

---

## 1. Налаштування CI

**Ціль:** Забезпечення автоматичної перевірки якості коду та дотримання стилю як на локальному рівні, так і при створенні Pull Request'ів або комітів до гілки `lab7`.

---

### **Інструменти:**
- **Prettier**: Автоматичне форматування коду.
- **ESLint**: Перевірка коду на статичні помилки.
- **CommitLint**: Перевірка повідомлень комітів на відповідність стандарту Conventional Commits.
- **Husky**: Використовується для виконання локальних Git-хуків (pre-commit та commit-msg).
- **GitHub Actions**: Виконує перевірки на рівні CI (сборка, лінтинг, тестування).

---

### **Локальні перевірки за допомогою Husky**

Husky використовується для автоматичного запуску перевірок при створенні комітів.

#### **Налаштування Husky:**
1. Husky інтегрується через скрипт `prepare`, зазначений у `package.json`:
   ```json
   "prepare": "husky install"
   ```
2. Хуки налаштовані через файли:
   - **`pre-commit`:** Виконує перевірку ESLint та Prettier.
   - **`commit-msg`:** Перевіряє стиль комітів за допомогою CommitLint.

#### **Зміст файлів:**
- **pre-commit**: [Файл pre-commit](../../../.husky/pre-commit)
  ```bash
  npm run lint
  npm run format
  ```
- **commit-msg**: [Файл commit-msg](../../../.husky/commit-msg)
  ```bash
  npx --no-install commitlint --edit "$1"
  ```

#### **Конфігурації:**
- **CommitLint:** Використовує конфігурацію Conventional Commits:
  ```json
  {
    "extends": ["@commitlint/config-conventional"]
  }
  ```
- **ESLint і Prettier:** Конфігурації розташовані у файлах:
  - ESLint: [eslint.config.js](../../../eslint.config.js)
  - Prettier: [`.prettierrc`](../../../.prettierrc)

#### **Результат:**
- **Коміт блокується**, якщо не виконані вимоги щодо коду чи стилю комітів.
- Всі файли форматуються та перевіряються перед додаванням у репозиторій.

---

### **Серверні перевірки через GitHub Actions**

GitHub Actions забезпечує автоматизацію перевірок на рівні сервера.

#### **CI Конфігурація (файл [ci.yml](../../../.github/workflows/ci.yml))**:
- Виконується на кожен **Pull Request** і **Push** у гілку `lab7`.
- Основні етапи:
  1. **Checkout коду.**
  2. **Установка залежностей.**
  3. **Перевірка коду ESLint та Prettier.**
  4. **Сборка проекту.**
  5. **Виконання тестів.**

#### **Результат:**
- CI гарантує, що Pull Request не може бути злитий без проходження перевірок.

---

### **Файли та конфігурації**
1. **Husky:** [`.husky/pre-commit`](../../../.husky/pre-commit), [`.husky/commit-msg`](../../../.husky/commit-msg)
2. **GitHub Actions:** [`.github/workflows/ci.yml`](../../../.github/workflows/ci.yml)
3. **Скрипти package.json:**
   ```json
   {
     "scripts": {
       "lint": "eslint .",
       "format": "prettier --write .",
       "prepare": "husky install"
     }
   }
   ```

--- 

### **Результат**
- Локальні перевірки Husky гарантують якість перед комітами.
- CI через GitHub Actions забезпечує додатковий рівень контролю під час розробки та злиття.

--- 

## 2. Налаштування CD

**Ціль:** Автоматизувати процес розгортання нової версії проекту на сервері при кожному пуші в гілку `lab7`.

---

### **Інструменти:**

#### **1. PM2**
PM2 — це процес-менеджер для Node.js-додатків. Він дозволяє запускати, перезапускати та моніторити серверні додатки.

**Установка PM2:**
```bash
npm install -g pm2
```

**Команди для використання PM2:**
- **Запуск додатка (бекенд):**
  ```bash
  pm2 start index.js --name "backend-lab7"
  ```
- **Запуск фронтенда через npm:**
  ```bash
  pm2 start npm --name "frontend-lab7" -- start
  ```
- **Перезапуск додатка:**
  ```bash
  pm2 restart backend-lab7
  pm2 restart frontend-lab7
  ```
- **Перегляд стану процесів:**
  ```bash
  pm2 list
  ```
PM2 гарантує, що серверні процеси залишаться активними навіть після перезапуску сервера.

---

#### **2. Nginx**
Nginx використовується як зворотний проксі-сервер для маршрутизації запитів на фронтенд та бекенд.

**Установка Nginx:**
```bash
sudo apt update
sudo apt install nginx
```

**Налаштування конфігурації Nginx:**
Створено наступний файл конфігурації:
```nginx
server {
    listen 80;

    location / {
        proxy_pass http://localhost:3015;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api {
        proxy_pass http://localhost:5015;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Активація конфігурації:**
```bash
sudo ln -s /etc/nginx/sites-available/lingo-cards/etc/nginx/sites-enabled/
sudo nginx -t  # Перевірка конфігурації
sudo systemctl reload nginx
```

#### **Результат:**
- Запити до `https://lingo-cards.pro` маршрутизуються на фронтенд.
- Запити до `https://lingo-cards.pro/api` маршрутизуються на бекенд.

---

#### **3. GitHub Actions**
GitHub Actions використовується для автоматизації розгортання на сервері.

**Файл конфігурації CD (cd.yml):**
[Файл cd.yml](../../../.github/workflows/cd.yml):
```yaml
name: CD Pipeline for lab7

on:
  push:
    branches: [lab7]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Deploy to Server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd ~/lingo-cards
            git fetch origin lab7
            git checkout lab7
            git pull origin lab7

            cd backend
            npm install
            pm2 restart backend-lab7 || pm2 start index.js --name backend-lab7

            cd ../lingo-frontend
            npm install
            pm2 restart frontend-lab7 || pm2 start npm --name frontend-lab7 -- run dev
```

**Процес роботи:**
1. При пуші до гілки `lab7` запускається pipeline.
2. Через SSH GitHub Actions підключається до сервера.
3. Код оновлюється (`git pull`).
4. Додатки перезапускаються через PM2.

---

### **Результат:**
- **Автоматичне розгортання:** Нові зміни розгортаються на сервері після кожного пуша.
- **Моніторинг:** PM2 підтримує працездатність додатків.
- **Проксування:** Nginx забезпечує маршрутизацію запитів.

---

## 3. Доступність сервісу

### **Домен:**
- **Frontend:** [https://lingo-cards.pro](https://lingo-cards.pro)
- **Backend API:** [https://api.lingo-cards.pro](https://api.lingo-cards.pro)

### **Додатки працюють на портах:**
- **Frontend:** 3000 (проксування через Nginx).
- **Backend:** 5000 (проксування через Nginx).

### **Перевірка доступності:**
1. За доменами: `curl https://lingo-cards.pro`.
2. API: `curl https://api.lingo-cards.pro`.

---

## 4. Висновок

1. **CI** успішно налаштовано для автоматичної перевірки комітів та Pull Request'ів.
2. **CD** забезпечує автоматичне розгортання змін на сервері.
3. Сервіс доступний за доменами і відповідає вимогам лабораторної роботи.

---

