import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/User";
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

            res.status(200).send({ token });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async login(req: Request, res: Response) {
        try {
            const loginData: LoginInputDTO = {
                email_Nickname: req.body.email_Nickname,
                password: req.body.password
            };
            console.log("chegou linha 36")
            const userBusiness = new UserBusiness();

            const token = await userBusiness.getUserByEmailNickname(loginData);
            console.log("chegou linha 40")
            res.status(200).send({ token });

        } catch (error) {
            console.log("error UserController linha 44")
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}