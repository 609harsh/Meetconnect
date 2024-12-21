"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const interviews_1 = require("../controllers/interviews");
const authorizationMiddleware_1 = require("../authorizationMiddleware");
const interviews = (0, express_1.Router)();
interviews.get("/interviews", authorizationMiddleware_1.authorization, interviews_1.interviewController.fetchInterviews);
interviews.delete("/interviews/:id", authorizationMiddleware_1.authorization, interviews_1.interviewController.deleteInterviews);
exports.default = interviews;
