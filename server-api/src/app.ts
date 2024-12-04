import express, { Express, Request, Response } from "express";
import router from "./routes/routes";
const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

export default app;
