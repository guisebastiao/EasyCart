package com.guisebastiao.easycart_api.controllers;

import com.guisebastiao.easycart_api.dtos.AuthDTO;
import com.guisebastiao.easycart_api.dtos.RefreshTokenDTO;
import com.guisebastiao.easycart_api.dtos.ResponseEntityDTO;
import com.guisebastiao.easycart_api.services.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ResponseEntityDTO> login(@RequestBody @Valid AuthDTO dto) {
        ResponseEntityDTO responseDTO = this.authService.login(dto);
        return ResponseEntity.status(responseDTO.getStatus()).body(responseDTO);
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseEntityDTO> register(@RequestBody @Valid AuthDTO dto) {
        ResponseEntityDTO responseDTO = this.authService.register(dto);
        return ResponseEntity.status(responseDTO.getStatus()).body(responseDTO);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<ResponseEntityDTO> refreshToken(@RequestBody RefreshTokenDTO dto) {
        ResponseEntityDTO responseDTO = this.authService.refreshToken(dto);
        return ResponseEntity.status(responseDTO.getStatus()).body(responseDTO);
    }
}
