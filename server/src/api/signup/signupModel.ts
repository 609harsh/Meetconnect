import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Signup = z.infer<typeof SignupSchema>;
export const SignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Invalid phone number. Must be 10 digits."),
});

export const signupValidation = z.object({
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
});
