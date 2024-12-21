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
exports.trackerController = void 0;
const tracker_1 = require("../services/tracker");
const globalErrorHandler_1 = require("../globalErrorHandler");
class TrackerController {
    constructor() {
        this.fetchTracker = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.userId;
            const username = req.username;
            const response = yield (0, tracker_1.getTracker)(username + "", id + "");
            if (!response.success) {
                next(new globalErrorHandler_1.CustomError(response.error, 400));
                return;
            }
            res.status(200).json({ success: true, data: response.data });
        });
        this.createColumn = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, tracker_1.createColumn)(req.username + "", req.body);
            if (!response.success) {
                next(new globalErrorHandler_1.CustomError(response.error, 400));
                return;
            }
            res.status(200).json({ success: true, data: response.data });
        });
        this.updateColumnTitle = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, tracker_1.patchColumnTitle)(req.params.columnId, req.body);
            if (!response.success) {
                next(new globalErrorHandler_1.CustomError(response.error, 400));
                return;
            }
            res.status(200).json({ success: true, data: response.data });
        });
        this.removeColumn = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, tracker_1.deleteColumn)(req.params.columnId);
            if (!response.success) {
                next(new globalErrorHandler_1.CustomError(response.error, 400));
                return;
            }
            res.status(200).json({ success: true, data: response.data });
        });
        this.createJob = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, tracker_1.createJob)(req.params.columnId, req.body);
            if (!response.success) {
                next(new globalErrorHandler_1.CustomError(response.error, 400));
                return;
            }
            res.status(200).json({ success: true, data: response.data });
        });
        this.removeJob = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, tracker_1.deleteJob)(req.params.columnId, req.params.jobId);
            if (!response.success) {
                next(new globalErrorHandler_1.CustomError(response.error, 400));
                return;
            }
            res.status(200).json({ success: true, data: response.data });
        });
        this.swapTrackerColumn = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, tracker_1.swapColumn)(req.body.columnId1, req.body.columnId2, req.body.newIdx1, req.body.newIdx2);
            if (!response.success) {
                next(new globalErrorHandler_1.CustomError(response.error, 400));
                return;
            }
            res.status(200).json({ success: true, data: response.data });
        });
        this.swapSameColumn = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, tracker_1.swapSameColumn)(req.params.columnId, req.body.jobId1, req.body.jobId2);
            if (!response.success) {
                next(new globalErrorHandler_1.CustomError(response.error, 400));
                return;
            }
            res.status(200).json({ success: true, data: response.data });
        });
        this.swapDifferentColumn = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, tracker_1.swapDifferentColumn)(req.body.columnId1, req.body.columnId2, req.params.jobId, req.body.newIdx);
            if (!response.success) {
                next(new globalErrorHandler_1.CustomError(response.error, 400));
                return;
            }
            res.status(200).json({ success: true, data: response.data });
        });
    }
}
exports.trackerController = new TrackerController();
