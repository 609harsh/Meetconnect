import { Prisma, PrismaClient } from "@prisma/client";
import { log } from "console";

export interface Column {
  id?: string;
  columnTitle: string;
  idx: string;
  jobIdx?: string[];
  username?: string;
}
export interface Job {
  id?: string;
  company: string;
  columnId?: string;
  note?: string;
  link?: string;
  jobtitle: string;
}

const prisma = new PrismaClient();

const errorFunction = (err: unknown) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return `Db error: ${err.message}`;
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
            jobIdx: true,
            idx: true,
          },
        },
      },
    });
    let sortedData = tracker?.trackerColumn.map((col) => {
      col.jobs.sort(
        (a, b) =>
          (col.jobIdx || []).indexOf(a.id) - (col.jobIdx || []).indexOf(b.id)
      );
      return col;
    });
    console.log(sortedData);

    return { success: true, data: sortedData };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};

export const createColumn = async (username: string, body: Column) => {
  try {
    const column = await prisma.trackerColumn.create({
      data: {
        columnTitle: body.columnTitle,
        username: username,
        idx: Number(body.idx),
        jobIdx: [],
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
    if (!body.title) throw new Error("Title does not exist");
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
    if (!columnId || columnId.trim() === "" || columnId === "undefined") {
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
    if (!columnId || columnId.trim() === "" || columnId === "undefined") {
      throw new Error("Invalid ColumnId");
    }
    const job = await prisma.trackerJob.create({
      data: {
        ...body,
        columnId,
      },
    });
    const jobIds = await prisma.trackerColumn.findFirst({
      where: {
        id: columnId,
      },
      select: {
        jobIdx: true,
      },
    });
    jobIds?.jobIdx.unshift(job.id + "");
    const update = await prisma.trackerColumn.update({
      where: {
        id: columnId,
      },
      data: {
        jobIdx: jobIds?.jobIdx,
      },
    });
    return { success: true, data: job };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};
export const deleteJob = async (columnId: string, jobId: string) => {
  try {
    if (!columnId || columnId.trim() === "" || columnId === "undefined") {
      throw new Error("Invalid ColumnId");
    }
    if (!jobId || jobId.trim() === "" || jobId === "undefined") {
      throw new Error("Invalid JobId");
    }

    const jobIds = await prisma.trackerColumn.findFirst({
      where: {
        id: columnId,
      },
      select: {
        jobIdx: true,
      },
    });
    const newJobIds = jobIds?.jobIdx.filter((id) => id !== jobId);
    const update = await prisma.trackerColumn.update({
      where: {
        id: columnId,
      },
      data: {
        jobIdx: newJobIds,
      },
    });

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

export const swapColumn = async (
  columnId1: string,
  columnId2: string,
  newIdx1: string,
  newIdx2: string
) => {
  try {
    if (!columnId1 || !columnId2 || !newIdx1 || !newIdx2) {
      throw new Error("Invalid column details");
    }
    const update1 = await prisma.trackerColumn.update({
      where: {
        id: columnId1,
      },
      data: {
        idx: Number(newIdx1),
      },
    });
    const update2 = await prisma.trackerColumn.update({
      where: {
        id: columnId2,
      },
      data: {
        idx: Number(newIdx2),
      },
    });
    return { success: true, data: { update1, update2 } };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};

export const swapSameColumn = async (
  columnId: string,
  jobId1: string,
  jobId2: string
) => {
  //0-based indexs
  //keep original indexes only
  try {
    const update = await prisma.trackerColumn.findFirst({
      where: {
        id: columnId,
      },
      select: {
        jobIdx: true,
      },
    });
    const newJobs = update?.jobIdx as string[];
    let jobIdx1 = newJobs.findIndex((job) => job === jobId1);
    let jobIdx2 = newJobs.findIndex((job) => job === jobId2);
    newJobs[Number(jobIdx1)] = jobId2;
    newJobs[Number(jobIdx2)] = jobId1;
    console.log(newJobs);
    const column = await prisma.trackerColumn.update({
      where: {
        id: columnId,
      },
      data: {
        jobIdx: newJobs,
      },
    });
    return { success: true, data: column };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};

export const swapDifferentColumn = async (
  columnId1: string,
  columnId2: string,
  jobId: string,
  newIdx: string
) => {
  //0-based indexes
  //kep original indexes
  try {
    // change refrence in job
    //disconnect
    const job = await prisma.trackerJob.update({
      where: {
        id: jobId,
      },
      data: {
        columnId: columnId2,
      },
    });
    // console.log(job);

    //remove from column1
    //remove from jobIdx array
    const col1 = await prisma.trackerColumn.findFirst({
      where: {
        id: columnId1,
      },
      select: {
        jobIdx: true,
      },
    });
    const updatedArray = col1?.jobIdx.filter((id) => id !== jobId);
    const update = await prisma.trackerColumn.update({
      where: {
        id: columnId1,
      },
      data: {
        jobIdx: updatedArray,
      },
    });

    //add to column2
    //add to jobIdx array
    const col2 = await prisma.trackerColumn.findFirst({
      where: {
        id: columnId2,
      },
      select: {
        jobIdx: true,
      },
    });
    const updatedArray2 = col2?.jobIdx;
    updatedArray2?.splice(Number(newIdx), 0, jobId);
    const update2 = await prisma.trackerColumn.update({
      where: {
        id: columnId2,
      },
      data: {
        jobIdx: updatedArray2,
      },
    });
    return { success: true, data: job };
  } catch (err) {
    return { success: false, error: errorFunction(err) };
  }
};
