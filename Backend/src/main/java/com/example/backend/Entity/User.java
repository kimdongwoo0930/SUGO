package com.example.backend.Entity;


import com.example.backend.Entity.Enum.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class User extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50)
    private String username;
    @Column(length = 50)
    private String student_id;
    @Column(length = 100)
    private String password;
    private String profile_image;
    private String email;
    private boolean check_department;

    @Enumerated(EnumType.STRING)
    private Role role;

}
