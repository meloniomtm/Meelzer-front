import { Request, Response } from "express";
import { MusicInputDTO, NameInputDTO } from "../model/Music";
import { MusicBusiness } from "../business/MusicBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import {Authenticator} from "../services/Authenticator";
import {ArtistDatabase} from "../data/ArtistDatabase";

export class MusicController {
    async createMusic(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);
            const artistDb = new ArtistDatabase();
            const artist = await artistDb.getById(authenticationData.id);
            console.log(artist)
            const input: MusicInputDTO = {
                name: req.body.name,
                releasedIn: req.body.releasedIn,
                id_album: req.body.id_album,
                id_artist: artist.id,
                name_artist: artist.name,
            }

            const musicBusiness = new MusicBusiness();
            await musicBusiness.createMusic(input);

            res.status(200).send({ message: "Music successfully created" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getAllMusics(req: Request, res: Response) {
        const musicBusiness: MusicBusiness = new MusicBusiness();

        try {
            const token = req.headers.authorization as string;

            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);

            
            const input: any = {
                search: req.params.search as string,
            };
            const music = await musicBusiness.getAllMusics();

            await BaseDatabase.destroyConnection();
            res.status(200).send({ result: music });

        } catch (error) {
            await BaseDatabase.destroyConnection();
            res.status(400).send({ error: error.message });
        }

    }

}