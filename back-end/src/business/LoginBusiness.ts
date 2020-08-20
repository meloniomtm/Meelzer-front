import { LoginInputDTO } from "../model/Login";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import {UserDatabase} from "../data/UserDatabase"
import {LoginDatabase} from "../data/LoginDatabase"

export class LoginBusiness {
    async getUserByEmailNickname(user: LoginInputDTO) {
        const loginDatabase = new LoginDatabase();
        const userFromDB = await loginDatabase.getUserByEmailNickname(user.email_Nickname);
        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(user.password, userFromDB.user.getPassword());
        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id: userFromDB.user.getId() });
        if (!hashCompare) {
            throw new Error("Invalid Password!");
        }
        return {token: accessToken, accountType: userFromDB.accountType};
    }
}