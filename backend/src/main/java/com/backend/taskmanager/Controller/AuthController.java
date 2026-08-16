package com.backend.taskmanager.Controller;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.taskmanager.DTO.LoginDto;
import com.backend.taskmanager.DTO.RegisterDto;
import com.backend.taskmanager.DTO.TokenResponse;
import com.backend.taskmanager.Entity.RefreshToken;
import com.backend.taskmanager.Entity.User;
import com.backend.taskmanager.Service.JwtService;
import com.backend.taskmanager.Service.RefreshTokenService;
import com.backend.taskmanager.Service.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @PostMapping("/login")
    public ResponseEntity<String> authenticate(
            @RequestBody LoginDto loginDto) {

        String username =
                userService
                        .findByUserNameOrUserEmail(
                                loginDto.getIdentifier()
                        )
                        .getUserName();

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username,
                        loginDto.getPassword()
                )
        );

        userService.cancelScheduledDeletion(username);

        User user =
                userService.findByUserNameOrUserEmail(username);

        String accessToken =
                jwtService.generateToken(username);

        ResponseCookie refreshCookie =
                createRefreshCookie(
                        refreshTokenService
                                .createRefreshToken(user)
                                .getToken()
                );

        return ResponseEntity
                .ok()
                .header(
                        HttpHeaders.SET_COOKIE,
                        refreshCookie.toString()
                )
                .body(accessToken);
    }

    @PostMapping("/register")
    public ResponseEntity<String> createUser(
            @RequestBody RegisterDto registerDto) {

        String accessToken =
                userService.createUser(registerDto);

        User user =
                userService.findByUserNameOrUserEmail(
                        registerDto.getName()
                );

        RefreshToken refreshToken =
                refreshTokenService
                        .createRefreshToken(user);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .header(
                        HttpHeaders.SET_COOKIE,
                        createRefreshCookie(
                                refreshToken.getToken()
                        ).toString()
                )
                .body(accessToken);
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refreshToken(
            @CookieValue("refreshToken")
            String refreshToken) {

        RefreshToken verifiedToken =
                refreshTokenService
                        .verifyRefreshToken(refreshToken);

        String accessToken =
                jwtService.generateToken(
                        verifiedToken
                                .getUser()
                                .getUserName()
                );

        return ResponseEntity.ok(
                new TokenResponse(accessToken)
        );
    }

    private ResponseCookie createRefreshCookie(
            String token) {

        return ResponseCookie
                .from("refreshToken", token)
                .httpOnly(true)
                .secure(false)
                .path("/auth")
                .maxAge(Duration.ofDays(7))
                .sameSite("Lax")
                .build();
    }
}
