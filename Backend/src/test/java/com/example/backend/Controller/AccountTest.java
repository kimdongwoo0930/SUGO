package com.example.backend.Controller;


import com.example.backend.Entity.Dto.Account.SignupDto;
import com.example.backend.Entity.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@AutoConfigureMockMvc
@SpringBootTest
class AccountTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;



    // 학번 중복 체크 테스트 코드
    @Test
    public void 학번_중복체크_테스트() throws Exception{
        String id = "21017007";

        mvc.perform(get("/existId/"+id))
                .andExpect(status().isOk())
                .andExpect(content().string("true"))
                .andDo(print());
    }

    // 회원가입 테스트 코드

    @Test
    public void 회원가입_테스트() throws  Exception{
        String username = "김동우";
        String studentId = "21017007";
        String password = "password123";
        String email = "johndoe@suwon.ac.kr";

        SignupDto signupDto = SignupDto.builder()
                .username(username)
                .studentId(studentId)
                .password(password)
                .email(email)
                .build();


        mvc.perform(post("/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(signupDto)))
                .andExpect(status().isOk())
                .andDo(print());
    }

    // 로그인 테스트

    // 이메일 인증 테스트

}