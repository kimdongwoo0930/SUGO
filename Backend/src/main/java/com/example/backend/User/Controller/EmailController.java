package com.example.backend.User.Controller;

import com.example.backend.User.Entity.Dto.EmailDto;
import com.example.backend.User.Entity.Dto.ResponseDto;
import com.example.backend.User.Entity.Dto.emailConfirmDto;
import com.example.backend.User.Service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class EmailController {
    @Autowired
    MailService mailService;


    // 회원가입 학생 인증 이메일 전송 api
    @PostMapping("/signup/mailConfirm")
    public ResponseDto mailConfirm(@RequestBody Map<String,String> email) throws Exception{
        ResponseDto responseDto = mailService.sendSimpleMessage(email.get("email"));
        System.out.println("인증코드 : " + responseDto);
        return responseDto;
    }

    // 회원가입 학생 인증 이메일 인증번호 확인 api
    @PostMapping("/signup/verifyCode")
    public ResponseDto verifyCode(@RequestBody EmailDto emailDto){
        ResponseDto responseDto = mailService.equalEPw(emailDto.getEmail(),emailDto.getCode());
        return responseDto;
    }
}

