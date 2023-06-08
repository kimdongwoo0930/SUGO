package com.example.backend.User.Controller;

import com.example.backend.User.Entity.Dto.EmailDto;
import com.example.backend.User.Entity.Dto.ResponseDto;
import com.example.backend.User.Service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class EmailController {
    @Autowired
    MailService mailService;


    // 회원가입 학생 인증 이메일 전송 api
    @PostMapping("/signup/mailConfirm/{email}")
    public ResponseDto mailConfirm(@PathVariable String email) throws Exception{
        ResponseDto responseDto = mailService.sendSimpleMessage(email);
        System.out.println("인증코드 : " + responseDto);
        return responseDto;
    }

    // 회원가입 학생 인증 이메일 인증번호 확인 api
    @PostMapping("/signup/verifyCode")
    public ResponseDto verifyCode(@RequestBody EmailDto emailDto){
        if(MailService.ePw.equals(emailDto.getCode())){
            return new ResponseDto(true,"인증 완료");
        }
        return new ResponseDto(false,"인증번호가 올바르지 않습니다.");
    }
}
