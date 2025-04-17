package com.guisebastiao.easycart_api.services;

import com.guisebastiao.easycart_api.dtos.EmailDTO;
import com.guisebastiao.easycart_api.exceptions.BadRequestException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    @Value("${spring.mail.username}")
    private String emailFrom;
    private final JavaMailSender mailSender;


    public void sendEmail(EmailDTO dto, String htmlContent) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setFrom(emailFrom);
            helper.setTo(dto.getTo());
            helper.setSubject(dto.getSubject());
            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new BadRequestException("Algo deu errado, tente novamente mais tarde");
        }
    }
}
