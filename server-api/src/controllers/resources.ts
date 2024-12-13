import { NextFunction, Request, Response } from "express";
import { createResource, fetchResources } from "../services/resources";
import { CustomError } from "../globalErrorHandler";

class Resources {
  public getResources = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await fetchResources();
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
    }
    res.status(200).json({ success: true, data: response.data });
  };
  public createResources = async (req: Request, res: Response) => {
    const data = await createResource(
      req.body.label,
      req.body.easy,
      req.body.medium,
      req.body.hard
    );
    res.status(200).json({ success: true, data });
  };
}
export const resourcesController = new Resources();
