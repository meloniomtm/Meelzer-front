import { Request, Response } from "express";
import { GenreInputDTO, GenreInpuGetByNameDTO } from "../model/Genre";
import { GenreBusiness } from "../business/GenreBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { Authenticator } from "../services/Authenticator";
import { UserDatabase } from "../data/UserDatabase";
//TO DO: ALTERAR USE PARA ARTIST

export class GenreController {
    async createGenre(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);
            const userDb = new UserDatabase();
            const user = await userDb.getUserById(authenticationData.id);
            if (user.role !== 'admin') {
                throw new Error("You are not allowed to access this function");
            }
            const input: GenreInputDTO = {
                name: req.body.name,
                image: req.body.image
            }

            const genreBusiness = new GenreBusiness();
            await genreBusiness.createGenre(input);

            await BaseDatabase.destroyConnection();
            res.status(200).send({ message: "Genre successfully created" });
        } catch (error) {
            await BaseDatabase.destroyConnection();
            res.status(400).send({ error: error.message });
        }
    }

    async getGenreByName(req: Request, res: Response) {
        const genreBusiness: GenreBusiness = new GenreBusiness();
        try {
            const token = req.headers.authorization as string;

            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);

            const input: GenreInpuGetByNameDTO = {
                name: req.params.input as string,
            };
            const genre = await genreBusiness.getGenreByName(input.name);

            await BaseDatabase.destroyConnection();
            res.status(200).send({ genre: genre });
        } catch (error) {
            await BaseDatabase.destroyConnection();
            res.status(400).send({ error: error.message });
        }
    }

    async getAllGenre(req: Request, res: Response) {
        const genreBusiness: GenreBusiness = new GenreBusiness();
        try {
            const token = req.headers.authorization as string;
            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);
            const genre = await genreBusiness.getAllGenre();
            await BaseDatabase.destroyConnection();
            res.status(200).send({ genre: genre });
        } catch (error) {
            await BaseDatabase.destroyConnection();
            res.status(400).send({ error: error.message });
        }
    }
}