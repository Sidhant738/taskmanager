package com.backend.taskmanager.DTO;

import java.time.LocalDateTime;

import com.backend.taskmanager.Entity.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {

    private Long userId;
    private String userName;
    private String userEmail;
    private Role role;
    private LocalDateTime createdAt;
}