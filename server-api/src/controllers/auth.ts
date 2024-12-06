import { Request, Response } from "express";
import { createUser, userLogin } from "../services/auth";

class AuthController {
  public signup = async (req: Request, res: Response) => {
    const user = await createUser(req.body);
    res.json({ sucess: true, data: user });
  };
  public login = async (req: Request, res: Response) => {
    const login = await userLogin(req.body);
    res.json({ sucess: true, data: login });
  };
}

export const authController = new AuthController();
