import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "./globalErrorHandler";
import dotenv from "dotenv";
import { CustomRequest, JWTError, Payload } from "./types";

dotenv.config();

const prisma = new PrismaClient();
export const authorization = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  //1.) if token is not present
  const tokenDetails = req.headers.authorization;
  if (!tokenDetails) {
    res.status(401).json({ success: false, message: "Token does not exist" });
    return;
  }
  console.log(tokenDetails);

  if (!tokenDetails.startsWith("Bearer")) {
    res.status(401).json({ success: false, message: "Token does not exist" });
    return;
  }

  //2.) validate token
  const token = tokenDetails?.split(" ")[1] + "";

  let result: Payload;
  try {
    result = jwt.verify(token, process.env.TOKEN_SECRET + "") as Payload;

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
    next(new CustomError(err.message + "", 401));
    return;
  }
  //4.)
};
