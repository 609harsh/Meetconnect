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
exports.authController = void 0;
const auth_1 = require("../services/auth");
const globalErrorHandler_1 = require("../globalErrorHandler");
class AuthController {
    constructor() {
        this.signup = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, auth_1.createUser)(req.body);
            if (response.success) {
                res.json({ success: true, data: response.data });
                return;
            }
            next(new globalErrorHandler_1.CustomError(response.error, 400));
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, auth_1.userLogin)(req.body);
            if (response.success) {
                res.json({ success: true, data: response.data });
                return;
            }
            next(new globalErrorHandler_1.CustomError(response.error, 400));
        });
    }
}
exports.authController = new AuthController();
