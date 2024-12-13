import { Router } from "express";
import { scheduleController } from "../controllers/schedule";
import { authorization } from "../authorizationMiddleware";
const schdeule: Router = Router();

schdeule.post("/schedule", authorization, scheduleController.postInterviews);

export default schdeule;
