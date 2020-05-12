import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import * as HTTPStatus from 'http-status-codes';

const queryValidator = [
    check('id').optional().isAlphanumeric(),
    check('name').optional().matches(/^[A-Za-z ]+$/).withMessage('Film name should contain alphabetic characters only'),
    check('releaseYear').optional().matches(/^\d+$/).withMessage('Release year should be a number'),
    check('format').optional().matches(/^VHS|DVD|Blu-Ray$/).withMessage('Format should be VHS, DVD or Blue-Ray'),
    check('actor').optional().matches(/^[A-Za-z ]+$/).withMessage('Actor name should contain alphabetic characters only'),

    check('offset').notEmpty().matches(/^\d+$/).withMessage('Invalid offset'),
    check('pageSize').notEmpty().matches(/^\d+$/).withMessage('Invalid pageSize'),
    check('sort').optional().matches(/^asc|desc$/).withMessage('Invalid sort'),
    check('sortField').optional().matches(/^name|releaseYear$/).withMessage('Invalid sortField'),
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
