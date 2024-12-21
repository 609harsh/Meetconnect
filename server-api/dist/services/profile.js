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
exports.deleteWorkExperience = exports.deleteEducation = exports.patchWorkExperience = exports.getWorkExperience = exports.patchSkills = exports.getSkills = exports.patchEducation = exports.getEducation = exports.patchAddress = exports.getAddress = exports.patchProfile = exports.getProfile = exports.updateProfileImage = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const errorFunction = (err) => {
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        return `Db error: Invalid details`;
    }
    else if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        return `DB Error: ${err.message.split("\n").pop()}`;
    }
    else if (err instanceof Error) {
        return err.message;
    }
    return "An unknown error occurred";
};
const updateProfileImage = (username, url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.update({
            where: {
                username,
            },
            data: {
                profileImg: url,
            },
        });
        return { success: true, data: user };
    }
    catch (err) {
        return { success: false, error: errorFunction(err) };
    }
});
exports.updateProfileImage = updateProfileImage;
const getProfile = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield prisma.user.findFirst({
            where: {
                username,
            },
        });
        if (!profile)
            throw new Error("User does not Exist");
        return { success: true, data: profile };
    }
    catch (err) {
        return { success: false, error: errorFunction(err) };
    }
});
exports.getProfile = getProfile;
const patchProfile = (username, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield prisma.user.update({
            where: {
                username,
            },
            data: Object.assign({}, data),
        });
        return { success: true, data: profile };
    }
    catch (err) {
        return { success: false, error: errorFunction(err) };
    }
});
exports.patchProfile = patchProfile;
const getAddress = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = yield prisma.userAddress.findFirst({
            where: {
                username,
            },
        });
        if (!address)
            throw new Error("User does not Exist");
        return { success: true, data: address };
    }
    catch (err) {
        return { success: false, error: errorFunction(err) };
    }
});
exports.getAddress = getAddress;
const patchAddress = (username, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = yield prisma.userAddress.upsert({
            where: {
                username: username,
            },
            update: Object.assign({}, data),
            create: Object.assign({ username: username }, data),
        });
        return { success: true, data: address };
    }
    catch (err) {
        return { success: false, error: errorFunction(err) };
    }
});
exports.patchAddress = patchAddress;
const getEducation = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findFirst({
            where: {
                username,
            },
        });
        if (!user)
            throw new Error("User does not exist");
        const education = yield prisma.userEducation.findMany({
            where: {
                username: username,
            },
        });
        return { success: true, data: education };
    }
    catch (err) {
        return { success: false, error: errorFunction(err) };
    }
});
exports.getEducation = getEducation;
const patchEducation = (username, id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (id && id !== "undefined" && id.trim() !== "") {
            const education = yield prisma.userEducation.update({
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
        const education = yield prisma.userEducation.create({
            data: Object.assign({ username: username }, data),
        });
        return { success: true, data: education };
    }
    catch (err) {
        return { success: false, error: errorFunction(err) };
    }
});
exports.patchEducation = patchEducation;
const getSkills = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skills = yield prisma.userSkills.findFirst({
            where: {
                username: username,
            },
        });
        if (!skills)
            throw new Error("User does not exist");
        return { success: true, data: skills };
    }
    catch (err) {
        return { success: false, error: errorFunction(err) };
    }
});
exports.getSkills = getSkills;
const patchSkills = (username, skill) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skills = yield prisma.userSkills.upsert({
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
    }
    catch (err) {
        return { success: false, error: errorFunction(err) };
    }
});
exports.patchSkills = patchSkills;
const getWorkExperience = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findFirst({
            where: {
                username,
            },
        });
        if (!user)
            throw new Error("User does not exist");
        const works = yield prisma.userWorkExperience.findMany({
            where: {
                username: username,
            },
        });
        return { success: true, data: works };
    }
    catch (err) {
        return { success: false, error: errorFunction(err) };
    }
});
exports.getWorkExperience = getWorkExperience;
const patchWorkExperience = (username, id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (id && id !== "undefined" && id.trim() !== "") {
            const work = yield prisma.userWorkExperience.update({
                where: {
                    id,
                },
                data: data,
            });
            return { success: true, data: work };
        }
        const work = yield prisma.userWorkExperience.create({
            data: Object.assign({ username: username }, data),
        });
        return { success: true, data: work };
    }
    catch (err) {
        return { success: false, error: errorFunction(err) };
    }
});
exports.patchWorkExperience = patchWorkExperience;
const deleteEducation = (username, educationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const education = yield prisma.userEducation.delete({
            where: {
                username,
                id: educationId,
            },
        });
        return { success: true, data: education };
    }
    catch (err) {
        return { success: false, error: errorFunction(err) };
    }
});
exports.deleteEducation = deleteEducation;
const deleteWorkExperience = (username, workExperienceId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workExperience = yield prisma.userWorkExperience.delete({
            where: {
                username,
                id: workExperienceId,
            },
        });
        return { success: true, data: workExperience };
    }
    catch (err) {
        return { success: false, error: errorFunction(err) };
    }
});
exports.deleteWorkExperience = deleteWorkExperience;
