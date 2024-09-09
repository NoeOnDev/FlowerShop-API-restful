FROM node:latest

ARG PORT=9020

ENV PORT=${PORT}

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 9020

CMD ["npm", "start"]