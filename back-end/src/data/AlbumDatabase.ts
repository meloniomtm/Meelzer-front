import { BaseDatabase } from "./BaseDatabase";
import { Album } from "../model/Album";

export class AlbumDatabase extends BaseDatabase {
    static TABLE_NAME = "Meelzer_Album";

    public async createAlbum(
        id: string,
        id_artist: string,
        name: string,
        published: boolean,
        genre: string,
        releasedIn: Date
    ): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id,
                    id_artist,
                    name,
                    published,
                    genre,
                    releasedIn
                })
                .into(AlbumDatabase.TABLE_NAME);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getAlbumById(id: string): Promise<Album[]> {
        const result = await this.getConnection()
            .select("*")
            .from(AlbumDatabase.TABLE_NAME)
            .where({ id });
        return result[0];
    }

    public getAllAlbuns = async (): Promise<Album[]> => {
        const result = await this.getConnection()
            .select("*")
            .from(AlbumDatabase.TABLE_NAME)
        return result;
    }
}
