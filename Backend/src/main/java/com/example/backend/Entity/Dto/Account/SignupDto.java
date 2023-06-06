package com.example.backend.Entity.Dto.Account;

import com.example.backend.Entity.Enum.Role;
import com.example.backend.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignupDto {
    private String username;
    private String studentId;
    private String password;
    private String email;

    public User toEntity(){
        return User.builder()
                .username(username)
                .studentId(studentId)
                .password(password)
                .email(email)
                .role(Role.USER)
                .check_department("false")
                .profile_image("")
                .build();
    }
}
