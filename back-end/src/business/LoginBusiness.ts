import { LoginInputDTO } from "../model/Login";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import {UserDatabase} from "../data/UserDatabase"
import {LoginDatabase} from "../data/LoginDatabase"

export class LoginBusiness {
    async getUserByEmailNickname(user: LoginInputDTO) {
        const loginDatabase = new LoginDatabase();
        const userFromDB = await loginDatabase.getUserByEmailNickname(user.email_Nickname);
        console.log("passou pelo LoginBusiness 11")
        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());
        console.log("passou pelo LoginBusiness")
        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id: userFromDB.getId() });
        if (!hashCompare) {
            throw new Error("Invalid Password! 18");
        }
        console.log("passou pelo LoginBusiness 20")
        return accessToken;
    }
}