package com.example.backend.Controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Account {


    //로그인

    //회원가입

    //학번 중복체크
    @PostMapping("/exitId")
    public boolean exist_Id(){
        return true;
    }
}
