import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "Meelzer_User";

  public async createUser(
    id: string,
    email: string,
    name: string,
    nickname: string,
    password: string,
    role: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          email,
          name,
          nickname,
          password,
          role
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  /*public getUserByEmailNickname = async (EmailNickname: string): Promise<User> => {
    const result = await this.getConnection().raw(`
        SELECT * FROM ${UserDatabase.TABLE_NAME}  
        WHERE nickname='${EmailNickname}' OR email='${EmailNickname}';
    `)
    return result[0];
  }*/
  public async getUserByEmailNickname(email: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return User.toUserModel(result[0]);
  }
  public async getById(id: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ id });
    return result[0];
  }
}
