package com.backend.taskmanager.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="usertable")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique=true,nullable=false)
    private Long userId;

    @Column(unique=true,nullable=false)
    private String userName;

    @Column(unique = true,nullable = false)
    private String userEmail;
    
    @Column(nullable = false)
    private String passWord;

   
    
}
