import express, { Express, Request, Response } from "express";
import router from "./routes/routes";
import cors from "cors";
const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(router);

export default app;
