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

export interface UserEducation {
  school?: string;
  degree?: string;
  grade?: string;
  fieldOfStudy?: string;
  duration?: string;
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

export const getEducation = async (username: string) => {
  const education = await prisma.userEducation.findMany({
    where: {
      username: username,
    },
  });
  return education;
};

export const patchEducation = async (
  username: string,
  id: string,
  data: UserEducation
) => {
  // console.log(id);
  if (id) {
    const education = await prisma.userEducation.update({
      where: {
        id,
      },
      data: data,
    });
    return education;
  }
  const education = await prisma.userEducation.create({
    data: {
      username: username,
      ...data,
    },
  });
  return education;
};
