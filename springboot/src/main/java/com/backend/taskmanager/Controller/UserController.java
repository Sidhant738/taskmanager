package com.backend.taskmanager.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.backend.taskmanager.Entity.User;
import com.backend.taskmanager.Service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
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
