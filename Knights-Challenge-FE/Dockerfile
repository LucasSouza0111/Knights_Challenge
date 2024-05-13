# estágio de compilação
FROM node:lts-alpine as build-stage
WORKDIR /Knights-Challenge-FE
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]