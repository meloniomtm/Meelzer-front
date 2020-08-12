import { Request, Response } from "express";
import { MusicInputDTO, NameInputDTO } from "../model/Music";
import { MusicBusiness } from "../business/MusicBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import {Authenticator} from "../services/Authenticator";
import {UserDatabase} from "../data/UserDatabase";
//TO DO: ALTERAR USE PARA ARTIST

export class MusicController {
    async createMusic(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);
            const userDb = new UserDatabase();
            const user = await userDb.getById(authenticationData.id);

            const input: MusicInputDTO = {
                author: user.name,
                name: req.body.name,
                id_album: req.body.name
            }

            const musicBusiness = new MusicBusiness();
            await musicBusiness.createMusic(input);

            res.status(200).send({ message: "Music successfully created" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getMusicByName(req: Request, res: Response) {
        const musicBusiness: MusicBusiness = new MusicBusiness();
        try {
            const token = req.headers.authorization as string;

            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);

            const input: NameInputDTO = {
                name: req.params.input as string,
            };
            const music = await musicBusiness.getMusicByName(input.name);

            res.status(200).send({ music: music });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getMusicByResponsible(req: Request, res: Response) {
        const bandBusiness: MusicBusiness = new MusicBusiness();

        try {
            const token = req.headers.authorization as string;

            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);

            const responsible: NameInputDTO = {
                name: req.params.responsible as string,
            };
            const band = await bandBusiness.getMusicByName(responsible.name);

            res.status(200).send({ band: band });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }
}