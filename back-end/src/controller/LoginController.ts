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
            console.log("passou pelo LoginController", loginBusiness)
            const token = await loginBusiness.getUserByEmailNickname(loginData);
            console.log(token)
            await BaseDatabase.destroyConnection();
            res.status(200).send({ token });
            console.log("passou pelo LoginController")
        } catch (error) {
            console.log("Error LoginController")
            await BaseDatabase.destroyConnection();
            res.status(400).send({ error: error.message });
        }

        
    }

}