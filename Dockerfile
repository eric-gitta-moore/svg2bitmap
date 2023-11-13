from playwright/chrome:playwright-1.39.0
env workdir=/data/app
workdir ${workdir}
user root
copy . /data/app
run npm i -g pnpm yarn
ENTRYPOINT pnpm run start
