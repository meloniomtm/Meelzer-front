import { ArtistDatabase } from "../data/ArtistDatabase";
import { GenreDatabase } from "../data/GenreDatabase";
import { MusicDatabase } from "../data/MusicDatabase";

import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { Artist } from "../model/Artist";
import { Genre } from "../model/Genre";

export class SearchBusiness {
    async getAll() {
        const artistDatabase = new ArtistDatabase();
        const artist = await artistDatabase.getAllArtists();
        const genreDatabase = new GenreDatabase();
        const genre = await genreDatabase.getAllGenre();
        const musicDatabase = new ArtistDatabase();
        const music = await musicDatabase.getAllArtists();
        let result: any = []
        genre.map((item: any) => {
            result.push({ id: item.id, name: item.name, image: item.image, type:'genre'})
        })
        artist.map((item: any) => {
            if (item.approved == 1) {
                result.push({id: item.id, name: item.name, image: item.image, type:'artist'})
            }
        })
        return result;
    }
}