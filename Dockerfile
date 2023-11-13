FROM playwright/chrome:playwright-1.39.0
ENV workdir=/data/app
WORKDIR ${workdir}
USER root
COPY . /data/app
RUN npm i -g pnpm yarn
ENTRYPOINT pnpm run start
