# svg2bitmap

docker: `docker pull jamescurtisfoxmail/svg2bitmap`

## start
```shell
pnpm i
pnpm run setup
pnpm run start
```

## usage
url: http://localhost:3000/svg2bitmap
body:
```ts
export interface ApiParam {
  url?: string;
  html?: string;
  locator?: string;
}

const example: ApiParam = {
  url: 'http://localhost:4000/home',
  locator:'//app-hoc' // xpath or css selector
};
```