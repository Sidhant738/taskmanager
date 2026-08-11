package com.backend.taskmanager.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordChangeDto {
    private Long userId;
    private String newPassword;
}
