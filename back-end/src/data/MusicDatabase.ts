import { BaseDatabase } from "./BaseDatabase";
import { Music } from "../model/Music";

export class MusicDatabase extends BaseDatabase {

  private static TABLE_NAME = "Meelzer_Music";

  public async createMusic(
    id: string,
    author: string,
    name: string,
    releasedIn: Date,
    id_album: string|null|undefined
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          author,
          name,
          releasedIn,
          id_album
        })
        .into(MusicDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getMusicByName(name: string): Promise<Music> {
    const result = await this.getConnection()
      .select("*")
      .from(MusicDatabase.TABLE_NAME)
      .where({ name });
    return result[0];
  }

  public async getMusicById(id: string): Promise<Music> {
    const result = await this.getConnection()
      .select("*")
      .from(MusicDatabase.TABLE_NAME)
      .where({ id });
    return result[0];
  }

  public async getMusicByAuthor(author: string): Promise<Music[]> {
    const result = await this.getConnection()
      .select("*")
      .from(MusicDatabase.TABLE_NAME)
      .where({ author });
    return result[0];
  }

  public async getMusicByAlbum(album: string): Promise<Music[]> {
    const result = await this.getConnection()
      .select("*")
      .from(MusicDatabase.TABLE_NAME)
      .where({ album });
    return result[0];
  }
}
