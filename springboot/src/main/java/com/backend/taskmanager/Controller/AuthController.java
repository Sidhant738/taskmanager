package com.backend.taskmanager.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import com.backend.taskmanager.DTO.Logindto;
import com.backend.taskmanager.DTO.Registerdto;
import com.backend.taskmanager.Entity.User;
import com.backend.taskmanager.Service.JwtService;
import com.backend.taskmanager.Service.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

     @PostMapping("/login")
    public String authenticate(@RequestBody Logindto request) {
        authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()));

        
        String token=jwtService.generateToken(request.getUsername());

        return token;
    }

     @PostMapping("/register")
     public String createUser(@RequestBody Registerdto user) {
        return userService.createUser(user);
    }
    
}
