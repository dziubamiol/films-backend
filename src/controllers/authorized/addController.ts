import { Request, Response } from 'express';
import * as films from './../../models/Film';
import { IFilm } from '../../models/Film';
import * as HTTPStatus from 'http-status-codes';

const index = async (req: Request, res: Response) => {
    const film = req.body as IFilm;

    const filmsInDB = await films.get({
        name: film.name,
        releaseYear: film.releaseYear.toString()
    });

    console.log(filmsInDB);

    if (filmsInDB.length === 0) {
        await films.put(film);
        res.sendStatus(HTTPStatus.OK);
    } else {
        res.sendStatus(HTTPStatus.NOT_MODIFIED);
    }
};

export default index;
