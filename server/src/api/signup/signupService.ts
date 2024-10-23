import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { Prisma, PrismaClient, User } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

export class SignupService {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient = new PrismaClient()) {
    this.prisma = prisma;
  }

  async createUser(data: User) {
    try {
      const user = await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          phoneNumber: data.phoneNumber,
        },
      });
      return ServiceResponse.success("User Created", user);
    } catch (ex) {
      const errorMessage = `Error finding all users: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving users.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const signupService = new SignupService();
