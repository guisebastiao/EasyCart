package com.guisebastiao.easycart_api.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GenerateResetPasswordDTO {

    @NotBlank(message = "Please enter your e-mail")
    @Size(max = 250, message = "The e-mail is outside the allowed length")
    @Email(message = "The e-mail is invalid, please, enter valid e-mail")
    private String email;
}
