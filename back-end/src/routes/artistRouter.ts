import express from "express";
import { ArtistController } from "../controller/ArtistController";


export const artistRouter = express.Router();

const artistController = new ArtistController();

artistRouter.post("/signup", artistController.signup);
artistRouter.put("/approve/:id", artistController.putApproveArtist);
artistRouter.get("/getAllArtists", artistController.getAllArtists);
