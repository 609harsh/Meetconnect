import { Router } from "express";
import { resourcesController } from "../controllers/resources";
const router: Router = Router();

router.get("/resources", resourcesController.getResources);
router.post("/resources", resourcesController.createResources);

export default router;
