import { Router } from "express";
import { scheduleInterviews } from "../controllers/schedule";
const schdeule: Router = Router();

schdeule.post("/schedule", scheduleInterviews.postInterviews);

export default schdeule;
