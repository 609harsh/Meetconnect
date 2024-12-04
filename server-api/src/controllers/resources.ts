import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { createResource } from "../services/resources";

const prisma = new PrismaClient();

export const getResources = async (req: Request, res: Response) => {
  const data = await prisma.resources.findMany();
  console.log(data);
  res.json(data);
};

export const createResources = async (req: Request, res: Response) => {
  const data = await createResource(
    req.body.label,
    req.body.easy,
    req.body.medium,
    req.body.hard
  );
  res.status(200).json(data);
};