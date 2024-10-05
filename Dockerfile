FROM node:20-alpine AS base

WORKDIR /data
COPY package.json package-lock.json /data/
ENV PATH=/data/node_modules/.bin:$PATH

# Development stage
FROM base AS development

ENV NODE_ENV=development
RUN npm install --include=dev

USER node
WORKDIR /data/app

CMD ["npx", "ts-node-dev", "-r", "tsconfig-paths/register", "app.ts"]

# Production stage
# Build the app
FROM base AS build

RUN npm install

COPY . /data/app
WORKDIR /data/app

RUN npx tsc

# Create the server image
FROM node:20-alpine AS production
ENV NODE_ENV=production

COPY --from=build /data/app/dist /build/dist
COPY --from=build /data/package.json /data/package-lock.json /build/

WORKDIR /build
RUN npm install --only=production

ENV LOG_FOLDER=/logs
RUN mkdir -p $LOG_FOLDER && chown -R node $LOG_FOLDER

USER node

ENTRYPOINT ["node", "/build/dist/app.js"]

