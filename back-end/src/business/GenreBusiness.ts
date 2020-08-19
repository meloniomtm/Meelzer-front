import { GenreInputDTO } from "../model/Genre";
import { GenreDatabase } from "../data/GenreDatabase";
import { IdGenerator } from "../services/IdGenerator";

export class GenreBusiness {
    private genreDatabase = new GenreDatabase();
    private idGenerator = new IdGenerator();

    async createGenre(genre: GenreInputDTO) {
        const id = this.idGenerator.generate();
        await this.genreDatabase.createGenre(id, genre.name);
        return id;
    };

    async getGenreByName(input: string) {
        const genreDatabase = new GenreDatabase();
        const genre = await genreDatabase.getGenreByName(input);
        return genre;
    }

    async getGenreById(input: string) {
        const genreDatabase = new GenreDatabase();
        const genre = await genreDatabase.getGenreById(input);
        return genre;
    }
}