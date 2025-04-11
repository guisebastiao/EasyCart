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

    @NotBlank(message = "Please enter your e-mail")
    @Size(max = 250, message = "The e-mail is outside the allowed length")
    @Email(message = "The e-mail is invalid, please, enter valid e-mail")
    private String email;

    @NotBlank(message = "Please enter your password")
    @Size(min = 8, message = "The password must have at least 8 characters")
    @Size(max = 20, message = "The password can´t have more than 20 characters")
    private String password;
}