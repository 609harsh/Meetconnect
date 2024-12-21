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
exports.userLogin = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!data.google)
        data.password = yield bcryptjs_1.default.hash(data.password, 10);
    try {
        const findUser = yield prisma.user.findFirst({
            where: {
                email: data.email,
                phoneNumber: data === null || data === void 0 ? void 0 : data.phoneNumber,
            },
        });
        if (findUser)
            throw new Error("User Already Exist");
        const user = yield prisma.user.create({
            data: {
                name: data.name,
                email: (data.email + "").toLowerCase(),
                password: data === null || data === void 0 ? void 0 : data.password,
                phoneNumber: data === null || data === void 0 ? void 0 : data.phoneNumber,
                username: data.email.split("@")[0] + "_" + ((Math.random() * 10000) | 0),
            },
        });
        const token = jsonwebtoken_1.default.sign({
            name: user.name,
            email: user.email,
            id: user.id,
            username: user.username,
        }, process.env.TOKEN_SECRET + "", {
            expiresIn: process.env.TOKEN_VALIDITY + "",
        });
        return { success: true, data: token };
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            return { success: false, error: `Db error: ${(_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target}` };
        }
        else if (err instanceof client_1.Prisma.PrismaClientValidationError) {
            return { success: false, error: `DB Error: ${err.message}` };
        }
        else if (err instanceof Error) {
            return { success: false, error: err.message };
        }
        return { success: false, error: "An unknown error occurred" };
    }
});
exports.createUser = createUser;
const userLogin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield prisma.user.findUnique({
            where: {
                email: (data.email + "").toLowerCase(),
            },
        });
        if (!user)
            throw new Error("User email/password does not match");
        if (!data.google) {
            const hash = yield bcryptjs_1.default.compare(data === null || data === void 0 ? void 0 : data.password, (user === null || user === void 0 ? void 0 : user.password) + "");
            if (!hash) {
                throw new Error("User email/password does not match");
            }
        }
        const token = jsonwebtoken_1.default.sign({
            name: user === null || user === void 0 ? void 0 : user.name,
            email: user === null || user === void 0 ? void 0 : user.email,
            id: user === null || user === void 0 ? void 0 : user.id,
            username: user === null || user === void 0 ? void 0 : user.username,
        }, process.env.TOKEN_SECRET + "", {
            expiresIn: process.env.TOKEN_VALIDITY + "",
        });
        return { success: true, data: token };
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            return { success: false, error: `Prisma error: ${(_a = err.meta) === null || _a === void 0 ? void 0 : _a.target}` };
        }
        else if (err instanceof client_1.Prisma.PrismaClientValidationError) {
            return { success: false, error: `Prisma error: ${err.message}` };
        }
        else if (err instanceof Error) {
            return { success: false, error: err.message };
        }
        return { success: false, error: "An unknown error occurred" };
    }
});
exports.userLogin = userLogin;
