FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_BACKEND_URL

ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN npm run build

EXPOSE ${FRONTEND_PORT}

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "${FRONTEND_PORT}"]
