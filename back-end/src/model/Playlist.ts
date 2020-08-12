export class Genre {
    constructor(
        private id: string,
        private id_user: string,
        private name: string,
        private id_music: string,
        private status: Status
    ) {}

    getId() {
        return this.id;
    }

    getid_user() {
        return this.id_user
    }

    getname() {
        return this.name;
    }

    getid_music() {
        return this.id_music;
    }

    getstatus() {
        return this.status;
    }

    setId(id: string) {
        this.id = id;
    }

    setid_user(id_user: string) {
        this.id_user = id_user;
    }

    setname(name: string) {
        this.name = name;
    }

    setid_music(id_music: string) {
        this.id_music = id_music;
    }

    setstatus(status: Status) {
        this.status = status;
    }

    static stringToStatus(input: string): Status {
        switch (input) {
            case "PUBLIC":
                return Status.PUBLIC;
            case "PRIVATE":
                return Status.PRIVATE;
            case "COLLABORATIVE":
                return Status.COLLABORATIVE;
            default:
                throw new Error("Invalid status");
        }
    }

    static toGenreModel(genre: any): Genre {
        return new Genre(genre.id, genre.id_user, genre.name, genre.id_music, genre.status);
    }
}

export interface GenreInputDTO {
    id_user: string,
    name: string,
    id_music: boolean,
    status: string
}

export enum Status {
    PUBLIC = "public",
    PRIVATE = "private",
    COLLABORATIVE = "collaborative"
}