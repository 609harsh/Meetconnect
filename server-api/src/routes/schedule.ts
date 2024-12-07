import { Router } from "express";
import { scheduleController } from "../controllers/schedule";
const schdeule: Router = Router();

schdeule.post("/schedule", scheduleController.postInterviews);

export default schdeule;
