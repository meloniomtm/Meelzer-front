import { Request, Response } from "express";
import { ArtistInputDTO} from "../model/Artist";
import { ArtistBusiness } from "../business/ArtistBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { ArtistDatabase } from "../data/ArtistDatabase";
import {Authenticator} from "../services/Authenticator";

export class ArtistController {
    async signup(req: Request, res: Response) {
        try {

            const input: ArtistInputDTO = {
                name: req.body.name,
                nickname: req.body.nickname,
                email: req.body.email,
                password: req.body.password,
            }

            const artistBusiness = new ArtistBusiness();
            const token = await artistBusiness.createArtist(input);

            await BaseDatabase.destroyConnection();
            res.status(200).send({ token: token, accountType: "artist" });

        } catch (error) {
            await BaseDatabase.destroyConnection();
            res.status(400).send({ error: error.message });
        }

    }

    async putApproveArtist(req: Request, res: Response) {
        const artistBusiness: ArtistBusiness = new ArtistBusiness();

        try {
            const token = req.headers.authorization as string;

            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);

            const artistDb = new ArtistDatabase();
            const artist = await artistDb.getArtistById(authenticationData.id);
            if (artist.role !== 'admin' && artist.role !== 'ADMIN'){
                throw new Error("Only admins can approve artists");
            }

            const artistId: any = {
                id: req.params.id as string,
            };

            await artistBusiness.putApproveArtist(artistId.id);

            await BaseDatabase.destroyConnection();
            res.status(200).send({ message: 'Artist successfully approved' });

        } catch (error) {
            await BaseDatabase.destroyConnection();

            res.status(400).send({ error: error.message });
        }
    }

    async getAllArtists(req: Request, res: Response) {
        const artistBusiness: ArtistBusiness = new ArtistBusiness();
        try {
            const token = req.headers.authorization as string;
            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);
            const artist = await artistBusiness.getAllArtists();
            await BaseDatabase.destroyConnection();
            res.status(200).send({ artist: artist });
        } catch (error) {
            await BaseDatabase.destroyConnection();
            res.status(400).send({ error: error.message });
        }
    }

    async getOwnArtistProfile(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;

            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);

            const artistDb = new ArtistDatabase();
            const artist = await artistDb.getArtistById(authenticationData.id)
            
            await BaseDatabase.destroyConnection();
            res.status(200).send({ result: artist });

        } catch (error) {
            await BaseDatabase.destroyConnection();
            res.status(400).send({ error: error.message });
        }

    }

    async getArtistById(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;

            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);

            const artistDb = new ArtistDatabase();
            const artist = await artistDb.getArtistById(req.params.id)
            
            await BaseDatabase.destroyConnection();
            res.status(200).send({ result: artist });

        } catch (error) {
            await BaseDatabase.destroyConnection();
            res.status(400).send({ error: error.message });
        }

    }

}