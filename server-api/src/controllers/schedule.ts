import { NextFunction, Response } from "express";
import { createInterviews } from "../services/schedule";
import { CustomRequest } from "../authorizationMiddleware";
import { CustomError } from "../globalErrorHandler";

class ScheduleInterviews {
  public postInterviews = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    const data = req.body;
    const userId = req.userId + "";
    const response = await createInterviews(data, userId);
    if (response.success) {
      res.status(200).json(response);
      return;
    }
    next(new CustomError(response.error as string, 400));
  };
}

export const scheduleController = new ScheduleInterviews();
