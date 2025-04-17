import { IsEmail, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class LoginSchema {
  @IsNotEmpty({ message: "Por favor insira seu e-mail" })
  @IsEmail(
    {},
    { message: "O e-mail está inválido, por favor, insira um e-mail válido" }
  )
  @MaxLength(250, { message: "O e-mail está fora do tamanho permitido" })
  email: string;

  @IsNotEmpty({ message: "Por favor insira sua senha" })
  @MinLength(8, { message: "A senha deve ter pelo menos 8 caracteres" })
  @MaxLength(20, { message: "A senha não pode ter mais de 20 caracteres" })
  password: string;
}
