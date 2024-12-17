import { Prisma, PrismaClient } from "@prisma/client";

interface Interview {
  title: string;
  type: string;
  company: string;
  date: string;
  duration?: string;
  guest?: string;
  notification?: string;
  link?: string;
}

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
      return { success: false, error: `Prisma error1: ${err.meta}` };
    } else if (err instanceof Prisma.PrismaClientValidationError) {
      return { success: false, error: `Prisma error: Some Fields are missing` };
    } else if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
};
