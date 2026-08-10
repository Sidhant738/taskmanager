package com.backend.taskmanager.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.taskmanager.DTO.Registerdto;
import com.backend.taskmanager.Entity.Role;
import com.backend.taskmanager.Entity.User;
import com.backend.taskmanager.Repository.UserRepository;
import com.backend.taskmanager.Service.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    public String createUser(Registerdto registerDto) {

        if (userRepository.existsByUserEmail(registerDto.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (userRepository.existsByUserName(registerDto.getName())) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUserName(registerDto.getName());
        user.setUserEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setRole(Role.USER);
        userRepository.save(user);

        return jwtService.generateToken(registerDto.getName());
    }


    public boolean existsByUserName(String userName) {
        return userRepository.existsByUserName(userName);
    }

    public boolean existsByUserEmail(String userEmail) {
        return userRepository.existsByUserEmail(userEmail);
    }

    public User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<User> findAllUser() {
        return userRepository.findAll();
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }

        userRepository.deleteById(id);
    }

    public User updateUser(User user) {

        User existingUser = findUserById(user.getUserId());

        existingUser.setUserName(user.getUserName());
        existingUser.setUserEmail(user.getUserEmail());

        return userRepository.save(existingUser);
    }
   
}
