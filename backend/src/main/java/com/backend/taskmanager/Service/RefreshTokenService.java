package com.backend.taskmanager.Service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.taskmanager.Entity.RefreshToken;
import com.backend.taskmanager.Entity.User;
import com.backend.taskmanager.Repository.RefreshTokenRepository;
import com.backend.taskmanager.exception.BadRequestException;

@Service
public class RefreshTokenService {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    public RefreshToken createRefreshToken(User user) {

        RefreshToken refreshToken = new RefreshToken();

        refreshToken.setUser(user);
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpiryDate(
                LocalDateTime.now().plusDays(7)
        );

        return refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken verifyRefreshToken(String token) {

        RefreshToken refreshToken =
                refreshTokenRepository.findByToken(token)
                .orElseThrow(() ->
                        new BadRequestException(
                                "Invalid refresh token"
                        )
                );

        if (refreshToken.getExpiryDate()
                .isBefore(LocalDateTime.now())) {

            refreshTokenRepository.delete(refreshToken);

            throw new BadRequestException(
                    "Refresh token expired"
            );
        }

        return refreshToken;
    }
}