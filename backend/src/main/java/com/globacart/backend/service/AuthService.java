package com.globacart.backend.service;

import com.globacart.backend.dto.LoginRequest;
import com.globacart.backend.dto.SignupRequest;
import com.globacart.backend.model.User;
import com.globacart.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    // Registration
    public User register(SignupRequest signupRequest) throws Exception {
        if(userRepository.findByUsername(signupRequest.getUsername()).isPresent()) {
            throw new Exception("Username already taken");
        }
        if(userRepository.findByEmail(signupRequest.getEmail()).isPresent()) {
            throw new Exception("Email already registered");
        }

        User user = new User(
                signupRequest.getUsername(),
                signupRequest.getEmail(),
                signupRequest.getPassword(), // plain text
                User.Role.USER
        );
        return userRepository.save(user);
    }

    // Path: backend/src/main/java/com/globacart/backend/service/AuthService.java
    public User login(LoginRequest loginRequest) throws Exception {
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());
        if (userOpt.isEmpty()) throw new Exception("Invalid email or password");

        User user = userOpt.get();

        // Plain-text password check (no bcrypt)
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            throw new Exception("Invalid email or password");
        }

        // Remove password before returning to frontend
        user.setPassword(null);
        return user;
    }

}
