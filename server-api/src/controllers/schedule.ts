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
    if (userId.length < 12) {
      res.json({ success: false, error: "User is not Valid" });
    }
    const response = await createInterviews(data, userId);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
    }
    res.status(200).json(response);
  };
}

export const scheduleController = new ScheduleInterviews();
