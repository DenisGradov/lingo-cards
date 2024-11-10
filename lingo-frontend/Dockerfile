FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
RUN VITE_BACKEND_URL=${VITE_BACKEND_URL} npm run build

EXPOSE ${FRONTEND_PORT}
CMD sh -c "npm run preview -- --host 0.0.0.0 --port ${FRONTEND_PORT}"
