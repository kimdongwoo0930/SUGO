package com.example.backend.User.Repository;

import com.example.backend.User.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByStudentId(String id);

   User findByStudentId(String id);
}
