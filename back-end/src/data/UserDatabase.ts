import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "Meelzer_User";

  public async createUser(
    id: string,
    name: string,
    nickname: string,
    email: string,
    password: string,
    role: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          nickname,
          email,
          password,
          role
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      console.log("Error UserDatabase linha 28")
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmailNickname (EmailNickname: string): Promise<User> {
     const result = await this.getConnection()
       .select("*")
       .from(UserDatabase.TABLE_NAME)
       .where({ email: EmailNickname })
       .orWhere({nickname: EmailNickname});

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
