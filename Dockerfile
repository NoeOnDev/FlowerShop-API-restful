FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9020
CMD ["npm", "run", "build"] && ["npm", "start"]