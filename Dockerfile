FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g nodemon

EXPOSE 8000

CMD ["npm", "run", "start:dev"]