import { Request, Response } from "express";
import { createInterviews } from "../services/schedule";

class ScheduleInterviews {
  public postInterviews = async (req: Request, res: Response) => {
    const data = req.body;
    const userId = "6752f55a112874e3f707827f";
    const interview = await createInterviews(data, userId);
    res.json({ success: true, data: interview });
  };
}

export const scheduleInterviews = new ScheduleInterviews();
