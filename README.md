# my-express

## Configure the env

Open the .env file and change below values:

```bash
EXPRESS_DB_HOST=localhost
EXPRESS_DB_POST=5432
EXPRESS_DB_USER=postgres # your username
EXPRESS_DB_PASS=password # your password
EXPRESS_DB_NAME=my-express # your database name
```

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
