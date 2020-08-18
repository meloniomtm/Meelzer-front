import { ArtistInputDTO, LoginInputDTO, Artist } from "../model/Artist";
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

    async getArtistByEmailNickname(artist: LoginInputDTO) {
        const artistDatabase = new ArtistDatabase();
        const artistFromDB = await artistDatabase.getArtistByEmailNickname(artist.email_Nickname);

        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(artist.password, artistFromDB.getPassword());

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id: artistFromDB.getId() });
        console.log("ArtistBusiness chegou linha 36")
        if (!hashCompare) {
            console.log("ERROR ArtistBusiness linha 38")
            throw new Error("Invalid Password!");
        }

        return accessToken;
    }
}