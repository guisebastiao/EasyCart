package com.guisebastiao.easycart_api.services;

import com.guisebastiao.easycart_api.dtos.AuthDTO;
import com.guisebastiao.easycart_api.dtos.AuthResponseDTO;
import com.guisebastiao.easycart_api.dtos.RefreshTokenDTO;
import com.guisebastiao.easycart_api.dtos.ResponseEntityDTO;
import com.guisebastiao.easycart_api.exceptions.DuplicateEntityException;
import com.guisebastiao.easycart_api.exceptions.EntityNotFoundException;
import com.guisebastiao.easycart_api.exceptions.RequiredAuthenticationException;
import com.guisebastiao.easycart_api.models.User;
import com.guisebastiao.easycart_api.repositories.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    @Value("${session.expiration.time}")
    private String durationToken;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public ResponseEntityDTO login(AuthDTO dto) {
        Optional<User> user = this.userRepository.findByEmail(dto.getEmail());

        if (user.isEmpty()) {
            throw new EntityNotFoundException("Essa conta não está cadastrada");
        }

        if (!passwordEncoder.matches(dto.getPassword(), user.get().getPassword())) {
            throw new RequiredAuthenticationException("Credenciais incorretas");
        }

        String token = this.tokenService.generateToken(user.get());

        AuthResponseDTO authResponseDTO = new AuthResponseDTO();
        authResponseDTO.setToken(token);

        ResponseEntityDTO responseDTO = new ResponseEntityDTO();
        responseDTO.setStatus(HttpStatus.OK.value());
        responseDTO.setMessage("Login concluido com sucesso");
        responseDTO.setData(authResponseDTO);
        responseDTO.setSuccess(Boolean.TRUE);

        return responseDTO;
    }

    public ResponseEntityDTO register(AuthDTO dto) {
        Optional<User> existUser = this.userRepository.findByEmail(dto.getEmail());

        if (existUser.isPresent()) {
            throw new DuplicateEntityException("Essa conta já está cadastrada");
        }

        User user = new User();

        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        this.userRepository.save(user);

        String token = this.tokenService.generateToken(user);

        AuthResponseDTO authResponseDTO = new AuthResponseDTO();
        authResponseDTO.setToken(token);

        ResponseEntityDTO responseDTO = new ResponseEntityDTO();

        responseDTO.setStatus(HttpStatus.CREATED.value());
        responseDTO.setMessage("Cadastro concluido com sucesso");
        responseDTO.setData(authResponseDTO);
        responseDTO.setSuccess(Boolean.TRUE);

        return responseDTO;
    }

    public ResponseEntityDTO refreshToken(RefreshTokenDTO dto) {
        String login = this.tokenService.getSubjectFromTokenEvenIfExpired(dto.getToken());

        if (login == null) {
            throw new RequiredAuthenticationException("Por favor faça o login novamente");
        }

        Optional<User> user = this.userRepository.findById(UUID.fromString(login));

        if (user.isEmpty()) {
            throw new RequiredAuthenticationException("Por favor faça o login novamente");
        }

        String newToken = this.tokenService.generateToken(user.get());

        AuthResponseDTO authResponseDTO = new AuthResponseDTO();
        authResponseDTO.setToken(newToken);

        ResponseEntityDTO responseDTO = new ResponseEntityDTO();
        responseDTO.setStatus(HttpStatus.OK.value());
        responseDTO.setMessage("Sua autenticação foi atualizada com sucesso");
        responseDTO.setData(authResponseDTO);
        responseDTO.setSuccess(Boolean.TRUE);

        return responseDTO;
    }
}
