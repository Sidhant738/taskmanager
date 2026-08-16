package com.backend.taskmanager.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.taskmanager.DTO.PasswordChangeDto;
import com.backend.taskmanager.DTO.RegisterDto;
import com.backend.taskmanager.DTO.UserDto;
import com.backend.taskmanager.Entity.Role;
import com.backend.taskmanager.Entity.User;
import com.backend.taskmanager.Repository.UserRepository;
import com.backend.taskmanager.exception.BadRequestException;
import com.backend.taskmanager.exception.ConflictException;
import com.backend.taskmanager.exception.ResourceNotFoundException;

@Service
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;


    public String createUser(RegisterDto registerDto) {

        if (userRepository.existsByUserEmail(
                registerDto.getEmail())) {

            throw new ConflictException(
                    "Email already exists"
            );
        }

        if (userRepository.existsByUserName(
                registerDto.getName())) {

            throw new ConflictException(
                    "Username already exists"
            );
        }

        User user = new User();

        user.setUserName(registerDto.getName());
        user.setUserEmail(registerDto.getEmail());

        user.setPassword(
                passwordEncoder.encode(
                        registerDto.getPassword()
                )
        );

        user.setRole(Role.USER);

        userRepository.save(user);

        return jwtService.generateToken(
                user.getUserName()
        );
    }


    public boolean existsByUserName(String userName) {
        return userRepository.existsByUserName(userName);
    }


    public boolean existsByUserEmail(String userEmail) {
        return userRepository.existsByUserEmail(userEmail);
    }


    public User findUserById(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        ));
    }


    public User findByUserNameOrUserEmail(
            String identifier) {
        
        return userRepository
                .findByUserNameOrUserEmail(
                        identifier,
                        identifier
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        ));
    }


    public List<User> findAllUser() {
        return userRepository.findAll();
    }


    public void deleteCurrentUser() {

        User existingUser = getCurrentUser();

        existingUser.setScheduledForDeletion(true);

        existingUser.setDeletionScheduledAt(
                LocalDateTime.now().plusDays(7)
        );

        userRepository.save(existingUser);
    }


    @Scheduled(fixedRateString = "PT1H")
    public void cleanupScheduledUsers() {

        List<User> users =
                userRepository
                        .findByScheduledForDeletionTrueAndDeletionScheduledAtBefore(
                                LocalDateTime.now()
                        );

        for (User user : users) {
            userRepository.delete(user);
        }
    }


    public void cancelScheduledDeletion(String username) {

        User user = findByUserNameOrUserEmail(username);

        if (!user.isScheduledForDeletion()) {
            return;
        }

        user.setScheduledForDeletion(false);
        user.setDeletionScheduledAt(null);

        userRepository.save(user);
    }


    public User updateUser(UserDto userDto) {

        User existingUser = getCurrentUser();

        if (!existingUser.getUserName()
                .equals(userDto.getUserName())
                && userRepository.existsByUserName(
                        userDto.getUserName())) {

            throw new ConflictException(
                    "Username already exists"
            );
        }

        if (!existingUser.getUserEmail()
                .equals(userDto.getUserEmail())
                && userRepository.existsByUserEmail(
                        userDto.getUserEmail())) {

            throw new ConflictException(
                    "Email already exists"
            );
        }

        existingUser.setUserName(
                userDto.getUserName()
        );

        existingUser.setUserEmail(
                userDto.getUserEmail()
        );

        return userRepository.save(existingUser);
    }


    public void changePassword(
            PasswordChangeDto dto) {

        User existingUser = getCurrentUser();

        if (!passwordEncoder.matches(
                dto.getOldPassword(),
                existingUser.getPassword())) {

            throw new BadRequestException(
                    "Current password is incorrect"
            );
        }

        existingUser.setPassword(
                passwordEncoder.encode(
                        dto.getNewPassword()
                )
        );

        userRepository.save(existingUser);
    }


    public User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String username = authentication.getName();

        return userRepository
                .findByUserName(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        ));
    }
}