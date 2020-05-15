import { Request, Response } from 'express';
import * as films from './../../models/Film';
import { IFilm } from '../../models/Film';
import * as HTTPStatus from 'http-status-codes';

const index = async (req: Request, res: Response) => {
    const film = req.body as IFilm;

    /* check if not same user present in DB */
    const filmsInDB = await films.get({
        name: film.name,
        releaseYear: film.releaseYear.toString()
    });

    /* check that all actors are unique */

    let sameActors = false;

    for (const [i, actor] of film.actors.entries()) {
        if (film.actors.indexOf(actor, i) !== -1) sameActors = true;
    }

    if (filmsInDB.length === 0 && !sameActors) {
        await films.put(film);
        res.sendStatus(HTTPStatus.CREATED);
    } else if (sameActors) {
        res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json({
            errors:
                {
                    error: [
                        {
                            msg: `No same actors allowed`,
                            value: film.actors,
                        }
                    ]
                }
        });
    } else {
        res.sendStatus(HTTPStatus.NOT_MODIFIED);
    }
};

export default index;
