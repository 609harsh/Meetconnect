import { NextFunction, Request, Response } from "express";
import { createUser, userLogin } from "../services/auth";
import { CustomError } from "../globalErrorHandler";

class AuthController {
  public signup = async (req: Request, res: Response, next: NextFunction) => {
    const response = await createUser(req.body);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
    }
    res.json({ success: true, data: response.data });
  };
  public login = async (req: Request, res: Response, next: NextFunction) => {
    const response = await userLogin(req.body);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
    }
    res.json({ success: true, data: response.data });
  };
}

export const authController = new AuthController();
