FROM node:18-alpine

WORKDIR /app

COPY src/hepsi/package*.json ./

RUN npm install

COPY src/hepsi .

RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "start:prod"]



