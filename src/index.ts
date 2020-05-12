import * as dotenv from 'dotenv';

/* parse .env into process */
dotenv.config();

/* Initializing utility middleware */
import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.ALLOWED_DOMAIN,
    credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));

/* Session middleware */
import passport from './passport/index';
import session from 'express-session';

app.use('*', session({
    secret: process.env.SESSION_SECRET as string,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    resave: true,
    saveUninitialized: false

}));
app.use(passport.initialize());
app.use(passport.session());


/* Router middleware */
import routers from './routes/index';

app.use('/', routers);

/* Starting server */
console.log(`Started ${process.env.NODE_ENV} at ${process.env.PORT}`);
app.listen(process.env.PORT);
