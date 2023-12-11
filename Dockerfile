FROM node:20-alpine3.17 AS builder
ARG CI=true
WORKDIR /app
USER root
COPY . .
RUN npm config set registry https://registry.npmmirror.com && npm i -g pnpm
RUN pnpm i
RUN npx webpack --config webpack.config.prod.ts


FROM playwright/chromium:playwright-1.39.0 AS prod
ARG CI=true
ENV workdir=/app NODE_ENV=production
WORKDIR ${workdir}
USER root
COPY --from=builder /app/dist/ ./dist
COPY package.json .
COPY pnpm-lock.yaml .
RUN npm config set registry https://registry.npmmirror.com && npm i -g pnpm yarn
RUN pnpm i
EXPOSE 3000
HEALTHCHECK CMD curl http://localhost:3000 -f || exit 1
ENTRYPOINT npm run start:prod
