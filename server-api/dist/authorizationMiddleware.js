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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const globalErrorHandler_1 = require("./globalErrorHandler");
const prisma = new client_1.PrismaClient();
const authorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //1.) if token is not present
    const tokenDetails = req.headers.authorization;
    if (!tokenDetails || !tokenDetails.startsWith("Bearer")) {
        res.status(401).json({ success: false, message: "Token does not exist" });
        return;
    }
    //2.) validate token
    const token = (tokenDetails === null || tokenDetails === void 0 ? void 0 : tokenDetails.split(" ")[1]) + "";
    let result;
    try {
        result = jsonwebtoken_1.default.verify(token, "23456789");
        //3.) validate user
        const user = yield prisma.user.findFirst({
            where: {
                id: result.id,
            },
        });
        if (!user) {
            throw Error("User does not Exist");
        }
        req.userId = user === null || user === void 0 ? void 0 : user.id;
        req.username = user === null || user === void 0 ? void 0 : user.username;
        next();
    }
    catch (error) {
        const err = error;
        console.log(err.message);
        next(new globalErrorHandler_1.CustomError(err.message + "", 401));
        // res.status(401).json({ success: false, error: err.message });
        return;
    }
    //4.)
    //
});
exports.authorization = authorization;
