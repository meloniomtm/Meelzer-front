export class Music{
    constructor(
    private   id: string,
    private author: string,
    private name: string,
    private releasedIn: string,
    private id_album: string|null|undefined,
    private published: boolean
    ){}

    getId(){
        return this.id;
    }

    getAuthor(){
        return this.author
    }

    getName(){
        return this.name;
    }

    getReleasedIn(){
        return this.releasedIn;
    }

    getId_album(){
        return this.id_album;
    }

    getPublished(){
        return this.published;
    }

    setId(id: string){
        this.id = id;
    }

    setAuthor(author: string){
        this.author = author;
    }

    setName(name: string){
        this.name = name;
    }

    setReleasedIn(releasedIn: string){
        this.releasedIn = releasedIn;
    }

    setId_album(id_album: string){
        this.id_album = id_album;
    }

    setPublished(published: boolean){
        this.published = published;
    }

    static toMusicModel(music: any): Music {
        return new Music(music.id, music.author, music.name, music.releasedIn, music.id_album, music.published);
      }
}

export interface MusicInputDTO{
    author: string,
    name: string,
    id_album: string|null|undefined
}

export interface NameInputDTO{
    name: string
}