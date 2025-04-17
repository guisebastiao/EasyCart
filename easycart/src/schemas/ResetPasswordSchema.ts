import { IsNotEmpty, MinLength, MaxLength, Validate } from "class-validator";
import { MatchPasswords } from "./MatchPassword";

export class ResetPasswordSchema {
  @IsNotEmpty({ message: "Por favor insira sua senha" })
  @MaxLength(20, { message: "A senha não pode ter mais de 20 caracteres" })
  @MinLength(8, { message: "A senha deve ter pelo menos 8 caracteres" })
  password: string;

  @IsNotEmpty({ message: "Por favor confirme sua senha" })
  @MaxLength(20, {
    message: "A confirmação da senha não pode ter mais de 20 caracteres",
  })
  @MinLength(8, {
    message: "A confirmação da senha deve ter pelo menos 8 caracteres",
  })
  @Validate(MatchPasswords)
  passwordConfirm: string;
}
