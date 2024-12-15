import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const prisma = new PrismaClient();

export const createUser = async (data: any) => {
  if (!data.google) data.password = await bcrypt.hash(data.password, 10);
  try {
    const findUser = await prisma.user.findFirst({
      where: {
        email: data.email,
        phoneNumber: data?.phoneNumber,
      },
    });
    if (findUser) throw new Error("User Already Exist");
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data?.password,
        phoneNumber: data?.phoneNumber,
        username:
          data.email.split("@")[0] + "_" + ((Math.random() * 10000) | 0),
      },
    });
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        id: user.id,
        username: user.username,
      },
      process.env.TOKEN_SECRET + "",
      {
        expiresIn: process.env.TOKEN_VALIDITY + "",
      }
    );

    return { success: true, data: token };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(err.meta);
      return { success: false, error: `Prisma error: ${err?.meta?.target}` };
    } else if (err instanceof Prisma.PrismaClientValidationError) {
      return { success: false, error: `Prisma error: ${err.message}` };
    } else if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
};

export const userLogin = async (data: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) throw new Error("User email/password does not match");
    if (!data.google) {
      const hash = await bcrypt.compare(data?.password, user?.password + "");
      if (!hash) {
        throw new Error("User email/password does not match");
      }
    }
    const token = jwt.sign(
      {
        name: user?.name,
        email: user?.email,
        id: user?.id,
        username: user?.username,
      },
      process.env.TOKEN_SECRET + "",
      {
        expiresIn: process.env.TOKEN_VALIDITY + "",
      }
    );
    return { success: true, data: token };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, error: `Prisma error: ${err.meta?.target}` };
    } else if (err instanceof Prisma.PrismaClientValidationError) {
      return { success: false, error: `Prisma error: ${err.message}` };
    } else if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
};
