import { Router } from "express";
import { interviewController } from "../controllers/interviews";
import { authorization } from "../authorizationMiddleware";
const interviews: Router = Router();

interviews.get(
  "/interviews",
  authorization,
  interviewController.fetchInterviews
);
interviews.delete(
  "/interviews/:id",
  authorization,
  interviewController.deleteInterviews
);

export default interviews;
