"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schedule_1 = require("../controllers/schedule");
const authorizationMiddleware_1 = require("../authorizationMiddleware");
const schdeule = (0, express_1.Router)();
schdeule.post("/schedule", authorizationMiddleware_1.authorization, schedule_1.scheduleController.postInterviews);
exports.default = schdeule;
