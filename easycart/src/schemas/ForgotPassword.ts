import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class ForgotPasswordSchema {
  @IsNotEmpty({ message: "Por favor insira seu e-mail" })
  @IsEmail(
    {},
    { message: "O e-mail está inválido, por favor, insira um e-mail válido" }
  )
  @MaxLength(250, { message: "O e-mail está fora do tamanho permitido" })
  email: string;
}
