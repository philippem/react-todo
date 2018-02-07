## React Todo With Users and Local Auth

Tyler Water's intepretation of the classic React Todo app that
implements a user/password store.

A local SqlLite db store users.

Redis is used to cache tokens.

# Pre-requisites

1. Redis
See `./env/*.env` for configuration details pointing to
your redis server. You can run a docker container for redis with

`docker run -p 6379:6379 -d redis`

# Running

```
$ npm install
$ npm run db
$ npm run start:redis-dev
$ npm start
```
