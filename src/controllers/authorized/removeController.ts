import { Request, Response } from 'express';
import * as films from './../../models/Film';
import * as HTTPStatus from 'http-status-codes';

const index = async (req: Request, res: Response) => {
    const id = req.query.id as string;

    const status = await films.remove(id);

    if (status) {
        res.sendStatus(HTTPStatus.OK);
    } else {
        res.sendStatus(HTTPStatus.NOT_MODIFIED);
    }
};

export default index;
