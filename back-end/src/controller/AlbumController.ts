import { Request, Response } from "express";
import { AlbumInputDTO } from "../model/Album";
import { AlbumBusiness } from "../business/AlbumBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import {Authenticator} from "../services/Authenticator";
import {ArtistDatabase} from "../data/ArtistDatabase"
import {MusicDatabase} from "../data/MusicDatabase"

export class AlbumController {
    async createAlbum(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);
            const artistDb = new ArtistDatabase();
            const artist = await artistDb.getArtistById(authenticationData.id);
            const input: AlbumInputDTO = {
                id_artist: artist.id,
                name: req.body.name,
                published: req.body.published,
                genre: req.body.genre,
                releasedIn: req.body.releasedIn,
            }

            const albumBusiness = new AlbumBusiness();
            await albumBusiness.createAlbum(input);

            await BaseDatabase.destroyConnection();
            res.status(200).send({ message: "album successfully created" });

        } catch (error) {
            await BaseDatabase.destroyConnection();
            res.status(400).send({ error: error.message });
        }

    }

    async getAllAlbuns(req: Request, res: Response) {
        const albumBusiness: AlbumBusiness = new AlbumBusiness();

        try {
            const token = req.headers.authorization as string;

            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);

            
            const input: any = {
                search: req.params.search as string,
            };
            const album = await albumBusiness.getAllAlbuns();

            await BaseDatabase.destroyConnection();
            res.status(200).send({ result: album });

        } catch (error) {
            await BaseDatabase.destroyConnection();
            res.status(400).send({ error: error.message });
        }

    }

}