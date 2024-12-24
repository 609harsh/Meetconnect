import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getInterviews = async (userId: string) => {
  console.log(userId);

  try {
    const interviews = await prisma.interview.findMany({
      where: {
        userId,
      },
    });
    return { success: true, data: interviews };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, error: `Prisma error: Schema Error` };
    } else if (err instanceof Prisma.PrismaClientValidationError) {
      return { success: false, error: `Prisma error: Some fields are missing` };
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
      return { success: false, error: `Db error: Invalid Id` };
    } else if (err instanceof Prisma.PrismaClientValidationError) {
      return { success: false, error: `DB Error: ${err.message}` };
    } else if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
};
