FROM node:lts-alpine as build-stage
WORKDIR /app

COPY package*.json ./
COPY package*.json ./
COPY .sequelizerc ./
COPY .babelrc ./

RUN npm install
COPY . .
RUN npm run build


FROM node:lts-alpine AS production-stage

COPY --from=build-stage /app/package.json ./

RUN npm install --only=production
COPY --from=build-stage /app/dist ./

ENV NODE_ENV 'development'
ENV DB_USERNAME 'root'
ENV DB_PASSWORD ''
ENV DB_NAME 'crystud'
ENV DB_HOSTNAME 'localhost'
ENV PORT '3000'

EXPOSE ${PORT}
CMD ["node", "index.js"]