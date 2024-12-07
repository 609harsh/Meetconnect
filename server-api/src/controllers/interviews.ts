import { Request, Response } from "express";
import { deleteInterview, getInterviews } from "../services/interviews";

class Interviews {
  public fetchInterviews = async (req: Request, res: Response) => {
    const id = "6752f55a112874e3f707827f";
    const interviews = await getInterviews(id);
    res.json({ success: true, data: interviews });
  };
  public deleteInterviews = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await deleteInterview(id);
    res.json({ success: true, data });
  };
}

export const interviewController = new Interviews();
