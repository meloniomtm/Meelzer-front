import express from "express";
import { SearchController } from "../controller/SearchController";


export const searchRouter = express.Router();

const searchController = new SearchController();

searchRouter.get("/", searchController.getAll);
