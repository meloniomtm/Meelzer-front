import { MusicInputDTO } from "../model/Music";
import { MusicDatabase } from "../data/MusicDatabase";
import { IdGenerator } from "../services/IdGenerator";

export class MusicBusiness {
    private musicDatabase = new MusicDatabase();
    private idGenerator = new IdGenerator();

    async createMusic(music: MusicInputDTO) {
        const id = this.idGenerator.generate();
        await this.musicDatabase.createMusic(id, music.author, music.name, new Date(Date.now()), music.id_album);
        return id;
    };

    async getMusicByName(input: string) {
        const musicDatabase = new MusicDatabase();
        const music = await musicDatabase.getMusicByName(input);
        return music;
    }

    async getMusicById(input: string) {
        const musicDatabase = new MusicDatabase();
        const music = await musicDatabase.getMusicById(input);
        return music;
    }

    async getMusicByAuthor(input: string) {
        const musicDatabase = new MusicDatabase();
        const music = await musicDatabase.getMusicByAuthor(input);
        return music;
    }

    async getMusicByAlbum(input: string) {
        const musicDatabase = new MusicDatabase();
        const music = await musicDatabase.getMusicByAlbum(input);
        return music;
    }
}