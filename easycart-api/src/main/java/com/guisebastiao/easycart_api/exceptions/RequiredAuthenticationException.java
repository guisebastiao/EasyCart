package com.guisebastiao.easycart_api.exceptions;

public class RequiredAuthenticationException extends RuntimeException {
    public RequiredAuthenticationException(String message) {
        super(message);
    }
}
