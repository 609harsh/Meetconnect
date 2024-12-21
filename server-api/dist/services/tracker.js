"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swapDifferentColumn = exports.swapSameColumn = exports.swapColumn = exports.deleteJob = exports.createJob = exports.deleteColumn = exports.patchColumnTitle = exports.createColumn = exports.getTracker = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const errorFunction = (err) => {
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        return `Db error: ${err.message}`;
    }
    else if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        return `DB Error: ${err.message.split("\n").pop()}`;
    }
    else if (err instanceof Error) {
        return err.message;
    }
    return "An unknown error occurred";
};
const getTracker = (username, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tracker = yield prisma.user.findFirst({
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
        return { success: true, data: tracker };
    }
    catch (err) {
        return { success: false, error: errorFunction(err) };
    }
});
exports.getTracker = getTracker;
const createColumn = (username, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const column = yield prisma.trackerColumn.create({
            data: {
                columnTitle: body.columnTitle,
                username: username,
                idx: Number(body.idx),
                jobIdx: [],
            },
        });
        return { success: true, data: column };
    }
    catch (err) {
        return { success: false, error: errorFunction(err) };
    }
});
exports.createColumn = createColumn;
const patchColumnTitle = (columnId, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!body.title)
            throw new Error("Title does not exist");
        const column = yield prisma.trackerColumn.update({
            where: {
                id: columnId,
            },
            data: {
                columnTitle: body.title,
            },
        });
        return { success: true, data: column };
    }
    catch (err) {
        return { success: false, error: errorFunction(err) };
    }
});
exports.patchColumnTitle = patchColumnTitle;
const deleteColumn = (columnId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!columnId || columnId.trim() === "" || columnId === "undefined") {
            throw new Error("Invalid ColumnId");
        }
        const column = yield prisma.trackerColumn.delete({
            where: {
                id: columnId,
            },
        });
        return { success: true, data: column };
    }
    catch (err) {
        return { success: false, error: errorFunction(err) };
    }
});
exports.deleteColumn = deleteColumn;
const createJob = (columnId, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(columnId);
        console.log(body);
        if (!columnId || columnId.trim() === "" || columnId === "undefined") {
            throw new Error("Invalid ColumnId");
        }
        const job = yield prisma.trackerJob.create({
            data: Object.assign(Object.assign({}, body), { columnId }),
        });
        const jobIds = yield prisma.trackerColumn.findFirst({
            where: {
                id: columnId,
            },
            select: {
                jobIdx: true,
            },
        });
        jobIds === null || jobIds === void 0 ? void 0 : jobIds.jobIdx.unshift(job.id + "");
        const update = yield prisma.trackerColumn.update({
            where: {
                id: columnId,
            },
            data: {
                jobIdx: jobIds === null || jobIds === void 0 ? void 0 : jobIds.jobIdx,
            },
        });
        return { success: true, data: job };
    }
    catch (err) {
        return { success: false, error: errorFunction(err) };
    }
});
exports.createJob = createJob;
const deleteJob = (columnId, jobId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!columnId || columnId.trim() === "" || columnId === "undefined") {
            throw new Error("Invalid ColumnId");
        }
        if (!jobId || jobId.trim() === "" || jobId === "undefined") {
            throw new Error("Invalid JobId");
        }
        const jobIds = yield prisma.trackerColumn.findFirst({
            where: {
                id: columnId,
            },
            select: {
                jobIdx: true,
            },
        });
        const newJobIds = jobIds === null || jobIds === void 0 ? void 0 : jobIds.jobIdx.filter((id) => id !== jobId);
        const update = yield prisma.trackerColumn.update({
            where: {
                id: columnId,
            },
            data: {
                jobIdx: newJobIds,
            },
        });
        const job = yield prisma.trackerJob.delete({
            where: {
                id: jobId,
            },
        });
        return { success: true, data: job };
    }
    catch (err) {
        return { success: false, error: errorFunction(err) };
    }
});
exports.deleteJob = deleteJob;
const swapColumn = (columnId1, columnId2, newIdx1, newIdx2) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!columnId1 || !columnId2 || !newIdx1 || !newIdx2) {
            throw new Error("Invalid column details");
        }
        const update1 = yield prisma.trackerColumn.update({
            where: {
                id: columnId1,
            },
            data: {
                idx: Number(newIdx1),
            },
        });
        const update2 = yield prisma.trackerColumn.update({
            where: {
                id: columnId2,
            },
            data: {
                idx: Number(newIdx2),
            },
        });
        return { success: true, data: { update1, update2 } };
    }
    catch (err) {
        return { success: false, error: errorFunction(err) };
    }
});
exports.swapColumn = swapColumn;
const swapSameColumn = (columnId, jobId1, jobId2) => __awaiter(void 0, void 0, void 0, function* () {
    //0-based indexs
    //keep original indexes only
    try {
        const update = yield prisma.trackerColumn.findFirst({
            where: {
                id: columnId,
            },
            select: {
                jobIdx: true,
            },
        });
        const newJobs = update === null || update === void 0 ? void 0 : update.jobIdx;
        let jobIdx1 = newJobs.findIndex((job) => job === jobId1);
        let jobIdx2 = newJobs.findIndex((job) => job === jobId2);
        newJobs[Number(jobIdx1)] = jobId2;
        newJobs[Number(jobIdx2)] = jobId1;
        console.log(newJobs);
        const column = yield prisma.trackerColumn.update({
            where: {
                id: columnId,
            },
            data: {
                jobIdx: newJobs,
            },
        });
        return { success: true, data: column };
    }
    catch (err) {
        return { success: false, error: errorFunction(err) };
    }
});
exports.swapSameColumn = swapSameColumn;
const swapDifferentColumn = (columnId1, columnId2, jobId, newIdx) => __awaiter(void 0, void 0, void 0, function* () {
    //0-based indexes
    //kep original indexes
    try {
        // change refrence in job
        //disconnect
        const job = yield prisma.trackerJob.update({
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
        const col1 = yield prisma.trackerColumn.findFirst({
            where: {
                id: columnId1,
            },
            select: {
                jobIdx: true,
            },
        });
        const updatedArray = col1 === null || col1 === void 0 ? void 0 : col1.jobIdx.filter((id) => id !== jobId);
        const update = yield prisma.trackerColumn.update({
            where: {
                id: columnId1,
            },
            data: {
                jobIdx: updatedArray,
            },
        });
        //add to column2
        //add to jobIdx array
        const col2 = yield prisma.trackerColumn.findFirst({
            where: {
                id: columnId2,
            },
            select: {
                jobIdx: true,
            },
        });
        const updatedArray2 = col2 === null || col2 === void 0 ? void 0 : col2.jobIdx;
        updatedArray2 === null || updatedArray2 === void 0 ? void 0 : updatedArray2.splice(Number(newIdx), 0, jobId);
        const update2 = yield prisma.trackerColumn.update({
            where: {
                id: columnId2,
            },
            data: {
                jobIdx: updatedArray2,
            },
        });
        return { success: true, data: job };
    }
    catch (err) {
        return { success: false, error: errorFunction(err) };
    }
});
exports.swapDifferentColumn = swapDifferentColumn;
