import { query, Request, Response } from 'express';
import * as films from './../../models/Film';
import { ISearchFilm } from '../../models/Film';

const index = async (req: Request, res: Response) => {

    const requestQuery: ISearchFilm = {
        pageSize: req.query.pageSize as string,
        offset: req.query.offset as string,
    };

    req.query.id && (requestQuery.id = req.query.id as string);
    req.query.name && (requestQuery.name = req.query.name as string);
    req.query.releaseYear && (requestQuery.releaseYear = req.query.releaseYear as string);
    req.query.format && (requestQuery.format = req.query.format as string);
    req.query.actor && (requestQuery.actor = req.query.actor as string);

    req.query.sort && (requestQuery.sort = req.query.sort as 'asc' | 'desc');
    req.query.sortField && (requestQuery.sortField = req.query.sortField as 'name' | 'releaseYear');

    const result = await films.get(requestQuery);

    res.json(result);
}

export default index;
