# RightStart - Express TypeScript 

![](https://image.ibb.co/nHtkWw/Untitled_1.jpg)

## Prerequisites

1. Latest version of Node to be installed(i recommend NVM, easier to install and possible to work with multiple node versions).
2. Install MongoDB and make sure it is running on default port 27017 (if not then please configure constants.ts and change the connection for mongoDB).

```sh
    docker run --name mongo -p 27017:27107 -d mongo
    
```

## Steps to run
```sh
    npm install          <= install all the npm Dependencies
    npm run dev          <= start the Nodemon and watch for changes. (localhost:8080)
```

## Project Structure
```
express-typescript-mongoose-starter
    ├── dist                  <= typescript will compile js to this folder
    ├── node_modules
    ├── src
    │    ├── .env             <= for production, for other envs, use: .env.${NODE_ENV}
    │    ├── api
    │    │    ├── example     <= Replace example for feature name
    │    │    │    ├── example.controller.ts
    │    │    │    ├── example.model.ts
    │    │    │    ├── example.router.ts
    │    ├── config
    │    │    ├── express.ts
    │    │    ├── routes.ts
    │    ├── server.ts
    │    ├── tsconfig.json
    ├── package.json
    ├── tsconfig.json
    ├── README.md
```
