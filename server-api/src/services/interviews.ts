import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getInterviews = async (userId: string) => {
  const interviews = await prisma.interview.findMany({
    where: {
      userId,
    },
  });
  return interviews;
};

export const deleteInterview = async (id: string) => {
  const data = await prisma.interview.delete({
    where: {
      id,
    },
  });
  return data;
};
