package com.example.backend.Service;

import com.example.backend.Entity.Dto.Account.SignupDto;
import com.example.backend.Entity.User;
import com.example.backend.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class AccountService {

    @Autowired private UserRepository userRepository;



    // 학번 중복 확인
    @Transactional(readOnly = true)
    public boolean exist_id(String id){
        return userRepository.existsByStudentId(id);
    }

    @Transactional
    public User signup(SignupDto signupDto) {
        User user = signupDto.toEntity();

        return userRepository.save(user);
    }
}
