import { MusicInputDTO } from "../model/Music";
import { MusicDatabase } from "../data/MusicDatabase";
import { IdGenerator } from "../services/IdGenerator";

export class MusicBusiness {
    private musicDatabase = new MusicDatabase();
    private idGenerator = new IdGenerator();

    async createMusic(music: MusicInputDTO) {
        const id = this.idGenerator.generate();
        await this.musicDatabase.createMusic(id, music.name, music.releasedIn, music.id_album, music.id_artist, music.name_artist);
        return id;
    };

    async getAllMusics() {
        const musicDatabase = new MusicDatabase();
        const music = await musicDatabase.getAllMusics();
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

    async getMusicByMusic(input: string) {
        const musicDatabase = new MusicDatabase();
        const music = await musicDatabase.getMusicByMusic(input);
        return music;
    }
}