FROM node:16.14.0-alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=prod
RUN npm install -g @nestjs/cli
RUN npm i @types/node
COPY . .

CMD ["npm", "start"]