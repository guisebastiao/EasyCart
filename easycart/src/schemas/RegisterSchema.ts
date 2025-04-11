import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string({ message: "The characters you entered are not supported" })
      .nonempty("Please enter your e-mail")
      .max(250, "The e-mail is outside the allowed length")
      .email("The e-mail is invalid, please, enter valid e-mail"),
    password: z
      .string({ message: "The characters you entered are not supported" })
      .min(8, "The password must have at least 8 characters")
      .max(20, "The password can´t have more than 20 characters"),
    passwordConfirm: z
      .string({ message: "The characters you entered are not supported" })
      .min(8, "The password confirmation must have at least 8 characters")
      .max(20, "The password confirmation can’t have more than 20 characters"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
