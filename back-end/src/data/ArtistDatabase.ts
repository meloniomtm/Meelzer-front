import { BaseDatabase } from "./BaseDatabase";
import { Artist } from "../model/Artist";

export class ArtistDatabase extends BaseDatabase {

  private static TABLE_NAME = "Meelzer_Artist";

  public async createArtist(
    id: string,
    name: string,
    nickname: string,
    email: string,
    password: string,
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          nickname,
          email,
          password,
        })
        .into(ArtistDatabase.TABLE_NAME);
    } catch (error) {
      console.log("Error ArtistDatabase linha 28")
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getArtistByEmailNickname(EmailNickname: string): Promise<Artist> {
    const result = await this.getConnection()
      .select("*")
      .from(ArtistDatabase.TABLE_NAME)
      .where({ email: EmailNickname })
      .orWhere({ nickname: EmailNickname });

    return Artist.toArtistModel(result[0]);
  }

  public async putApproveArtist(id: string): Promise<any> {
    console.log(id)
    const result = await this.getConnection().raw(`
    UPDATE ${ArtistDatabase.TABLE_NAME}
    SET approved = true
    WHERE id='${id}';
    `)
    return result[0];
  }

  /*  public async getById(id: string): Promise<any> {
      const result = await this.getConnection()
        .select("*")
        .from(ArtistDatabase.TABLE_NAME)
        .where({ id });
      return result[0];
    }
  */
    public async getAllArtists(): Promise<any> {
      const result = await this.getConnection()
        .select("*")
        .from(ArtistDatabase.TABLE_NAME);
      return result;
    }
  
}
