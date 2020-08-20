export class Genre {
    constructor(
        private id: string,
        private name: string,
        private image: string
    ) { }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getImage() {
        return this.image;
    }

    setId(id: string) {
        this.id = id;
    }

    setName(name: string) {
        this.name = name;
    }

    setImage(image: string) {
        this.image = image;
    }

    static toGenreModel(genre: any): Genre {
        return new Genre(genre.id, genre.name, genre.image);
    }
}

export interface GenreInputDTO {
    name: string,
    image: string
}

export interface GenreInpuGetByNameDTO {
    name: string
}