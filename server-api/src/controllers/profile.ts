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
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.username) {
      res.status(401).json({ error: "UserName Does not exist" });
      return;
    }
    const response = await getProfile(req.username);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
    }
    res.json({ success: true, data: response.data });
  };
  public updateProfile = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.username) {
      res.status(401).json({ error: "UserName Does not exist" });
      return;
    }
    const response = await patchProfile(req.username, req.body);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
    }
    res.json({ success: true, data: response.data });
  };
  public getAddress = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.username) {
      res.status(401).json({ error: "UserName Does not exist" });
      return;
    }
    const response = await getAddress(req.username);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
    }
    res.json({ success: true, data: response.data });
  };
  public updateAddress = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.username) {
      res.status(401).json({ error: "UserName Does not exist" });
      return;
    }
    const response = await patchAddress(req.username, req.body);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
    }
    res.json({ success: true, data: response.data });
  };
  public getEducation = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.username) {
      res.status(401).json({ error: "UserName Does not exist" });
      return;
    }
    const response = await getEducation(req.username);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
    }
    res.json({ success: true, data: response.data });
  };
  public updateEducation = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.username) {
      res.status(401).json({ error: "UserName Does not exist" });
      return;
    }
    const response = await patchEducation(
      req.username,
      req.query.id as string,
      req.body
    );
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
    }
    res.json({ success: true, data: response.data });
  };
  public getSkills = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.username) {
      res.status(401).json({ error: "UserName Does not exist" });
      return;
    }
    const response = await getSkills(req.username);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
    }
    res.json({ success: true, data: response.data });
  };
  public updateSkills = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.username) {
      res.status(401).json({ error: "UserName Does not exist" });
      return;
    }
    const response = await patchSkills(req.username, req.body);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
    }
    res.json({ success: true, data: response.data });
  };

  public getWorkExperience = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.username) {
      res.status(401).json({ error: "UserName Does not exist" });
      return;
    }
    const response = await getWorkExperience(req.username);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
    }
    res.json({ success: true, data: response.data });
  };

  public updateWorkExperience = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.username) {
      res.status(401).json({ error: "UserName Does not exist" });
      return;
    }
    const response = await patchWorkExperience(
      req.username,
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
