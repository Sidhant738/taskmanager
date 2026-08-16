package com.backend.taskmanager.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.backend.taskmanager.Entity.User;
import com.backend.taskmanager.Repository.UserRepository;
import com.backend.taskmanager.UserDetail.CustomUserDetails;

@Service
public class CustomUserDetailsService implements UserDetailsService{
    @Autowired
    UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String identifier) 
            throws UsernameNotFoundException{

          User user = userRepo.findByUserNameOrUserEmail(identifier, identifier)
                            .orElseThrow(() ->
                              new UsernameNotFoundException("User not found"));
          return new CustomUserDetails(user);

      }

    
}
