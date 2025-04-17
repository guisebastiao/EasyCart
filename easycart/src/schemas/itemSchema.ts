import { Type } from "class-transformer";
import { Units } from "@/types/Units";
import {
  IsNumber,
  IsNotEmpty,
  Min,
  Max,
  IsString,
  IsEnum,
  IsBoolean,
} from "class-validator";

export class ItemCreateSchema {
  @IsString()
  @IsNotEmpty({ message: "Por favor insira o conteúdo do item" })
  content: string;

  @Type(() => Number)
  @IsNumber({}, { message: "A quantidade deve ser um número" })
  @Min(0.01, { message: "A quantidade deve ser maior que zero" })
  @Max(999999.99, { message: "A quantidade está muito grande" })
  @IsNotEmpty({ message: "Por favor insira uma quantidade" })
  quantity: number;

  @IsEnum(Units, { message: "Algo deu errado" })
  measurementUnit: Units;

  @IsBoolean({ message: "Algo deu errado" })
  complete: boolean;
}

export class ItemEditSchema extends ItemCreateSchema {
  id: string;
}
