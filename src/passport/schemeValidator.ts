import { body, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import * as HTTPStatus from 'http-status-codes';

export const schemaValidator = [
    body('username').isLength({min: 1, max: 16}).isAlphanumeric(),
    body('password').isLength({min: 8, max: 16})
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    next();
}
