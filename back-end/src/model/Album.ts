export class Album {
    constructor(
        private id: string,
        private id_artist: string,
        private name: string,
        private published: boolean,
        private genre: string,
        private releasedIn: Date
    ) {}

    getId() {
        return this.id;
    }

    getId_artist() {
        return this.id_artist
    }

    getName() {
        return this.name;
    }

    getPublished() {
        return this.published;
    }

    getGenre() {
        return this.genre;
    }

    getReleasedIn() {
        return this.releasedIn;
    }

    setId(id: string) {
        this.id = id;
    }

    setId_artist(id_artist: string) {
        this.id_artist = id_artist;
    }

    setName(name: string) {
        this.name = name;
    }

    setPublished(published: boolean) {
        this.published = published;
    }

    setGenre(genre: string) {
        this.genre = genre;
    }

    setReleasedIn(releasedIn: Date) {
        this.releasedIn = releasedIn;
    }

    static toAlbumModel(album: any): Album {
        return new Album(album.id, album.id_artist, album.name, album.published, album.genre, album.releasedIn);
    }
}

export interface AlbumInputDTO {
    id_artist: string,
    name: string,
    published: boolean,
    genre: string,
    releasedIn: Date
}