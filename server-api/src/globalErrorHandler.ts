import { NextFunction, Request, Response } from "express";

export class CustomError extends Error {
  public status: number;
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.status = statusCode;
  }
}

export const globalErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.status);
  console.log(err.message);
  res.status(err.status).json({ success: false, error: err.message });
};
