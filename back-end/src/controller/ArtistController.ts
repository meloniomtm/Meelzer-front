import { Request, Response } from "express";
import { ArtistInputDTO} from "../model/Artist";
import { ArtistBusiness } from "../business/ArtistBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

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

            res.status(200).send({ token: token, accountType: "artist" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }



}