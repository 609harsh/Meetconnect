import { Router } from "express";
import { interviewController } from "../controllers/interviews";
const interviews: Router = Router();

interviews.get("/interviews", interviewController.fetchInterviews);
interviews.delete("/interviews/:id", interviewController.deleteInterviews);

export default interviews;
