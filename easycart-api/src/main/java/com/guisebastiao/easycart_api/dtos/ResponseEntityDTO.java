package com.guisebastiao.easycart_api.dtos;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@Getter
@Setter
public class ResponseEntityDTO {
    private int status;

    private String message;

    private Object data;

    private Boolean success;

    private Boolean isAuthenticated;

    private PagingDTO paging;

    private List<FieldErrorDTO> fieldErrors;

    public ResponseEntityDTO() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        this.isAuthenticated = authentication != null && authentication.isAuthenticated();
    }
}
