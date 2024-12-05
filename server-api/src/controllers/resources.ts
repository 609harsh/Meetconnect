import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { createResource, fetchResources } from "../services/resources";

export const getResources = async (req: Request, res: Response) => {
  const data = await fetchResources();
  res.status(200).json({ success: true, data });
};

export const createResources = async (req: Request, res: Response) => {
  const data = await createResource(
    req.body.label,
    req.body.easy,
    req.body.medium,
    req.body.hard
  );
  res.status(200).json({ success: true, data });
};
