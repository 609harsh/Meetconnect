import { NextFunction, Request, Response } from "express";
import { deleteInterview, getInterviews } from "../services/interviews";
import { CustomRequest } from "../authorizationMiddleware";
import { CustomError } from "../globalErrorHandler";

class Interviews {
  public fetchInterviews = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.userId + "";
    const response = await getInterviews(id);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
      return;
    }
    res.json({ success: true, data: response.data });
  };
  public deleteInterviews = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    const response = await deleteInterview(id);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
      return;
    }
    res.json({ success: true, data: response.data });
  };
}

export const interviewController = new Interviews();
