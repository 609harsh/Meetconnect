"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleController = void 0;
const schedule_1 = require("../services/schedule");
const globalErrorHandler_1 = require("../globalErrorHandler");
class ScheduleInterviews {
    constructor() {
        this.postInterviews = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const userId = req.userId + "";
            const response = yield (0, schedule_1.createInterviews)(data, userId);
            if (response.success) {
                res.status(200).json(response);
                return;
            }
            next(new globalErrorHandler_1.CustomError(response.error, 400));
        });
    }
}
exports.scheduleController = new ScheduleInterviews();
