import { NextFunction, Request, Response } from "express";
import { createUser, userLogin } from "../services/auth";
import { CustomError } from "../globalErrorHandler";

class AuthController {
  public signup = async (req: Request, res: Response, next: NextFunction) => {
    const response = await createUser(req.body);
    if (response.success) {
      res.json({ success: true, data: response.data });
      return;
    }
    next(new CustomError(response.error as string, 400));
  };
  public login = async (req: Request, res: Response, next: NextFunction) => {
    const response = await userLogin(req.body);
    if (response.success) {
      res.json({ success: true, data: response.data });
      return;
    }
    next(new CustomError(response.error as string, 400));
  };
}

export const authController = new AuthController();
