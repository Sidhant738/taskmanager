package com.backend.taskmanager.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.taskmanager.Entity.User;
import com.backend.taskmanager.Service.UserService;

@RestController
public class UserController {
    @Autowired
    UserService userService;
    
    
    @PostMapping("/user")
    public User creatUser(@RequestBody User user){
        return userService.createUser(user);
    }

    @RequestMapping("/user/{id}")
    public User findUser(@PathVariable("id") Long id){
        return userService.findUserById(id);
    }

    @RequestMapping("/user/getall")
    public List<User> getallUser(){
        return userService.findAllUser();
    }
    
     @RequestMapping("/user/delete/{id}")
    public void deleteUser(@PathVariable("id") Long id){
        userService.deleteUser(id);
    }
   
    @PostMapping("/user/update")
    public User updateUser(@RequestBody User user){
        return userService.UpdateUser(user);
    }
}
