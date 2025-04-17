import { MatchPasswords } from "./MatchPassword";
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Validate,
} from "class-validator";

export class RegisterSchema {
  @IsNotEmpty({ message: "Por favor insira seu e-mail" })
  @IsEmail(
    {},
    { message: "O e-mail é inválido, por favor, insira um e-mail válido" }
  )
  @MaxLength(250, { message: "O e-mail está fora do comprimento permitido" })
  email: string;

  @IsNotEmpty({ message: "Por favor insira sua senha" })
  @MinLength(8, { message: "A senha deve ter pelo menos 8 caracteres" })
  @MaxLength(20, { message: "A senha não pode ter mais de 20 caracteres" })
  password: string;

  @IsNotEmpty({ message: "Por favor confirme sua senha" })
  @MinLength(8, {
    message: "A confirmação da senha deve ter pelo menos 8 caracteres",
  })
  @MaxLength(20, {
    message: "A confirmação da senha não pode ter mais de 20 caracteres",
  })
  @Validate(MatchPasswords)
  passwordConfirm: string;
}
