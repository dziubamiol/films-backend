import { ObjectId } from "mongodb";
import { db, waitUntilDBConnected } from '../db/connector';
import collections from '../db/collections';
import bcrypt from 'bcrypt';

export interface IUser {
    username: string;
    password: string;
}

export interface IUserPayload {
    _id?: ObjectId;
    username: string;
    passHash: string;
    salt: string;
}

/**
 * @description async get user from DB
 * @param user {IUser} - user data
 * @return {Promise<IUserPayload | null>}
 */
const get = async ({ username }: {username: string}): Promise<IUserPayload | null>  => {
    await waitUntilDBConnected();
    const users = db.collection<IUserPayload>(collections.users);

    return await users.findOne<IUserPayload>({username: username});
}

/**
 * @description put user to DB
 * @param user {IUser} - user data
 * @return {boolean} - true if added successfully
 */
const put = async (user: IUser): Promise<boolean> => {
    if (await get(user) === null) {
        const users = db.collection<IUserPayload>(collections.users);

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);

        await users.insertOne({
            username: user.username,
            passHash: hash,
            salt: salt
        });

        return true;
    }

    return false;
}

export default { get, put };
