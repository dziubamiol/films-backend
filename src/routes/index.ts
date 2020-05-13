import express, { Request, Response } from 'express';
import { schemaValidator, validate } from '../passport/schemeValidator';
import mustAuthenticated from './../passport/mustAuthenticated';

import joinController from './../controllers/user/joinController';
import loginController from './../controllers/user/loginController';
import logoutController from './../controllers/user/logoutController';
import meController from './../controllers/user/meController';

import filmsController from './../controllers/public/filmsController';
import filmsQueryValidator from '../validators/filmsQueryValidator';

import addController from './../controllers/authorized/addController';
import filmsBodyValidator from '../validators/filmsBodyValidator';

import removeController from './../controllers/authorized/removeController';
import removeQueryValidator from '../validators/removeQueryValidator';

import passport from '../passport';

const router = express.Router();


/* User routes */
router.post('/user/join/',
    schemaValidator,
    validate,
    joinController
);
router.post('/user/login/',
    schemaValidator,
    validate,
    passport.authenticate('local', {successFlash: true}),
    loginController
);
router.get('/user/logout/',
    mustAuthenticated,
    logoutController
);
router.get('/user/me/',
    mustAuthenticated,
    meController
);

/* Protected routes */
router.post('/films/add',
    mustAuthenticated,
    filmsBodyValidator.bodyValidator,
    filmsBodyValidator.validator,
    addController
);
router.delete('/films/remove',
    mustAuthenticated,
    removeQueryValidator.queryValidator,
    removeQueryValidator.validator,
    removeController
);

/* Public routes */
router.get('/films',
    filmsQueryValidator.queryValidator,
    filmsQueryValidator.validator,
    filmsController
);


const indexHandler = (req: Request, res: Response) => {
    res.send('OK');
}

router.get('/test', (req, res) => res.send('test'));
router.get('/', indexHandler);

export default router;
