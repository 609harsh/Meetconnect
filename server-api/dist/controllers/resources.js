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
exports.resourcesController = void 0;
const resources_1 = require("../services/resources");
const globalErrorHandler_1 = require("../globalErrorHandler");
class Resources {
    constructor() {
        this.getResources = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, resources_1.fetchResources)();
            if (!response.success) {
                next(new globalErrorHandler_1.CustomError(response.error, 400));
                return;
            }
            res.status(200).json({ success: true, data: response.data });
        });
        this.createResources = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, resources_1.createResource)(req.body.label, req.body.easy, req.body.medium, req.body.hard);
            res.status(200).json({ success: true, data });
        });
    }
}
exports.resourcesController = new Resources();
