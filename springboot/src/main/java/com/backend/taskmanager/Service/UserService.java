package com.backend.taskmanager.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.taskmanager.Entity.User;
import com.backend.taskmanager.Repository.UserRepository;
import com.backend.taskmanager.DTO.Userdto;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(Userdto userDto) {

        if (userRepository.existsByUserEmail(userDto.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (userRepository.existsByUserName(userDto.getName())) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUserName(userDto.getName());
        user.setUserEmail(userDto.getEmail());
        user.setPassWord(userDto.getPassword());

        return userRepository.save(user);
    }

    public User login(String identifier, String password) {
        User user = userRepository.findByUserNameOrUserEmail(identifier, identifier)
                .orElseThrow(() -> new RuntimeException("Invalid username/email or password"));

        if (!user.getPassWord().equals(password)) {
            throw new RuntimeException("Invalid username/email or password");
        }

        return user;
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

