import { Request, Response } from "express";
import { getProfile, patchProfile } from "../services/profile";

class Profile {
  public getProfile = async (req: Request, res: Response) => {
    const data = await getProfile(req.params.username);
    res.json({ success: true, data });
  };
  public updateProfile = async (req: Request, res: Response) => {
    const data = await patchProfile(req.params.username, req.body);
    res.json({ success: true, data });
  };
}

export const profileController = new Profile();
