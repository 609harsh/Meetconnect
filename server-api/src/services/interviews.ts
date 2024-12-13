import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getInterviews = async (userId: string) => {
  try {
    const interviews = await prisma.interview.findMany({
      where: {
        userId,
      },
    });
    return { success: true, data: interviews };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, error: `Prisma error: ${err.message}` };
    } else if (err instanceof Prisma.PrismaClientValidationError) {
      return { success: false, error: `Prisma error: ${err.message}` };
    } else if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
};

export const deleteInterview = async (id: string) => {
  try {
    const data = await prisma.interview.delete({
      where: {
        id,
      },
    });
    return { success: true, data };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, error: `Prisma error: ${err.message}` };
    } else if (err instanceof Prisma.PrismaClientValidationError) {
      return { success: false, error: `Prisma error: ${err.message}` };
    } else if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
};
