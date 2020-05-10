 import passport from 'passport';
import User, { IUserPayload } from './../models/User';
import bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';

/* Initializing passport strategy */
passport.use(new Strategy((username, password, done) => {
    User.get({username})
        .then((user: IUserPayload | null) => {
            if (user === null) done(null, false);

            bcrypt.compare(password, user?.passHash as string)
                .then((valid: boolean) => {
                    if (valid) done(null, user);
                    else done(null, false);
                }).catch(err => done(err));
        }).catch(err => done(err));
}));


/* Initializing passport serialization */
passport.serializeUser((user: IUserPayload, done) => {
    done(null, user.username);
});

passport.deserializeUser((username: string, done) => {
    User.get({username})
        .then((user: IUserPayload | null) => user && done(null, user))
        .catch(err => done(err));
});

export default passport;
