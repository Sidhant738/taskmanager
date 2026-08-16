package com.backend.taskmanager.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordChangeDto {
    private String oldPassword;
    private String newPassword;
    
}
