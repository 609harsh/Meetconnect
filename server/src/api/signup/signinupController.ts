import { Request, RequestHandler, Response } from "express";
import { signupService } from "./signupService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class SignupController {
  public createUser: RequestHandler = async (req: Request, res: Response) => {
    const data = req.body();
    console.log(data);
    // const response = await signupService.createUser(data);
    // return handleServiceResponse(response, res);
  };
}

export const signupController = new SignupController();
