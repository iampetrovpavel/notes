FROM node:16.14.0-alpine

WORKDIR /app
COPY package.json .
RUN apk add g++ make python3
RUN npm install --only=prod
RUN npm install -g @nestjs/cli
RUN npm i @types/node
COPY . .

CMD ["npm", "start"]