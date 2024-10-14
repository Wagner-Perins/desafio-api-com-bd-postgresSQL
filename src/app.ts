import dotenv from "dotenv";
import express, { Application } from "express";
import rota from "./routes";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(rota);

export default app;
