import { BaseDatabase } from "./BaseDatabase";
import { Genre } from "../model/Genre";

export class GenreDatabase extends BaseDatabase {

  private static TABLE_NAME = "Meelzer_Genre";

  public async createGenre(
    id: string,
    name: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
        })
        .into(GenreDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getGenreByName(name: string): Promise<Genre> {
    const result = await this.getConnection()
      .select("*")
      .from(GenreDatabase.TABLE_NAME)
      .where({ name });
    return result[0];
  }

  public async getGenreById(id: string): Promise<Genre> {
    const result = await this.getConnection()
      .select("*")
      .from(GenreDatabase.TABLE_NAME)
      .where({ id });
    return result[0];
  }

  public async getGenreByAuthor(author: string): Promise<Genre[]> {
    const result = await this.getConnection()
      .select("*")
      .from(GenreDatabase.TABLE_NAME)
      .where({ author });
    return result[0];
  }

  public async getGenreByAlbum(album: string): Promise<Genre[]> {
    const result = await this.getConnection()
      .select("*")
      .from(GenreDatabase.TABLE_NAME)
      .where({ album });
    return result[0];
  }
}
