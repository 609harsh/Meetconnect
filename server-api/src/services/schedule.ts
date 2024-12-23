import { Prisma, PrismaClient } from "@prisma/client";
import { Interview } from "../types";

const prisma = new PrismaClient();

export const createInterviews = async (
  interviewData: Interview,
  userId: string
) => {
  try {
    // if (data.title)
    const interview = await prisma.interview.create({
      data: {
        ...interviewData,
        userId,
      },
    });
    return { success: true, data: interview };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        success: false,
        error: `Db error: ${err.message.split("\n").pop()}`,
      };
    } else if (err instanceof Prisma.PrismaClientValidationError) {
      return {
        success: false,
        error: `DB Error: ${err.message.split("\n").pop()}`,
      };
    } else if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
};
