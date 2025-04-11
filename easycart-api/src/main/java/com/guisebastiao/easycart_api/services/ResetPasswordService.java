package com.guisebastiao.easycart_api.services;

import com.guisebastiao.easycart_api.dtos.EmailDTO;
import com.guisebastiao.easycart_api.dtos.GenerateResetPasswordDTO;
import com.guisebastiao.easycart_api.dtos.ResetPasswordDTO;
import com.guisebastiao.easycart_api.dtos.ResponseEntityDTO;
import com.guisebastiao.easycart_api.exceptions.BadRequestException;
import com.guisebastiao.easycart_api.exceptions.EntityNotFoundException;
import com.guisebastiao.easycart_api.models.ResetPassword;
import com.guisebastiao.easycart_api.repositories.ResetPasswordRepository;
import com.guisebastiao.easycart_api.repositories.UserRepository;
import com.guisebastiao.easycart_api.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ResetPasswordService {

    @Value("${api.url}")
    private String apiUrl;
    private final UserRepository userRepository;
    private final ResetPasswordRepository resetPasswordRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final TemplateEngine templateEngine;

    public ResponseEntityDTO generateResetPassword(GenerateResetPasswordDTO dto) {
        Optional<User> user = userRepository.findByEmail(dto.getEmail());

        if (user.isEmpty()) {
            throw new EntityNotFoundException("The email address provided is not registered");
        }

        ResetPassword resetPassword = new ResetPassword();
        resetPassword.setUser(user.get());
        resetPassword.setCreated(LocalDateTime.now(ZoneOffset.UTC));

        ResetPassword passwordReset = resetPasswordRepository.save(resetPassword);

        String resetLink = String.format(this.apiUrl + "/reset-password/" + passwordReset.getId());

        Context context = new Context();
        context.setVariable("recoveryUrl", resetLink);

        String htmlContent = templateEngine.process("password-recovery-email", context);

        this.sendMail(passwordReset.getUser().getEmail(), htmlContent);

        ResponseEntityDTO response = new ResponseEntityDTO();
        response.setStatus(HttpStatus.OK.value());
        response.setMessage("If the email address provided is registered, you will receive instructions to reset your password");
        response.setSuccess(Boolean.TRUE);

        return response;
    }

    @Transactional
    public ResponseEntityDTO resetPassword(String token, ResetPasswordDTO dto) {
        UUID id = UUID.fromString(token);
        Optional<ResetPassword> resetPassword = this.resetPasswordRepository.findById(id);

        if(resetPassword.isEmpty()) {
            throw new BadRequestException("Your password reset session has expired or your password has already been changed, please click reset again");
        }

        ResetPassword resetPasswordEntity = resetPassword.get();
        User user = resetPasswordEntity.getUser();

        User userPasswordReset = new User();
        userPasswordReset.setId(user.getId());
        userPasswordReset.setEmail(user.getEmail());
        userPasswordReset.setPassword(passwordEncoder.encode(dto.getPassword()));

        this.userRepository.save(userPasswordReset);
        this.resetPasswordRepository.delete(resetPasswordEntity);

        ResponseEntityDTO response = new ResponseEntityDTO();
        response.setStatus(HttpStatus.OK.value());
        response.setMessage("Your password has been reset successfully");
        response.setSuccess(Boolean.TRUE);
        return response;
    }

    private void sendMail(String email, String htmlContent) {
        EmailDTO emailDTO = new EmailDTO();
        emailDTO.setTo(email);
        emailDTO.setSubject("Password Reset - EasyCart");
        this.emailService.sendEmail(emailDTO, htmlContent);
    }
}
