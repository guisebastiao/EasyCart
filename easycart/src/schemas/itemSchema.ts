import { Units } from "@/types/Units";
import { z } from "zod";

export const itemSchema = z.object({
  id: z.string().optional(),
  content: z
    .string({ message: "The characters you entered are not supported" })
    .nonempty("Please enter the item you want to add")
    .max(100, "Item cannot be longer than 100 characters"),
  quantity: z
    .number({
      message: "The characters you entered are not supported",
      required_error: "Please inform the quantity",
    })
    .nonnegative("the quantity cannot be negative")
    .min(0.01, "Quantity must be at least 0.01")
    .max(999999.99, "quantity is too large")
    .refine(
      (val) => {
        const decimalPart = val.toString().split(".")[1];
        return !decimalPart || decimalPart.length <= 2;
      },
      {
        message: "Quantity must have at most 2 decimal places",
      }
    ),
  measurementUnit: z.nativeEnum(Units),
  complete: z.boolean(),
});

export type ItemSchemaType = z.infer<typeof itemSchema>;
