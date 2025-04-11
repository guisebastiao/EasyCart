package com.guisebastiao.easycart_api.services;

import com.guisebastiao.easycart_api.repositories.ResetPasswordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
@RequiredArgsConstructor
public class DeleteResetPasswordExpired {

    private final ResetPasswordRepository resetPasswordRepository;

    @Transactional
    @Scheduled(fixedDelay = 1000 * 60)
    public void deleteResetPasswordExpired() {
        LocalDateTime threshold = LocalDateTime.now(ZoneOffset.UTC).minusMinutes(5);
        this.resetPasswordRepository.deleteAllByCreatedBefore(threshold);
    }
}
