# my-express

## Start the development server

```bash
yarn install
yarn start
```

Or

```bash
npm install
npm start
```

## API

1. Create a post

URL: localhost:3001/v1/posts POST

Payload: Form Data with below property names

```js
title: string
description: string
image: Binary Image (or any as currently there is no filetype check) File
```
