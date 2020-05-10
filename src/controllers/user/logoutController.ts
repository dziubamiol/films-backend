import { Request, Response } from 'express';
import * as HTTPStatus from 'http-status-codes';

const index = (req: Request, res: Response) => {
    req.logout();
    res.sendStatus(HTTPStatus.OK);
}

export default index;
