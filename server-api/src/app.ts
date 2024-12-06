import express, { Express, Request, Response } from "express";
import router from "./routes/routes";
import cors from "cors";
import authRouter from "./routes/auth";
const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(router);

export default app;
