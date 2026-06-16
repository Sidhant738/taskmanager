package com.backend.taskmanager.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.taskmanager.Entity.User;
import com.backend.taskmanager.Repository.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    
    public User createUser(User user){
      Optional<User> userExist=userRepository.findByUserEmail(user.getUserEmail());
      if(userExist.isPresent()){
        throw new RuntimeException("User already exist");
      }
      return userRepository.save(user);
    }

    public User findUserById(Long id){
        return userRepository.findById(id)
                             .orElseThrow(()->new RuntimeException("User Not found"));
    }

    public List<User> findAllUser(){
        return userRepository.findAll();
    }

    public void deleteUser(long id){
        if(!userRepository.existsById(id)){
            throw new RuntimeException("User not found");
        } 
        userRepository.deleteById(id);
    }
    
    public User UpdateUser(User user){
       User existingUser=findUserById(user.getUserId());

        existingUser.setUserEmail(user.getUserEmail());
        existingUser.setUserName(user.getUserName());

        return userRepository.save(existingUser);
    }

}
