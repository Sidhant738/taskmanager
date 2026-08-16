package com.backend.taskmanager.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.backend.taskmanager.DTO.PasswordChangeDto;
import com.backend.taskmanager.DTO.UserDto;
import com.backend.taskmanager.Service.UserService;
import com.backend.taskmanager.Entity.User;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/username/{userName}")
    public boolean checkUserName(@PathVariable String userName) {
        return userService.existsByUserName(userName);
    }


    @GetMapping("/useremail/{userEmail}")
    public boolean checkUserEmail(@PathVariable String userEmail) {
        return userService.existsByUserEmail(userEmail);
    }


    @GetMapping("/me")
    public UserDto getCurrentUser() {

        return userInfo(userService.getCurrentUser());
    }


    @GetMapping("/getall")
    public List<UserDto> getAllUser() {

        return userService.findAllUser()
                .stream()
                .map(this::userInfo)
                .toList();
    }


    @DeleteMapping("/delete")
    public void deleteUser() {

        userService.deleteCurrentUser();
    }


    @PutMapping("/update")
    public UserDto updateUser(
            @RequestBody UserDto userDto) {

        return userInfo(
                userService.updateUser(userDto)
        );
    }


    @PutMapping("/change-password")
    public String changePassword(
            @RequestBody PasswordChangeDto passwordChangeDto) {
        
         
         userService.changePassword(passwordChangeDto);
        
         return "Password changed successfully";
    }


    private UserDto userInfo(User user) {

        UserDto userResponse = new UserDto();

        userResponse.setUserId(user.getUserId());
        userResponse.setUserName(user.getUserName());
        userResponse.setUserEmail(user.getUserEmail());
        userResponse.setRole(user.getRole());
        userResponse.setCreatedAt(user.getCreatedAt());

        return userResponse;
    }
}