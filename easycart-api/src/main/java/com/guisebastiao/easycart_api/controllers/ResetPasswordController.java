package com.guisebastiao.easycart_api.controllers;

import com.guisebastiao.easycart_api.dtos.GenerateResetPasswordDTO;
import com.guisebastiao.easycart_api.dtos.ResetPasswordDTO;
import com.guisebastiao.easycart_api.dtos.ResponseEntityDTO;
import com.guisebastiao.easycart_api.services.ResetPasswordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reset-password")
public class ResetPasswordController {

    private final ResetPasswordService resetPasswordService;

    @PostMapping
    public ResponseEntity<ResponseEntityDTO> generateResetPassword(@RequestBody @Valid GenerateResetPasswordDTO dto) {
        ResponseEntityDTO response = resetPasswordService.generateResetPassword(dto);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @PutMapping()
    public ResponseEntity<ResponseEntityDTO> resetPassword(@RequestParam String token, @RequestBody @Valid ResetPasswordDTO dto) {
        ResponseEntityDTO response = resetPasswordService.resetPassword(token, dto);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
