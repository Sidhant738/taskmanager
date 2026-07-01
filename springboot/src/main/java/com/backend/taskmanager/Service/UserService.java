package com.backend.taskmanager.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.taskmanager.Entity.User;
import com.backend.taskmanager.Repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {

        if (userRepository.existsByUserEmail(user.getUserEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (userRepository.existsByUserName(user.getUserName())) {
            throw new RuntimeException("Username already exists");
        }

        return userRepository.save(user);
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

