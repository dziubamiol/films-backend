# films-backend
## API documentation
https://app.swaggerhub.com/apis/dziubamiol/WebbyLabFilms/1.0.0#/

## ```.env``` structure

```
PORT=<PORT>
NODE_ENV=<development | production>
MONGO_URL=<MONGO_URL>
SESSION_SECRET=<SECRET>
ALLOWED_DOMAIN=<ALLOWED_DOMAINS>
```

# Startup procedure

   1. Install last lts node.js https://nodejs.org/en/
   2. Install mongodb https://docs.mongodb.com/manual/installation/
   3. Create db inside mongodb with names: ```users```, ```films```
   4. Pull master branch from https://github.com/dziubamiol/films-backend
   5. Install all packages using: ```npm i```
   6. Setup ```.env``` following ```.env``` structure above. ```ALLOWED_DOMAIN``` should be equal to frontend domain that runs locally
   
   7. Start project locally running ```npm run start```, it should start at http://localhost:3000

## Available commands
```start``` - start server /build/index.js, build before use

```build``` - build app

```build-start``` - build app and start server
    
```pretify``` - pretify project source code    
