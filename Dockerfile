FROM playwright/chrome:playwright-1.39.0
ARG CI=true
ENV workdir=/data/app
WORKDIR ${workdir}
USER root
COPY . .
RUN npm config set registry https://registry.npmmirror.com && npm i -g pnpm yarn
RUN pnpm i
EXPOSE 3000
HEALTHCHECK CMD curl http://localhost:3000 -f || exit 1
ENTRYPOINT npm run start
