import { NextFunction, Request, Response } from 'express';

const mustAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        return res.sendStatus(401);
    }

    next();
}

export default mustAuthenticated;
