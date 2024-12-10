import { Request, Response } from "express";
import {
  getAddress,
  getProfile,
  patchAddress,
  patchProfile,
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
}

export const profileController = new Profile();
