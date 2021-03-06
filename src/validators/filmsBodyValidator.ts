import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as HTTPStatus from 'http-status-codes';
import { isAlphanumeric, isAlpha } from './tools/isAlphanum';



const bodyValidator = [
    body('name').custom(value => isAlphanumeric(value, ' ')).withMessage('Film name should contain alphabetic characters only'),
    body('releaseYear').isInt({min: 1850, max: (new Date()).getFullYear()}).withMessage(`Release year should be a number from 1850 to ${(new Date()).getFullYear()}`),
    body('format').matches(/^VHS|DVD|Blu-Ray$/).withMessage('Format should be VHS, DVD or Blue-Ray'),
    body('actors.*').custom(value => isAlpha(value, ' ')).withMessage('Actor name should contain alphabetic characters only')
];

const validator = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    next();
}

export default {
    bodyValidator,
    validator
};
