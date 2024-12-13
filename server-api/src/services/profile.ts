import { Prisma, PrismaClient } from "@prisma/client";

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

export interface Skill {
  value: string;
  label: string;
}

export interface WorkExperience {
  title?: string;
  company?: string;
  duration?: string;
  about?: string;
}

const errorFunction = (err: unknown) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return `Prisma error: ${err.message}`;
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    return `Prisma error: ${err.message}`;
  } else if (err instanceof Error) {
    return err.message;
  }
  return "An unknown error occurred";
};
export const updateProfileImage = async (username: string, url: string) => {
  try {
    const user = await prisma.user.update({
      where: {
        username,
      },
      data: {
        profileImg: url,
      },
    });
    return { success: true, data: user };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};

export const getProfile = async (username: string) => {
  try {
    const profile = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    return { success: true, data: profile };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};

export const patchProfile = async (username: string, data: UserUpdate) => {
  try {
    const profile = await prisma.user.update({
      where: {
        username,
      },
      data: { ...data },
    });
    return { success: true, data: profile };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};

export const getAddress = async (username: string) => {
  try {
    const address = await prisma.userAddress.findFirst({
      where: {
        username,
      },
    });
    return { success: true, data: address };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};

export const patchAddress = async (username: string, data: UserAddress) => {
  try {
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
    return { success: true, data: address };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};

export const getEducation = async (username: string) => {
  try {
    const education = await prisma.userEducation.findMany({
      where: {
        username: username,
      },
    });
    return { success: true, data: education };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};

export const patchEducation = async (
  username: string,
  id: string,
  data: UserEducation
) => {
  try {
    if (id !== "undefined" && id.trim() !== "") {
      const education = await prisma.userEducation.update({
        where: {
          id,
        },
        data: {
          username: username,
          school: data.school,
          degree: data.degree,
          fieldOfStudy: data.fieldOfStudy,
          duration: data.duration,
          grade: data.grade,
        },
      });
      return { success: true, data: education };
    }
    const education = await prisma.userEducation.create({
      data: {
        username: username,
        ...data,
      },
    });
    return { success: true, data: education };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};

export const getSkills = async (username: string) => {
  try {
    const skills = await prisma.userSkills.findFirst({
      where: {
        username: username,
      },
    });
    return { success: true, data: skills };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};

export const patchSkills = async (username: string, skill: Skill[]) => {
  try {
    const skills = await prisma.userSkills.upsert({
      create: {
        username: username,
        skills: skill,
      },
      where: {
        username: username,
      },
      update: {
        skills: skill,
      },
    });
    return { success: true, data: skills };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};

export const getWorkExperience = async (username: string) => {
  try {
    const works = await prisma.userWorkExperience.findMany({
      where: {
        username: username,
      },
    });
    return { success: true, data: works };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};

export const patchWorkExperience = async (
  username: string,
  id: string | undefined,
  data: WorkExperience
) => {
  try {
    if (id) {
      const work = await prisma.userWorkExperience.update({
        where: {
          id,
        },
        data: data,
      });
      return { success: true, data: work };
    }
    const work = await prisma.userWorkExperience.create({
      data: {
        username: username,
        ...data,
      },
    });
    return { success: true, data: work };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};
