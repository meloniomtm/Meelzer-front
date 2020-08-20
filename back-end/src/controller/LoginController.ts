import { Request, Response } from "express";
import { LoginInputDTO } from "../model/Login";
import { LoginBusiness } from "../business/LoginBusiness";
import { UserBusiness } from "../business/UserBusiness";

import { BaseDatabase } from "../data/BaseDatabase";

export class LoginController {
    async login(req: Request, res: Response) {
        try {
            const loginData: LoginInputDTO = {
                email_Nickname: req.body.email_Nickname,
                password: req.body.password
            };
            const loginBusiness = new LoginBusiness();
            const result = await loginBusiness.getUserByEmailNickname(loginData);
            await BaseDatabase.destroyConnection();
            res.status(200).send({ result });
        } catch (error) {
            await BaseDatabase.destroyConnection();
            res.status(400).send({ error: error.message });
        }

        
    }

}