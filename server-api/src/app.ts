import express, { Express } from "express";
import resources from "./routes/resources";
import cors from "cors";
import authRouter from "./routes/auth";
import schedule from "./routes/schedule";
import interviews from "./routes/interviews";
import profile from "./routes/profile";
import { CustomError, globalErrorHandler } from "./globalErrorHandler";
import tracker from "./routes/tracker";
import dotnev from "dotenv";

dotnev.config();
const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send(`
  <div style="display:flex; flex-direction:column; align-items:center;">
  <h1>Welcome to Jobsy API</h1>
  <h3>Check Out the <a href=${process.env.DOCUMENTATION_URL}>API Docs</a></h3>
</div>
`);
});
app.use(authRouter);
app.use(schedule);
app.use(interviews);
app.use(tracker);
app.use(resources);
app.use(profile);

app.all("*", (req, res, next) => {
  next(new CustomError("Invalid URL", 404));
});

app.use(globalErrorHandler);
export default app;
