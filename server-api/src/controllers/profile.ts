import { NextFunction, Response } from "express";
import {
  deleteEducation,
  deleteWorkExperience,
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
import { CustomError } from "../globalErrorHandler";
import { CustomRequest } from "../types";

class Profile {
  public updateProfileImage = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.username) {
      next(new CustomError("UserName Does not exist", 400));
      return;
    }
    const response = await updateProfileImage(
      req.username,
      req.query.url as string
    );
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
      return;
    }
    res.json({ success: true, data: response.data });
  };
  public getProfile = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.params.username) {
      next(new CustomError("UserName Does not exist", 400));
      return;
    }
    const response = await getProfile(req.params.username);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
      return;
    }
    res.json({ success: true, data: response.data });
  };
  public updateProfile = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.username) {
      res.status(400).json({ error: "UserName Does not exist" });
      return;
    }
    const response = await patchProfile(req.username, req.body);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
      return;
    }
    res.json({ success: true, data: response.data });
  };
  public getAddress = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.params.username) {
      next(new CustomError("UserName Does not exist", 400));
      return;
    }
    const response = await getAddress(req.params.sername);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
      return;
    }
    res.json({ success: true, data: response.data });
  };
  public updateAddress = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.username) {
      res.status(400).json({ error: "UserName Does not exist" });
      return;
    }
    const response = await patchAddress(req.username, req.body);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
      return;
    }
    res.json({ success: true, data: response.data });
  };
  public getEducation = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.params.username) {
      next(new CustomError("UserName Does not exist", 400));
      return;
    }
    const response = await getEducation(req.params.username);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
      return;
    }
    res.json({ success: true, data: response.data });
  };
  public updateEducation = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.username) {
      res.status(400).json({ error: "UserName Does not exist" });
      return;
    }
    const response = await patchEducation(
      req.username,
      req.query.id as string,
      req.body
    );
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
      return;
    }
    res.json({ success: true, data: response.data });
  };
  public getSkills = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.params.username) {
      next(new CustomError("UserName Does not exist", 400));
      return;
    }
    const response = await getSkills(req.params.username);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
      return;
    }
    res.json({ success: true, data: response.data });
  };
  public updateSkills = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.username) {
      res.status(400).json({ error: "UserName Does not exist" });
      return;
    }
    const response = await patchSkills(req.username, req.body);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
      return;
    }
    res.json({ success: true, data: response.data });
  };

  public getWorkExperience = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.params.username) {
      next(new CustomError("UserName Does not exist", 400));
      return;
    }
    const response = await getWorkExperience(req.params.username);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
      return;
    }
    res.json({ success: true, data: response.data });
  };

  public updateWorkExperience = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.username) {
      res.status(400).json({ error: "UserName Does not exist" });
      return;
    }
    const response = await patchWorkExperience(
      req.username,
      req.query.id as string,
      req.body
    );
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
      return;
    }
    res.json({ success: true, data: response.data });
  };

  public removeEducation = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.username) {
      next(new CustomError("Username does not exist", 400));
      return;
    }
    const response = await deleteEducation(req.username, req.params.id);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
      return;
    }
    res.json({ success: true, data: response.data });
  };

  public removeWorkExperience = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.username) {
      next(new CustomError("Username does not exist", 400));
      return;
    }
    const response = await deleteWorkExperience(req.username, req.params.id);
    if (!response.success) {
      next(new CustomError(response.error as string, 400));
      return;
    }
    res.json({ success: true, data: response.data });
  };
}

export const profileController = new Profile();
