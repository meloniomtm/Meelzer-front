import { AlbumInputDTO } from "../model/Album";
import { AlbumDatabase } from "../data/AlbumDatabase";
import { IdGenerator } from "../services/IdGenerator";

export class AlbumBusiness {
    private albumDatabase = new AlbumDatabase();
    private idGenerator = new IdGenerator();

    async createAlbum(album: AlbumInputDTO) {
        const id = this.idGenerator.generate();
        await this.albumDatabase.createAlbum(id, album.id_artist, album.name, album.published, album.genre, new Date(Date.now()));
        return id;
    };

    async getAlbumById(input: string) {
        const albumDatabase = new AlbumDatabase();
        const album = await albumDatabase.getAlbumById(input);
        return album;
    }

    async getAllAlbunsByArtist(input: string) {
        const albumDatabase = new AlbumDatabase();
        const album = await albumDatabase.getAllAlbunsByArtist(input);
        return album;
    }
}