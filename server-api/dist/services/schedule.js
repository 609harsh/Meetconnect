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
exports.createInterviews = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createInterviews = (interviewData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (data.title)
        const interview = yield prisma.interview.create({
            data: Object.assign(Object.assign({}, interviewData), { userId }),
        });
        return { success: true, data: interview };
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            return { success: false, error: `Prisma error1: ${err.meta}` };
        }
        else if (err instanceof client_1.Prisma.PrismaClientValidationError) {
            return { success: false, error: `Prisma error: Some Fields are missing` };
        }
        else if (err instanceof Error) {
            return { success: false, error: err.message };
        }
        return { success: false, error: "An unknown error occurred" };
    }
});
exports.createInterviews = createInterviews;
