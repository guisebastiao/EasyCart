import { Units } from "@/types/Units";
import { z } from "zod";

export const itemSchema = z.object({
  content: z
    .string({ message: "The characters you entered are not supported" })
    .nonempty("Please enter the item you want to add")
    .max(100, "Item cannot be longer than 100 characters"),
  quantity: z
    .number({
      required_error: "Please enter quantity",
      invalid_type_error: "Quantity must be a number",
    })
    .min(0.01, { message: "Quantity must be greater than zero" })
    .refine(
      (val) => {
        const [intPart, fracPart] = val.toString().split(".");
        return (
          (!intPart || intPart.length <= 6) &&
          (!fracPart || fracPart.length <= 2)
        );
      },
      {
        message: "quantity is too long",
      }
    ),
  measurementUnit: z.nativeEnum(Units, {
    message: "Measurement has to be enum",
  }),
  complete: z.boolean({ message: "Complete has to be boolean" }),
});

export type ItemSchemaType = z.infer<typeof itemSchema>;
