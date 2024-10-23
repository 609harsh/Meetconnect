import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { application, type Router } from "express";
import { object, z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpHandlers";
import { SignupSchema, signupValidation } from "./signupModel";
import { signupController } from "./signinupController";

export const SignupRegistry = new OpenAPIRegistry();
export const signupRouter: Router = express.Router();

SignupRegistry.register("Signup", SignupSchema);

SignupRegistry.registerPath({
  method: "post",
  path: "/signup",
  tags: ["Signup"],
  // requestBody: {
  //   content: {
  //     "application/json": {
  //       schema: {
  //         properties: {
  //           name: {
  //             type: "string",
  //             example: "Harsh",
  //           },
  //           email: {
  //             type: "string",
  //             example: "harsh@gmail.com",
  //           },
  //           phoneNumber: {
  //             type: "string",
  //             example: "9000000001",
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  request: {
    body: {
      description: "create user",
      content: {
        "application/json": {
          schema: SignupSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.array(SignupSchema), "Success"),
});

signupRouter.post(
  "/",
  validateRequest(signupValidation),
  signupController.createUser
);

SignupRegistry.registerPath({
  method: "get",
  path: "/signup/1",
  tags: ["Signup"],
  responses: createApiResponse(z.array(SignupSchema), "Success"),
});

signupRouter.get(
  "/1",
  // validateRequest(SignupSchema),
  (req, res) => {
    res.send("Hello World");
  }
);
