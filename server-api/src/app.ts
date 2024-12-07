import express, { Express, Request, Response } from "express";
import resources from "./routes/resources";
import cors from "cors";
import authRouter from "./routes/auth";
import schedule from "./routes/schedule";
const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(schedule);
app.use(resources);

export default app;
