import { UserInputDTO, LoginInputDTO, User } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { Console } from "console";

export class UserBusiness {

    async createUser(user: UserInputDTO) {

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(user.password);

        const userDatabase = new UserDatabase();
        await userDatabase.createUser(id,  user.name, user.nickname, user.email, hashPassword, user.role);

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id });

        return accessToken;
    }

    async getUserByEmailNickname(user: LoginInputDTO) {
        const userDatabase = new UserDatabase();
        const userFromDB = await userDatabase.getUserByEmailNickname(user.email_Nickname);

        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id: userFromDB.getId() });
        console.log("UserBusiness chegou linha 36")
        if (!hashCompare) {
            console.log("ERROR UserBusiness linha 38")
            throw new Error("Invalid Password!");
        }

        return accessToken;
    }
}