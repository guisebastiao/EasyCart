package com.guisebastiao.easycart_api.security;

import com.guisebastiao.easycart_api.exceptions.RequiredAuthenticationException;
import com.guisebastiao.easycart_api.models.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthUtil {

    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RequiredAuthenticationException("Por favor faça o login novamente");
        }

        return (User) authentication.getPrincipal();
    }
}
