"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resources_1 = __importDefault(require("./routes/resources"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const schedule_1 = __importDefault(require("./routes/schedule"));
const interviews_1 = __importDefault(require("./routes/interviews"));
const profile_1 = __importDefault(require("./routes/profile"));
const globalErrorHandler_1 = require("./globalErrorHandler");
const tracker_1 = __importDefault(require("./routes/tracker"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(auth_1.default);
app.use(schedule_1.default);
app.use(interviews_1.default);
app.use(tracker_1.default);
app.use(resources_1.default);
app.use(profile_1.default);
app.all("*", (req, res, next) => {
    next(new globalErrorHandler_1.CustomError("Invalid URL", 404));
});
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
