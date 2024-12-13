import { PrismaClient } from "@prisma/client";
import { log } from "console";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface JWTError {
  name?: string;
  message?: string;
}
export interface Payload {
  name: string;
  email: string;
  id: string;
  username: string;
  iat: number;
  exp: number;
}
export interface CustomRequest extends Request {
  userId?: string; // Extend Request to include userId
  username?: string;
}

const prisma = new PrismaClient();
export const authorization = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  //1.) if token is not present
  const tokenDetails = req.headers.authorization;
  if (!tokenDetails || !tokenDetails.startsWith("Bearer")) {
    res.status(401).json({ success: false, message: "Token does not exist" });
    return;
  }

  //2.) validate token
  const token = tokenDetails?.split(" ")[1] + "";

  let result: Payload;
  try {
    result = jwt.verify(token, "23456789") as Payload;

    //3.) validate user
    const user = await prisma.user.findFirst({
      where: {
        id: result.id,
      },
    });
    if (!user) {
      throw Error("User does not Exist");
    }
    req.userId = user?.id;
    req.username = user?.username;
    next();
  } catch (error) {
    const err = error as JWTError;
    console.log(err.message);
    res.status(401).json({ error: err.message });
    return;
  }
  //4.)

  //
};
