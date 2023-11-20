FROM playwright/chrome:playwright-1.39.0
ENV workdir=/data/app
WORKDIR ${workdir}
USER root
COPY . /data/app
EXPOSE 3000
RUN npm config set registry https://registry.npmmirror.com && npm i -g pnpm yarn
ENTRYPOINT pnpm run start
