import {
  EasyQuestion,
  HardQuestion,
  MediumQuestion,
  PrismaClient,
  Prisma,
} from "@prisma/client";

const prisma = new PrismaClient();

export const fetchResources = async () => {
  try {
    const data = await prisma.resources.findMany({
      include: {
        easy: true,
        medium: true,
        hard: true,
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

export const createResource = async (
  label: string,
  easy: EasyQuestion[],
  medium: MediumQuestion[],
  hard: HardQuestion[]
) => {
  const newResource = await prisma.resources.create({
    data: {
      label,
      easy: {
        createMany: {
          data: easy,
        },
      },
      medium: {
        createMany: {
          data: medium,
        },
      },
      hard: {
        createMany: {
          data: hard,
        },
      },
    },
    include: {
      easy: true,
      medium: true,
      hard: true,
    },
  });
  return newResource;
};
