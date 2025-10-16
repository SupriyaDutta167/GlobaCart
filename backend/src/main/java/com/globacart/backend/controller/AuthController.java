package com.globacart.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.globacart.backend.dto.SignupRequest;
import com.globacart.backend.model.User;
import com.globacart.backend.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody SignupRequest request) {
        try {
            User user = new User();
            user.setUsername(request.getUsername());
            user.setEmail(request.getEmail());
            user.setPassword(request.getPassword());

            User registeredUser = authService.registerUser(user);
            return ResponseEntity.ok("User registered successfully: " + registeredUser.getUsername());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // login will be handled automatically by Spring Security (HTTP Basic)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody SignupRequest request) {
        try {
            User user = authService.authenticate(request.getUsername(), request.getPassword());
            return ResponseEntity.ok("Login successful: " + user.getUsername());
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}
