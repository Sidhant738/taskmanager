package com.backend.taskmanager.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDto {
    
    @NotBlank
    private String identifier;

    @NotBlank
    private String password;
}
