package com.example.backend.User.Entity;

import com.example.backend.User.Entity.Enum.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;


@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Data
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50)
    private String username;
    @Column(length = 50)
    private String studentId;
    @Column(length = 100)
    private String password;
    private String profile_image;
    private String email;
    private String check_department;

    @Enumerated(EnumType.STRING)
    private Role role;

    public void encodePassword(PasswordEncoder passwordEncoder){
        this.password = passwordEncoder.encode(password);
    }

}
