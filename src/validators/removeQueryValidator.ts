import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import * as HTTPStatus from 'http-status-codes';

const queryValidator = [
    check('id').optional().isAlphanumeric(),
];

const validator = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    next();
}

export default {
    queryValidator,
    validator
};
