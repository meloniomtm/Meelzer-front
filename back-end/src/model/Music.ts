export class Music{
    constructor(
    private   id: string,
    private name: string,
    private releasedIn: string,
    private id_album: string|null|undefined,
    private id_artist: string,
    private name_artist: string,
    private published: boolean
    ){}

    getId(){
        return this.id;
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

    getId_artist(){
        return this.id_artist;
    }    
    
    getName_artist(){
        return this.name_artist;
    }

    getPublished(){
        return this.published;
    }

    setId(id: string){
        this.id = id;
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
        return new Music(music.id, music.name, music.releasedIn, music.id_album, music.id_artist, music.name_artist, music.published);
      }
}

export interface MusicInputDTO{
    name: string,
    releasedIn: Date,
    id_album: string|null|undefined,
    id_artist: string,
    name_artist: string
}

export interface NameInputDTO{
    name: string
}