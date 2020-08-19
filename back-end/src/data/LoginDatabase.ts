import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";
import { Artist } from "../model/Artist";

export class LoginDatabase extends BaseDatabase {

    private static TABLE_NAME_USER = "Meelzer_User";
    private static TABLE_NAME_ARTIST = "Meelzer_Artist";

    public async getUserByEmailNickname(EmailNickname: string): Promise<User | Artist> {
        console.log(EmailNickname)
        let result = await this.getConnection()
            .select("*")
            .from(LoginDatabase.TABLE_NAME_USER)
            .where({ email: EmailNickname })
            .orWhere({ nickname: EmailNickname });
        console.log("LoginDatabase, USER: ", result[0])
        if (!result[0]) {
            console.log("Entrou em artist")
            result = await this.getConnection()
                .select("*")
                .from(LoginDatabase.TABLE_NAME_ARTIST)
                .where({ email: EmailNickname })
                .orWhere({ nickname: EmailNickname });
                console.log("LoginDatabase, ARTIST: ", result[0])
                return Artist.toArtistModel(result[0]);
        }
        return User.toUserModel(result[0]);
    }

}
