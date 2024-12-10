import { Router } from "express";
import { interviewController } from "../controllers/interviews";
import { profileController } from "../controllers/profile";
const profile: Router = Router();

profile.get("/profile/:username", profileController.getProfile);
profile.patch("/profile/:username", profileController.updateProfile);

export default profile;
