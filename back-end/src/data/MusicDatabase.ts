import { BaseDatabase } from "./BaseDatabase";
import { Music } from "../model/Music";

export class MusicDatabase extends BaseDatabase {

  private static TABLE_NAME = "Meelzer_Music";

  public async createMusic(
    id: string,
    name: string,
    releasedIn: Date,
    id_album: string|null|undefined,
    id_artist: string,
    name_artist: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          releasedIn,
          id_album,
          id_artist,
          name_artist
        })
        .into(MusicDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public getAllMusics = async (): Promise<Music[]> => {
    const result = await this.getConnection()
        .select("*")
        .from(MusicDatabase.TABLE_NAME)
    return result;
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

  public async getMusicByMusic(music: string): Promise<Music[]> {
    const result = await this.getConnection()
      .select("*")
      .from(MusicDatabase.TABLE_NAME)
      .where({ music });
    return result[0];
  }

}
