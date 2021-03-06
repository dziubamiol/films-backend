import { FilterQuery, ObjectId } from "mongodb";
import { db, waitUntilDBConnected } from '../db/connector';
import collections from '../db/collections';

export interface IFilm {
    name: string;
    releaseYear: number;
    format: string;
    actors: Array<string>;
}

export interface ISearchFilm {
    id?: string;
    name?: string;
    releaseYear?: string;
    format?: string;
    actor?: string;

    offset?: string;
    pageSize?: string;
    sort?: 'asc' | 'desc';
    sortField?: 'name' | 'releaseYear';
}


export interface IFilmDBPayload extends IFilm {
    _id: ObjectId;
}

export interface IFilmPayload {
    total: number;
    films: Array<IFilmDBPayload>[];
}

export const get = async (search: ISearchFilm): Promise<IFilmPayload> => {
    await waitUntilDBConnected();
    const films = db.collection<IFilmPayload>(collections.films);

    /* Search */
    const searchRequest: FilterQuery<IFilmPayload> = {};

    search.id && (searchRequest._id = new ObjectId(search.id));
    search.name && (searchRequest.name = new RegExp(search.name));
    search.releaseYear && (searchRequest.releaseYear = { $eq: parseInt(search.releaseYear)});
    search.format && (searchRequest.format = { $eq: search.format});
    search.actor && (searchRequest.actors = new RegExp(search.actor));


    let cursor = films.find<Array<IFilmDBPayload>>(searchRequest);

    /* Sorting */
    search.sort &&
    search.sortField &&
    cursor.sort({ [search.sortField]: search.sort === 'asc' ? 1 : -1})
        .collation( { locale: 'en' }); // collate to make lowercase with same letter just after uppercase

    const offset = search.offset ? parseInt(search.offset): 0;
    const pageSize = search.pageSize ? parseInt(search.pageSize): 1;

    /* Paging */
    const skip = offset * pageSize;
    cursor.skip(skip).limit(pageSize);


    return {
        total: await films.count(),
        films: await cursor.toArray(),
    };
}

export const put = async (film: IFilm): Promise<IFilmDBPayload['_id']> => {
    await waitUntilDBConnected();
    const films = db.collection<IFilmDBPayload>(collections.films);

    const status = await films.insertOne(film);

    return status.insertedId;
}

export const remove = async (id: string): Promise<boolean> => {
    await waitUntilDBConnected();
    const films = db.collection<IFilmDBPayload>(collections.films);

    const _id = new ObjectId(id);

    const result = await films.deleteOne({ _id: _id});

    return result.deletedCount ? result.deletedCount > 0 : false;
}
