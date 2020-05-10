import { Db, MongoClient } from 'mongodb';
import { EventEmitter } from 'events';

const url = process.env.MONGO_URL;

/**
 * @description variable with connected DB
 */
let db: Db;
const dbReceivedListener = new EventEmitter();

MongoClient.connect(url as string, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((client: MongoClient) => {
        db = client.db('films');
        dbReceivedListener.emit('received');
    });

/**
 * @description should resolve when db is connected
 * can be added as await waitUntilDBConnected;
 */
const waitUntilDBConnected = () =>
    new Promise<void>(resolve => {
        if (db !== undefined) {
            resolve();
        }

        dbReceivedListener.addListener('received', () => {
            resolve();
        });
    });

export { db, waitUntilDBConnected };
