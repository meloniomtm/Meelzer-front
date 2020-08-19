export class Genre {
    constructor(
        private id: string,
        private name: string
    ) { }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    setId(id: string) {
        this.id = id;
    }

    setName(name: string) {
        this.name = name;
    }

    static toGenreModel(genre: any): Genre {
        return new Genre(genre.id, genre.name);
    }
}

export interface GenreInputDTO {
    name: string
}