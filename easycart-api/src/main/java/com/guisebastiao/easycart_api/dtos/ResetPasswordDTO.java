package com.guisebastiao.easycart_api.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordDTO {

    @NotBlank(message = "Please enter your password")
    @Size(min = 8, message = "The password must have at least 8 characters")
    @Size(max = 20, message = "The password can´t have more than 20 characters")
    private String password;
}
