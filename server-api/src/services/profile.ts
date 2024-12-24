import { Prisma, PrismaClient } from "@prisma/client";
import {
  Skill,
  UserAddress,
  UserEducation,
  UserUpdate,
  WorkExperience,
} from "../types";

const prisma = new PrismaClient();

const errorFunction = (err: unknown) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return `Db error: ${err.message.split("\n").pop()}`;
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    return `DB Error: ${err.message.split("\n").pop()}`;
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
    if (!profile) throw new Error("User does not Exist");
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
    if (!address) return { success: true, data: null };
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
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!user) return { success: true, data: [] };
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
    if (id && id !== "undefined" && id.trim() !== "") {
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
    if (!skills) return { success: true, data: [] };
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
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!user) return { success: true, data: [] };
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
    if (id && id !== "undefined" && id.trim() !== "") {
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

export const deleteEducation = async (
  username: string,
  educationId: string
) => {
  try {
    const education = await prisma.userEducation.delete({
      where: {
        username,
        id: educationId,
      },
    });
    return { success: true, data: education };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};

export const deleteWorkExperience = async (
  username: string,
  workExperienceId: string
) => {
  try {
    const workExperience = await prisma.userWorkExperience.delete({
      where: {
        username,
        id: workExperienceId,
      },
    });
    return { success: true, data: workExperience };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};
