import { z } from "zod";

export const refreshTokenSchema = z.object({
  token: z
    .string({ message: "The characters you entered are not supported" })
    .jwt({ message: "It is not a JWT token" })
    .nonempty("Enter to token"),
});

export type RefreshTokenSchemaType = z.infer<typeof refreshTokenSchema>;
