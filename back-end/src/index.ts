import dotenv from "dotenv";
import {AddressInfo} from "net";
import express from "express";
import cors from "cors"
import { userRouter } from "./routes/userRouter";
import { musicRouter } from "./routes/musicRouter";
import { albumRouter } from "./routes/albumRouter";
import { artistRouter } from "./routes/artistRouter";
import { loginRouter } from "./routes/loginRouter";
import { genreRouter } from "./routes/genreRouter";

dotenv.config();
export const app = express();
app.use(cors({ origin: true}))
app.use(express.json());

app.use("/user", userRouter);
app.use("/artist", artistRouter);
app.use("/music", musicRouter);
app.use("/album", albumRouter);
app.use("/login", loginRouter);
app.use("/genre", genreRouter);
