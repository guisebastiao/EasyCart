package com.guisebastiao.easycart_api.controllers;

import com.guisebastiao.easycart_api.dtos.ResponseEntityDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class HealthController {

    @GetMapping
    public ResponseEntity<ResponseEntityDTO> health() {
        ResponseEntityDTO response = new ResponseEntityDTO();
        response.setStatus(HttpStatus.OK.value());
        response.setMessage("A API esta rodando");
        response.setSuccess(Boolean.TRUE);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
