package com.backend.taskmanager.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Taskdto {
    private String title;
    private String description;
    private boolean status;
    private Long userId;
}
