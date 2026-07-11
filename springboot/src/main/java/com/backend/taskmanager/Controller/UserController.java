package com.backend.taskmanager.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.backend.taskmanager.Entity.User;
import com.backend.taskmanager.Service.UserService;
import com.backend.taskmanager.DTO.Userdto;
import com.backend.taskmanager.DTO.Logindto;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public User createUser(@RequestBody Userdto user) {
        return userService.createUser(user);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody Logindto loginDto) {
        return userService.login(loginDto.getIdentifier(), loginDto.getPassword());
    }

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

    @GetMapping("/test")
    public String test() {
        return "Backend Connected";
    }
}
