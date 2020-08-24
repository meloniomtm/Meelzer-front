import { ArtistDatabase } from "../data/ArtistDatabase";
import { GenreDatabase } from "../data/GenreDatabase";
import { MusicDatabase } from "../data/MusicDatabase";

import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";

export class SearchBusiness {
    async getAll() {
        const artistDatabase = new ArtistDatabase();
        const artist = await artistDatabase.getAllArtists();
        const genreDatabase = new GenreDatabase();
        const genre = await genreDatabase.getAllGenre();
        const musicDatabase = new ArtistDatabase();
        const music = await musicDatabase.getAllArtists();
        let result: any[] = []
        genre.map((item: any) => {
            result.push(item)
        })
        artist.map((item: any) => {
            if(item.approved == 1) {
                result.push(item)
            }
        })
        console.log(result)
        return result;
    }
}