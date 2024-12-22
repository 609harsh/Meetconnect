import { NextFunction, Response } from "express";
import { CustomRequest } from "../authorizationMiddleware";
import {
  createColumn,
  createJob,
  deleteColumn,
  deleteJob,
  getTracker,
  patchColumnTitle,
  swapColumn,
  swapDifferentColumn,
  swapSameColumn,
} from "../services/tracker";
import { CustomError } from "../globalErrorHandler";
import { patchEducation } from "../services/profile";

class TrackerController {
  public fetchTracker = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.userId;
    const username = req.username;

    const response = await getTracker(username + "", id + "");
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
      return;
    }
    res.status(200).json({ success: true, data: response.data });
  };
  public createColumn = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    const response = await createColumn(req.username + "", req.body);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
      return;
    }
    res.status(200).json({ success: true, data: response.data });
  };
  public updateColumnTitle = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    const response = await patchColumnTitle(req.params.columnId, req.body);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
      return;
    }
    res.status(200).json({ success: true, data: response.data });
  };

  public removeColumn = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    const response = await deleteColumn(req.params.columnId);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
      return;
    }
    res.status(200).json({ success: true, data: response.data });
  };

  public createJob = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    const response = await createJob(req.params.columnId, req.body);

    if (!response.success) {
      next(new CustomError(response.error as string, 400));
      return;
    }
    res.status(200).json({ success: true, data: response.data });
  };
  public removeJob = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    const response = await deleteJob(req.params.columnId, req.params.jobId);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
      return;
    }
    res.status(200).json({ success: true, data: response.data });
  };

  public swapTrackerColumn = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    const response = await swapColumn(
      req.body.columnId1,
      req.body.columnId2,
      req.body.newIdx1,
      req.body.newIdx2
    );
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
      return;
    }
    res.status(200).json({ success: true, data: response.data });
  };

  public swapSameColumn = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    const response = await swapSameColumn(
      req.params.columnId,
      req.body.jobId1,
      req.body.jobId2
    );
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
      return;
    }
    res.status(200).json({ success: true, data: response.data });
  };

  public swapDifferentColumn = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    const response = await swapDifferentColumn(
      req.body.columnId1,
      req.body.columnId2,
      req.params.jobId
    );
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
      return;
    }
    res.status(200).json({ success: true, data: response.data });
  };
}

export const trackerController = new TrackerController();
