// Path: backend/src/main/java/com/globacart/backend/dto/LoginRequest.java
package com.globacart.backend.dto;

public class LoginRequest {
    private String email;      // changed from username to email
    private String password;

    // Getters and setters
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
