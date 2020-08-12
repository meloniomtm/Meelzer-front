import { Request, Response } from "express";
import { AlbumInputDTO } from "../model/Album";
import { AlbumBusiness } from "../business/AlbumBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import {Authenticator} from "../services/Authenticator";
import {UserDatabase} from "../data/UserDatabase"
import {MusicDatabase} from "../data/MusicDatabase"
//TO DO: ALTERAR USE PARA ARTIST
export class AlbumController {
    async createAlbum(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);
            const userDb = new UserDatabase();
            const user = await userDb.getById(authenticationData.id);
            const input: AlbumInputDTO = {
                id_artist: user.id,
                name: req.body.name,
                published: req.body.published,
                genre: req.body.genre
            }

            const albumBusiness = new AlbumBusiness();
            await albumBusiness.createAlbum(input);

            res.status(200).send({ message: "album successfully created" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getAllAlbunsByArtist(req: Request, res: Response) {
        const albumBusiness: AlbumBusiness = new AlbumBusiness();

        try {
            const token = req.headers.authorization as string;

            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);

            
            const input: any = {
                search: req.params.search as string,
            };
            const album = await albumBusiness.getAllAlbunsByArtist(input.search);

            res.status(200).send({ album: album });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}