import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";
import { Artist } from "../model/Artist";

export class LoginDatabase extends BaseDatabase {

    private static TABLE_NAME_USER = "Meelzer_User";
    private static TABLE_NAME_ARTIST = "Meelzer_Artist";

    public async getUserByEmailNickname(EmailNickname: string): Promise<User | Artist> {
        let result = await this.getConnection()
            .select("*")
            .from(LoginDatabase.TABLE_NAME_USER)
            .where({ email: EmailNickname })
            .orWhere({ nickname: EmailNickname });
        if (!result[0]) {
            result = await this.getConnection()
                .select("*")
                .from(LoginDatabase.TABLE_NAME_ARTIST)
                .where({ email: EmailNickname })
                .orWhere({ nickname: EmailNickname });
                return Artist.toArtistModel(result[0]);
        }
        return User.toUserModel(result[0]);
    }

}
