package com.example.backend.User.Service;

import com.example.backend.User.Entity.Dto.LoginDto;
import com.example.backend.User.Entity.Dto.ResponseDto;
import com.example.backend.User.Entity.Dto.SignupDto;
import com.example.backend.User.Entity.User;
import com.example.backend.User.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class AccountService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;



    // 학번 중복 확인
    @Transactional(readOnly = true)
    public boolean exist_id(String id){
        return userRepository.existsByStudentId(id);
    }

    @Transactional
    public User signup(SignupDto signupDto) {
        User user = userRepository.save(signupDto.toEntity());
        user.encodePassword(passwordEncoder);

        return user;
    }


    @Transactional(readOnly = true)
    public ResponseDto login(LoginDto loginDto){
        if(!userRepository.existsByStudentId(loginDto.getStudentId())){
            ResponseDto responseDto = new ResponseDto(false,"존재하지 않는 아이디입니다.");
            return responseDto;
        }
        User user = userRepository.findByStudentId(loginDto.getStudentId());
//                .orElseThrow(()-> new IllegalArgumentException("존재하지 않는 학번입니다."));
        if(!checkPassword(passwordEncoder, loginDto.getPassword(), user)){
            ResponseDto responseDto = new ResponseDto(false,"올바르지 않은 비밀번호입니다.");
            return responseDto;
        }
        // TODO : 비밀번호 비교를 한 후 추후에 responseDto로 바꿔야 한다.
        return new ResponseDto(true,"로그인 완료");
    }



    public Boolean checkPassword(PasswordEncoder passwordEncoder, String password, User user){
        return passwordEncoder.matches(password, user.getPassword());
    }
}
