import { Router } from "express";
import { profileController } from "../controllers/profile";
const profile: Router = Router();

profile.get("/profile/:username", profileController.getProfile);
profile.patch("/profile/:username", profileController.updateProfile);
profile.get("/address/:username", profileController.getAddress);
profile.patch("/address/:username", profileController.updateAddress);

export default profile;
