import { Request, Response } from "express";
import { UserInputDTO } from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {
    async signup(req: Request, res: Response) {
        try {

            const input: UserInputDTO = {
                name: req.body.name,
                nickname: req.body.nickname,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }

            const userBusiness = new UserBusiness();
            const token = await userBusiness.createUser(input);
            await BaseDatabase.destroyConnection();

            res.status(200).send({ token: token, accountType: input.role });

        } catch (error) {
            await BaseDatabase.destroyConnection();
            res.status(400).send({ error: error.message });
        }
    }
}