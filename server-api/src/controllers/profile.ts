import { Request, Response } from "express";
import {
  getAddress,
  getEducation,
  getProfile,
  getSkills,
  patchAddress,
  patchEducation,
  patchProfile,
  patchSkills,
} from "../services/profile";

class Profile {
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
      req.params.id,
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
}

export const profileController = new Profile();
