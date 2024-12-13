import { Router } from "express";
import { profileController } from "../controllers/profile";
const profile: Router = Router();

// Public Route
profile.get("/profile/:username", profileController.getProfile);
profile.get("/address/:username", profileController.getAddress);
profile.get("/education/:username", profileController.getEducation);
profile.get("/skills/:username", profileController.getSkills);
profile.get("/workexperience/:username", profileController.getWorkExperience);

//Protected Route
profile.patch("/image/:username", profileController.updateProfileImage);
profile.patch("/profile/:username", profileController.updateProfile);
profile.patch("/address/:username", profileController.updateAddress);
profile.patch("/education/:username", profileController.updateEducation);
profile.patch("/skills/:username", profileController.updateSkills);
profile.patch(
  "/workexperience/:username",
  profileController.updateWorkExperience
);

export default profile;
