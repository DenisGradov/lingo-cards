FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ARG ALLOWED_ORIGINS
ARG JWT_SECRET
ARG SESSION_SECRET
ENV ALLOWED_ORIGINS=${ALLOWED_ORIGINS}
ENV JWT_SECRET=${JWT_SECRET}
ENV SESSION_SECRET=${SESSION_SECRET}

EXPOSE ${BACKEND_PORT}
CMD ["npm", "run", "start"]
