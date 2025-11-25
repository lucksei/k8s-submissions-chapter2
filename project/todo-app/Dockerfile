FROM node:24-alpine AS building-stage

WORKDIR /usr/src/app

COPY frontend/package*.json ./

RUN npm ci

ARG VITE_API_URL=http://localhost:8081
ARG VITE_HOURLY_IMAGE_URL='hourly.jpg'

COPY frontend/ .

RUN npm run build

FROM node:24-alpine

WORKDIR /usr/src/app

COPY server/package*.json ./

RUN npm ci 

COPY --chown=node:node server/ .

COPY --from=building-stage --chown=node:node /usr/src/app/dist ./dist

ENV NODE_ENV=production
ENV STATIC_DIR=dist
# USER node

ENTRYPOINT [ "npm", "run", "start" ]
