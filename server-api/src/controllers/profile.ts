import { NextFunction, Request, Response } from "express";
import {
  getAddress,
  getEducation,
  getProfile,
  getSkills,
  getWorkExperience,
  patchAddress,
  patchEducation,
  patchProfile,
  patchSkills,
  patchWorkExperience,
  updateProfileImage,
} from "../services/profile";
import { CustomRequest } from "../authorizationMiddleware";
import { CustomError } from "../globalErrorHandler";

class Profile {
  public updateProfileImage = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.username) {
      res.status(401).json({ error: "UserName Does not exist" });
      return;
    }
    const response = await updateProfileImage(
      req.username,
      req.query.url as string
    );
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
    }
    res.json({ success: true, data: response.data });
  };
  public getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await getProfile(req.params.username);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
    }
    res.json({ success: true, data: response.data });
  };
  public updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await patchProfile(req.params.username, req.body);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
    }
    res.json({ success: true, data: response.data });
  };
  public getAddress = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await getAddress(req.params.username);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
    }
    res.json({ success: true, data: response.data });
  };
  public updateAddress = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await patchAddress(req.params.username, req.body);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
    }
    res.json({ success: true, data: response.data });
  };
  public getEducation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await getEducation(req.params.username);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
    }
    res.json({ success: true, data: response.data });
  };
  public updateEducation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await patchEducation(
      req.params.username,
      req.query.id as string,
      req.body
    );
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
    }
    res.json({ success: true, data: response.data });
  };
  public getSkills = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await getSkills(req.params.username);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
    }
    res.json({ success: true, data: response.data });
  };
  public updateSkills = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await patchSkills(req.params.username, req.body);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
    }
    res.json({ success: true, data: response.data });
  };

  public getWorkExperience = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await getWorkExperience(req.params.username);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
    }
    res.json({ success: true, data: response.data });
  };

  public updateWorkExperience = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const response = await patchWorkExperience(
      req.params.username,
      req.query.id as string,
      req.body
    );
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
    }
    res.json({ success: true, data: response.data });
  };
}

export const profileController = new Profile();
