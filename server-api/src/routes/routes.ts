import { Router } from "express";
import { createResources, getResources } from "../controllers/resources";
const router: Router = Router();

router.get("/resources", getResources);
router.post("/resources", createResources);

export default router;
