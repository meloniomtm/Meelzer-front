import { Request, Response } from "express";
import { SearchBusiness } from "../business/SearchBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import {Authenticator} from "../services/Authenticator";

export class SearchController {
    async getAll(req: Request, res: Response) {
        const artistBusiness: SearchBusiness = new SearchBusiness();
        try {
            const token = req.headers.authorization as string;
            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);
            const search = await artistBusiness.getAll();
            await BaseDatabase.destroyConnection();
            res.status(200).send({ search });
        } catch (error) {
            await BaseDatabase.destroyConnection();
            res.status(400).send({ error: error.message });
        }
    }

}