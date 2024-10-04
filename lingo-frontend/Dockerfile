FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3037

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3037"]
