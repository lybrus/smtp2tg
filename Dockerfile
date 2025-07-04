FROM node:20-slim

WORKDIR /app

COPY . ./

RUN npm i

EXPOSE 2525

ENTRYPOINT ["node", "server.js"]