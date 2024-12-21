"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.status = statusCode;
    }
}
exports.CustomError = CustomError;
const globalErrorHandler = (err, req, res, next) => {
    console.log(err.status);
    console.log(err.message);
    res.status(err.status).json({ success: false, error: err.message });
};
exports.globalErrorHandler = globalErrorHandler;
