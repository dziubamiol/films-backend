import { body, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import * as HTTPStatus from 'http-status-codes';

export const schemaValidator = [
    body('username').isLength({min: 1, max: 16}).isAlphanumeric(),
    body('password').isLength({min: 8, max: 16})
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
    if (!validationResult(req).isEmpty()) {
        return res.sendStatus(HTTPStatus.UNPROCESSABLE_ENTITY);
    }
    next();
}
