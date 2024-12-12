import { Request, Response } from "express";
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
import { log } from "console";

class Profile {
  public updateProfileImage = async (req: Request, res: Response) => {
    const data = await updateProfileImage(
      req.params.username,
      req.query.url as string
    );
    res.json({ success: true, data });
  };
  public getProfile = async (req: Request, res: Response) => {
    const data = await getProfile(req.params.username);
    res.json({ success: true, data });
  };
  public updateProfile = async (req: Request, res: Response) => {
    const data = await patchProfile(req.params.username, req.body);
    res.json({ success: true, data });
  };
  public getAddress = async (req: Request, res: Response) => {
    const data = await getAddress(req.params.username);
    res.json({ success: true, data });
  };
  public updateAddress = async (req: Request, res: Response) => {
    const data = await patchAddress(req.params.username, req.body);
    res.json({ success: true, data });
  };
  public getEducation = async (req: Request, res: Response) => {
    const data = await getEducation(req.params.username);
    res.json({ success: true, data });
  };
  public updateEducation = async (req: Request, res: Response) => {
    const data = await patchEducation(
      req.params.username,
      req.query.id as string,
      req.body
    );
    res.json({ success: true, data });
  };
  public getSkills = async (req: Request, res: Response) => {
    const data = await getSkills(req.params.username);
    res.json({ success: true, data });
  };
  public updateSkills = async (req: Request, res: Response) => {
    const data = await patchSkills(req.params.username, req.body);
    res.json({ success: true, data });
  };

  public getWorkExperience = async (req: Request, res: Response) => {
    const data = await getWorkExperience(req.params.username);
    res.json({ success: true, data });
  };

  public updateWorkExperience = async (req: Request, res: Response) => {
    const data = await patchWorkExperience(
      req.params.username,
      req.query.id as string,
      req.body
    );
    res.json({ success: true, data });
  };
}

export const profileController = new Profile();
