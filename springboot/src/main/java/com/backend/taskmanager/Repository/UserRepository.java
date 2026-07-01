package com.backend.taskmanager.Repository;
import com.backend.taskmanager.Entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByUserEmail(String userEmail);

    boolean existsByUserName(String userName);

}
