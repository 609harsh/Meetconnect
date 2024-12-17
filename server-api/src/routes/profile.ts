import { Router } from "express";
import { profileController } from "../controllers/profile";
import { authorization } from "../authorizationMiddleware";
const profile: Router = Router();

// Public Route
profile.get("/profile/:username", profileController.getProfile);
profile.get("/address/:username", profileController.getAddress);
profile.get("/education/:username", profileController.getEducation);
profile.get("/skills/:username", profileController.getSkills);
profile.get("/workexperience/:username", profileController.getWorkExperience);

//Protected Route
profile.patch("/image", authorization, profileController.updateProfileImage);
profile.patch("/profile", authorization, profileController.updateProfile);
profile.patch("/address", authorization, profileController.updateAddress);
profile.patch("/education", authorization, profileController.updateEducation);
profile.patch("/skills", authorization, profileController.updateSkills);
profile.patch(
  "/workexperience",
  authorization,
  profileController.updateWorkExperience
);

profile.delete(
  "/education/:id",
  authorization,
  profileController.removeEducation
);
profile.delete(
  "/workexperience/:id",
  authorization,
  profileController.removeWorkExperience
);

export default profile;
