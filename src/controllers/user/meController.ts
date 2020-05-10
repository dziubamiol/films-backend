import { Request, Response } from 'express';
import { IUserPayload } from '../../models/User';


const index = (req: Request, res: Response) => {
    const user: IUserPayload = req.user as IUserPayload;

    delete user.passHash;
    delete user.salt;

    res.send(user);
}

export default index;
