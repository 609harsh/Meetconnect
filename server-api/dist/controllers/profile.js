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
exports.profileController = void 0;
const profile_1 = require("../services/profile");
const globalErrorHandler_1 = require("../globalErrorHandler");
class Profile {
    constructor() {
        this.updateProfileImage = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.username) {
                next(new globalErrorHandler_1.CustomError("UserName Does not exist", 400));
                return;
            }
            const response = yield (0, profile_1.updateProfileImage)(req.username, req.query.url);
            if (!response.success) {
                next(new globalErrorHandler_1.CustomError(response.error, 400));
                return;
            }
            res.json({ success: true, data: response.data });
        });
        this.getProfile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.params.username) {
                next(new globalErrorHandler_1.CustomError("UserName Does not exist", 400));
                return;
            }
            const response = yield (0, profile_1.getProfile)(req.params.username);
            if (!response.success) {
                next(new globalErrorHandler_1.CustomError(response.error, 400));
                return;
            }
            res.json({ success: true, data: response.data });
        });
        this.updateProfile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.username) {
                res.status(400).json({ error: "UserName Does not exist" });
                return;
            }
            const response = yield (0, profile_1.patchProfile)(req.username, req.body);
            if (!response.success) {
                next(new globalErrorHandler_1.CustomError(response.error, 400));
                return;
            }
            res.json({ success: true, data: response.data });
        });
        this.getAddress = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.params.username) {
                next(new globalErrorHandler_1.CustomError("UserName Does not exist", 400));
                return;
            }
            const response = yield (0, profile_1.getAddress)(req.params.sername);
            if (!response.success) {
                next(new globalErrorHandler_1.CustomError(response.error, 400));
                return;
            }
            res.json({ success: true, data: response.data });
        });
        this.updateAddress = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.username) {
                res.status(400).json({ error: "UserName Does not exist" });
                return;
            }
            const response = yield (0, profile_1.patchAddress)(req.username, req.body);
            if (!response.success) {
                next(new globalErrorHandler_1.CustomError(response.error, 400));
                return;
            }
            res.json({ success: true, data: response.data });
        });
        this.getEducation = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.params.username) {
                next(new globalErrorHandler_1.CustomError("UserName Does not exist", 400));
                return;
            }
            const response = yield (0, profile_1.getEducation)(req.params.username);
            if (!response.success) {
                next(new globalErrorHandler_1.CustomError(response.error, 400));
                return;
            }
            res.json({ success: true, data: response.data });
        });
        this.updateEducation = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.username) {
                res.status(400).json({ error: "UserName Does not exist" });
                return;
            }
            const response = yield (0, profile_1.patchEducation)(req.username, req.query.id, req.body);
            if (!response.success) {
                next(new globalErrorHandler_1.CustomError(response.error, 400));
                return;
            }
            res.json({ success: true, data: response.data });
        });
        this.getSkills = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.params.username) {
                next(new globalErrorHandler_1.CustomError("UserName Does not exist", 400));
                return;
            }
            const response = yield (0, profile_1.getSkills)(req.params.username);
            if (!response.success) {
                next(new globalErrorHandler_1.CustomError(response.error, 400));
                return;
            }
            res.json({ success: true, data: response.data });
        });
        this.updateSkills = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.username) {
                res.status(400).json({ error: "UserName Does not exist" });
                return;
            }
            const response = yield (0, profile_1.patchSkills)(req.username, req.body);
            if (!response.success) {
                next(new globalErrorHandler_1.CustomError(response.error, 400));
                return;
            }
            res.json({ success: true, data: response.data });
        });
        this.getWorkExperience = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.params.username) {
                next(new globalErrorHandler_1.CustomError("UserName Does not exist", 400));
                return;
            }
            const response = yield (0, profile_1.getWorkExperience)(req.params.username);
            if (!response.success) {
                next(new globalErrorHandler_1.CustomError(response.error, 400));
                return;
            }
            res.json({ success: true, data: response.data });
        });
        this.updateWorkExperience = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.username) {
                res.status(400).json({ error: "UserName Does not exist" });
                return;
            }
            const response = yield (0, profile_1.patchWorkExperience)(req.username, req.query.id, req.body);
            if (!response.success) {
                next(new globalErrorHandler_1.CustomError(response.error, 400));
                return;
            }
            res.json({ success: true, data: response.data });
        });
        this.removeEducation = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.username) {
                next(new globalErrorHandler_1.CustomError("Username does not exist", 400));
                return;
            }
            const response = yield (0, profile_1.deleteEducation)(req.username, req.params.id);
            if (!response.success) {
                next(new globalErrorHandler_1.CustomError(response.error, 400));
                return;
            }
            res.json({ success: true, data: response.data });
        });
        this.removeWorkExperience = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.username) {
                next(new globalErrorHandler_1.CustomError("Username does not exist", 400));
                return;
            }
            const response = yield (0, profile_1.deleteWorkExperience)(req.username, req.params.id);
            if (!response.success) {
                next(new globalErrorHandler_1.CustomError(response.error, 400));
                return;
            }
            res.json({ success: true, data: response.data });
        });
    }
}
exports.profileController = new Profile();
