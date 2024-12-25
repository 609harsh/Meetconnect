import { Prisma, PrismaClient } from "@prisma/client";
import { Column, Job } from "../types";

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

export const getTracker = async (username: string, id: string) => {
  try {
    const tracker = await prisma.user.findFirst({
      where: {
        id,
        username,
      },
      select: {
        trackerColumn: {
          select: {
            jobs: true,
            id: true,
            columnTitle: true,
            idx: true,
          },
        },
      },
    });
    let sortedData = tracker?.trackerColumn ?? [];

    return { success: true, data: sortedData };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};

export const createColumn = async (
  username: string,
  body: { columnTitle: string }
) => {
  try {
    if (!body.columnTitle) {
      throw new Error("Valid Column title");
    }
    const column = await prisma.trackerColumn.create({
      data: {
        columnTitle: body.columnTitle,
        username: username,
        idx: Number(new Date().getTime()),
      },
    });
    return { success: true, data: column };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};

export const patchColumnTitle = async (
  columnId: string,
  body: { title: string }
) => {
  try {
    if (!body.title) throw new Error("Valid Column Title");
    const column = await prisma.trackerColumn.update({
      where: {
        id: columnId,
      },
      data: {
        columnTitle: body.title,
      },
    });
    return { success: true, data: column };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};

export const deleteColumn = async (columnId: string) => {
  try {
    if (!columnId || !columnId.trim() || columnId === "undefined") {
      throw new Error("Invalid ColumnId");
    }
    const column = await prisma.trackerColumn.delete({
      where: {
        id: columnId,
      },
    });
    return { success: true, data: column };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};

export const createJob = async (columnId: string, body: Job) => {
  try {
    if (!columnId || !columnId.trim() || columnId === "undefined") {
      throw new Error("Invalid ColumnId");
    }
    const job = await prisma.trackerJob.create({
      data: {
        ...body,
        idx: Number(new Date().getTime()),
        columnId,
      },
    });
    return { success: true, data: job };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};
export const deleteJob = async (jobId: string) => {
  try {
    if (!jobId || jobId.trim() === "" || jobId === "undefined") {
      throw new Error("Invalid JobId");
    }
    const job = await prisma.trackerJob.delete({
      where: {
        id: jobId,
      },
    });
    return { success: true, data: job };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};

export const swapColumn = async (columnId1: string, columnId2: string) => {
  try {
    if (!columnId1 || !columnId2) {
      throw new Error("Invalid column details");
    }
    //Fetch Indexes
    const idx1 = await prisma.trackerColumn.findFirst({
      where: {
        id: columnId1,
      },
      select: {
        idx: true,
      },
    });

    const idx2 = await prisma.trackerColumn.findFirst({
      where: {
        id: columnId2,
      },
      select: {
        idx: true,
      },
    });
    //Swap Indexes
    const update1 = await prisma.trackerColumn.update({
      where: {
        id: columnId1,
      },
      data: {
        idx: Number(idx2?.idx),
      },
    });
    const update2 = await prisma.trackerColumn.update({
      where: {
        id: columnId2,
      },
      data: {
        idx: Number(idx1?.idx),
      },
    });
    return { success: true, data: { ...update1, update2 } };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};

export const swapSameColumn = async (jobId1: string, jobId2: string) => {
  //0-based indexs
  //keep original indexes only
  try {
    const idx1 = await prisma.trackerJob.findFirst({
      where: {
        id: jobId1,
      },
      select: {
        idx: true,
      },
    });

    const idx2 = await prisma.trackerJob.findFirst({
      where: {
        id: jobId2,
      },
      select: {
        idx: true,
      },
    });
    //Swap Indexes
    const update1 = await prisma.trackerJob.update({
      where: {
        id: jobId1,
      },
      data: {
        idx: Number(idx2?.idx),
      },
    });
    const update2 = await prisma.trackerJob.update({
      where: {
        id: jobId2,
      },
      data: {
        idx: Number(idx1?.idx),
      },
    });
    return { success: true, data: { ...update1, ...update2 } };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};

export const swapDifferentColumn = async (columnId: string, jobId: string) => {
  try {
    const job = await prisma.trackerJob.update({
      where: {
        id: jobId,
      },
      data: {
        columnId: columnId,
      },
    });
    return { success: true, data: job };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};
