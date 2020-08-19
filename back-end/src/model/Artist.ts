export class Artist {
    constructor(
        private id: string,
        private name: string,
        private nickname: string,
        private email: string,
        private password: string,
    ) { }

    getId() {
        return this.id;
    }

    getName() {
        return this.name
    }

    getNickname() {
        return this.nickname
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    setId(id: string) {
        this.id = id;
    }

    setName(name: string) {
        this.name = name;
    }


    setNickname(nickname: string) {
        this.nickname = nickname;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setPassword(password: string) {
        this.password = password;
    }

    static toArtistModel(artist: any): Artist {
        return new Artist(artist.id, artist.name, artist.nickname, artist.email, artist.password);
    }


}

export interface ArtistInputDTO {
    name: string;
    nickname: string;
    email: string;
    password: string;
}