package com.guisebastiao.easycart_api.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class AuthDTO {

    @NotBlank(message = "Digite seu e-mail")
    @Size(max = 250, message = "O e-mail está fora do tamanho permitido")
    @Email(message = "E-mail inválido, insira um e-mail válido")
    private String email;

    @NotBlank(message = "Digite sua senha")
    @Size(min = 8, message = "A senha deve ter pelo menos 8 caracteres")
    @Size(max = 20, message = "A senha não pode ter mais de 20 caracteres")
    private String password;
}