import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const prisma = new PrismaClient();

export const createUser = async (data: any) => {
  data.password = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: data,
  });
  const token = jwt.sign(
    { name: user.name, email: user.email, id: user.id },
    process.env.TOKEN_SECRET + "",
    {
      expiresIn: process.env.TOKEN_VALIDITY + "",
    }
  );

  return token;
};

export const userLogin = async (data: any) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  const hash = await bcrypt.compare(data?.password, user?.password + "");
  if (!hash) {
    return "User email/password does not match";
  }
  const token = jwt.sign(
    { name: user?.name, email: user?.email, id: user?.id },
    process.env.TOKEN_SECRET + "",
    {
      expiresIn: process.env.TOKEN_VALIDITY + "",
    }
  );
  return token;
};
