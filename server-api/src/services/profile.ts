import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export interface UserUpdate {
  about?: string;
  phoneNumber?: string;
  name?: string;
}

export const getProfile = async (username: string) => {
  const profile = await prisma.user.findFirst({
    where: {
      email: {
        contains: username,
      },
    },
  });
  return profile;
};

export const patchProfile = async (username: string, data: UserUpdate) => {
  const profile = await prisma.user.updateMany({
    where: {
      email: {
        contains: username,
      },
    },
    data: { ...data },
  });
  return profile;
};
