FROM playwright/chrome:playwright-1.39.0
ARG CI=true
ENV workdir=/data/app
WORKDIR ${workdir}
USER root
COPY . /data/app
EXPOSE 3000
RUN npm config set registry https://registry.npmmirror.com && npm i -g pnpm yarn
HEALTHCHECK CMD curl http://localhost:3000 -f || exit 1
ENTRYPOINT pnpm run start
