import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export interface UserUpdate {
  about?: string;
  phoneNumber?: string;
  name?: string;
}

export interface UserAddress {
  line1?: string;
  line2?: string;
  state?: string;
  country?: string;
  pincode?: string;
  city?: string;
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

export const getAddress = async (username: string) => {
  const address = await prisma.userAddress.findFirst({
    where: {
      username,
    },
  });
  return address;
};

export const patchAddress = async (username: string, data: UserAddress) => {
  const address = await prisma.userAddress.upsert({
    where: {
      username: username,
    },
    update: {
      ...data,
    },
    create: {
      username: username,
      ...data,
    },
  });
  return address;
};
