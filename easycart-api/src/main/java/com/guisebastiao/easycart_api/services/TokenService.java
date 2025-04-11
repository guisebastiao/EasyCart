package com.guisebastiao.easycart_api.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.guisebastiao.easycart_api.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
@RequiredArgsConstructor
public class TokenService {

    @Value("${auth.jwt.token.secret}")
    private String secretToken;

    @Value("${session.expiration.time}")
    private String durationToken;

    public String generateToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(this.secretToken);

            return JWT.create()
                    .withIssuer("easycart-api")
                    .withSubject(user.getId().toString())
                    .withExpiresAt(this.generateExpirationDate())
                    .sign(algorithm);
        } catch (JWTCreationException exception) {
            throw new JWTCreationException("JWT generation failed", exception);
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(this.secretToken);

            return JWT.require(algorithm)
                    .withIssuer("easycart-api")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception) {
            return null;
        }
    }

    private Instant generateExpirationDate() {
        int jwtDuration = Integer.parseInt(this.durationToken);
        return LocalDateTime.now().plusHours(jwtDuration).toInstant(ZoneOffset.UTC);
    }
}
