FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

ENV VUE_APP_API_URL 'http://localhost:4000/'

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
