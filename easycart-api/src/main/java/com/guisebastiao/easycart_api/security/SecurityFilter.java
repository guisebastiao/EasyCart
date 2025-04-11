package com.guisebastiao.easycart_api.security;

import com.guisebastiao.easycart_api.models.User;
import com.guisebastiao.easycart_api.repositories.UserRepository;
import com.guisebastiao.easycart_api.services.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class SecurityFilter extends OncePerRequestFilter {

    private final TokenService tokenService;
    private final UserRepository userRepository;

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String token = this.recoverToken(request, response);
        String login = this.tokenService.validateToken(token);

        if (login != null) {
            UUID uuid = UUID.fromString(login);

            Optional<User> user = this.userRepository.findById(uuid);

            if (user.isEmpty()) {
                chain.doFilter(request, response);
                return;
            }

            User presentUser = user.get();

            var authentication = new UsernamePasswordAuthenticationToken(presentUser, null, presentUser.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        chain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request, HttpServletResponse response) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.split(" ")[0].equals("Bearer")) {
            return null;
        }

        return authHeader.split(" ")[1];
    }
}
