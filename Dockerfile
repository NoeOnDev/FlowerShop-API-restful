FROM node:latest

ARG PORT=3000

ENV PORT=${PORT}

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE ${PORT}

CMD ["npm", "start"]