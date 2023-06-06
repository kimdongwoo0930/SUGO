package com.example.backend.Controller;

import com.example.backend.Entity.Dto.Account.SignupDto;
import com.example.backend.Entity.User;
import com.example.backend.Service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AccountController {

    @Autowired
    AccountService accountService;


    //로그인

    //회원가입
    @PostMapping("/signup")
    public User signup(@RequestBody SignupDto signupDto){

        return accountService.signup(signupDto);
    }
    //학번 중복체크
    @GetMapping ("/existId/{Id}")
    public boolean exist_Id(@PathVariable String Id){
        return accountService.exist_id(Id);
    }
}
