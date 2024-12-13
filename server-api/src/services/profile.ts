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

export const updateProfileImage = async (username: string, url: string) => {
  const user = await prisma.user.update({
    where: {
      username,
    },
    data: {
      profileImg: url,
    },
  });
  return user;
};

export const getProfile = async (username: string) => {
  console.log(username);
  const profile = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  console.log(profile);
  return profile;
};

export const patchProfile = async (username: string, data: UserUpdate) => {
  const profile = await prisma.user.update({
    where: {
      username,
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

export const getSkills = async (username: string) => {
  const skills = await prisma.userSkills.findFirst({
    where: {
      username: username,
    },
  });
  return skills;
};

export const patchSkills = async (username: string, skill: Skill[]) => {
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
  return skills;
};

export const getWorkExperience = async (username: string) => {
  const works = await prisma.userWorkExperience.findMany({
    where: {
      username: username,
    },
  });
  return works;
};

export const patchWorkExperience = async (
  username: string,
  id: string | undefined,
  data: WorkExperience
) => {
  console.log(id);
  if (id) {
    const work = await prisma.userWorkExperience.update({
      where: {
        id,
      },
      data: data,
    });
    return work;
  }
  const work = await prisma.userWorkExperience.create({
    data: {
      username: username,
      ...data,
    },
  });
  return work;
};
