"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_1 = require("../controllers/profile");
const authorizationMiddleware_1 = require("../authorizationMiddleware");
const profile = (0, express_1.Router)();
// Public Route
profile.get("/profile/:username", profile_1.profileController.getProfile);
profile.get("/address/:username", profile_1.profileController.getAddress);
profile.get("/education/:username", profile_1.profileController.getEducation);
profile.get("/skills/:username", profile_1.profileController.getSkills);
profile.get("/workexperience/:username", profile_1.profileController.getWorkExperience);
//Protected Route
profile.patch("/image", authorizationMiddleware_1.authorization, profile_1.profileController.updateProfileImage);
profile.patch("/profile", authorizationMiddleware_1.authorization, profile_1.profileController.updateProfile);
profile.patch("/address", authorizationMiddleware_1.authorization, profile_1.profileController.updateAddress);
profile.patch("/education", authorizationMiddleware_1.authorization, profile_1.profileController.updateEducation);
profile.patch("/skills", authorizationMiddleware_1.authorization, profile_1.profileController.updateSkills);
profile.patch("/workexperience", authorizationMiddleware_1.authorization, profile_1.profileController.updateWorkExperience);
profile.delete("/education/:id", authorizationMiddleware_1.authorization, profile_1.profileController.removeEducation);
profile.delete("/workexperience/:id", authorizationMiddleware_1.authorization, profile_1.profileController.removeWorkExperience);
exports.default = profile;
