import {
  EasyQuestion,
  HardQuestion,
  MediumQuestion,
  PrismaClient,
} from "@prisma/client";

const prisma = new PrismaClient();

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
