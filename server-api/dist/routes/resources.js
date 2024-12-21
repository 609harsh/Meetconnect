"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resources_1 = require("../controllers/resources");
const router = (0, express_1.Router)();
router.get("/resources", resources_1.resourcesController.getResources);
router.post("/resources", resources_1.resourcesController.createResources);
exports.default = router;
