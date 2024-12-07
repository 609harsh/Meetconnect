import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createInterviews = async (data: any, userId: string) => {
  const interview = await prisma.interview.create({
    data: {
      ...data,
      userId,
    },
  });
  return interview;
};
