import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createInterviews = async (data: any, userId: string) => {
  try {
    const interview = await prisma.interview.create({
      data: {
        ...data,
        userId,
      },
    });
    return { success: true, data: interview };
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
