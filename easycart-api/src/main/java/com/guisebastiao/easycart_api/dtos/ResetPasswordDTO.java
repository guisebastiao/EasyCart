package com.guisebastiao.easycart_api.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordDTO {

    @NotBlank(message = "Digite sua senha")
    @Size(min = 8, message = "A senha deve ter pelo menos 8 caracteres")
    @Size(max = 20, message = "A senha não pode ter mais de 20 caracteres")
    private String password;
}
