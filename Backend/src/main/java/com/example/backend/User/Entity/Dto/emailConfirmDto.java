package com.example.backend.User.Entity.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class emailConfirmDto {
    String email;

    public String getEmail() {
        return email;
    }
}
