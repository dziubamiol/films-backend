import { Request, Response } from 'express';
import User, { IUser } from './../../models/User';
import * as HTTPStatus from 'http-status-codes';


const index = async (req: Request, res: Response): Promise<void> => {
    const status = await User.put(req.body as IUser);

    if (status) {
        res.status(HTTPStatus.CREATED).send();
    } else {
        res.status(HTTPStatus.NOT_MODIFIED).send();
    }
}

export default index;
