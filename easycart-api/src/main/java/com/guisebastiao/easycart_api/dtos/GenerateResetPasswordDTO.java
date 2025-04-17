package com.guisebastiao.easycart_api.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GenerateResetPasswordDTO {

    @NotBlank(message = "Digite seu e-mail")
    @Size(max = 250, message = "O e-mail está fora do tamanho permitido")
    @Email(message = "E-mail inválido, insira um e-mail válido")
    private String email;
}
