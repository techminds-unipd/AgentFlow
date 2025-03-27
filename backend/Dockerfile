FROM docker.io/node:22.14.0-alpine3.21
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]