import { Router } from "express";
import { profileController } from "../controllers/profile";
const profile: Router = Router();

profile.get("/profile/:username", profileController.getProfile);
profile.patch("/profile/:username", profileController.updateProfile);
profile.get("/address/:username", profileController.getAddress);
profile.patch("/address/:username", profileController.updateAddress);
profile.get("/education/:username", profileController.getEducation);
profile.patch("/education/:username/:id?", profileController.updateEducation);
profile.get("/skills/:username", profileController.getSkills);
profile.patch("/skills/:username", profileController.updateSkills);

export default profile;
