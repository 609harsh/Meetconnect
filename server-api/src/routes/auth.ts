import { Router } from "express";
import { createResources, getResources } from "../controllers/resources";
import { authController } from "../controllers/auth";
const authRouter: Router = Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);

export default authRouter;
