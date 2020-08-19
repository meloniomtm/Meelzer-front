import { ArtistInputDTO, Artist } from "../model/Artist";
import { ArtistDatabase } from "../data/ArtistDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { Console } from "console";

export class ArtistBusiness {

    async createArtist(artist: ArtistInputDTO) {

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(artist.password);

        const artistDatabase = new ArtistDatabase();
        await artistDatabase.createArtist(id,  artist.name, artist.nickname, artist.email, hashPassword);

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id });

        return accessToken;
    }


}