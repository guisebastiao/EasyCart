package com.guisebastiao.easycart_api.repositories;

import com.guisebastiao.easycart_api.models.ResetPassword;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.UUID;

public interface ResetPasswordRepository extends JpaRepository<ResetPassword, UUID> {
    long deleteAllByCreatedBefore(LocalDateTime expirationTime);
}
