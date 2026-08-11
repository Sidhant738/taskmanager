package com.backend.taskmanager.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.backend.taskmanager.DTO.PasswordChangeDto;
import com.backend.taskmanager.Entity.User;
import com.backend.taskmanager.Service.JwtService;
import com.backend.taskmanager.Service.UserService;
import com.backend.taskmanager.exception.BadRequestException;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/username/{userName}")
    public boolean checkUserName(@PathVariable String userName) {
        return userService.existsByUserName(userName);
    }

    @GetMapping("/useremail/{userEmail}")
    public boolean checkUserEmail(@PathVariable String userEmail) {
        return userService.existsByUserEmail(userEmail);
    }

    @GetMapping("/{id}")
    public User findUser(@PathVariable Long id) {
        return userService.findUserById(id);
    }

    @GetMapping("/me")
    public User getCurrentUser(@RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        String username = jwtService.extractUsername(token);
        return userService.findUserByUsername(username);
    }

    @GetMapping("/getall")
    public List<User> getAllUser() {
        return userService.findAllUser();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @PutMapping("/update")
    public User updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @PutMapping("/change-password")
    public User changePassword(@RequestHeader("Authorization") String authorizationHeader,
                               @RequestBody PasswordChangeDto passwordChangeDto) {
        String token = authorizationHeader.replace("Bearer ", "");
        String username = jwtService.extractUsername(token);
        User loggedInUser = userService.findUserByUsername(username);

        if (!loggedInUser.getUserId().equals(passwordChangeDto.getUserId())) {
            throw new BadRequestException("Invalid user for password change");
        }

        return userService.changePassword(passwordChangeDto.getUserId(), passwordChangeDto.getNewPassword());
    }

    @GetMapping("/test")
    public String test() {
        return "Backend Connected";
    }
}
