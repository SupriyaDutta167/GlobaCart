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

    // --- USER Registration ---
    public User registerUser(SignupRequest signupRequest) throws Exception {
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
                User.Role.USER // Set role to USER
        );
        return userRepository.save(user);
    }

    // --- SELLER Registration ---
    public User registerSeller(SignupRequest signupRequest) throws Exception {
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
                User.Role.SELLER // Set role to SELLER
        );
        return userRepository.save(user);
    }

    // --- USER Login ---
    public User loginUser(LoginRequest loginRequest) throws Exception {
        User user = findAndValidateUser(loginRequest);

        // **Role Check:** Ensure the user is a USER
        if (user.getRole() != User.Role.USER) {
            throw new Exception("Access denied. Please use the seller login portal.");
        }

        user.setPassword(null); // Remove password before returning
        return user;
    }

    // --- SELLER Login ---
    public User loginSeller(LoginRequest loginRequest) throws Exception {
        User user = findAndValidateUser(loginRequest);

        // **Role Check:** Ensure the user is a SELLER (or ADMIN)
        if (user.getRole() != User.Role.SELLER && user.getRole() != User.Role.ADMIN) {
            throw new Exception("Access denied. Only sellers or admins can log in here.");
        }

        user.setPassword(null); // Remove password before returning
        return user;
    }

    // --- Private helper to avoid code repetition ---
    private User findAndValidateUser(LoginRequest loginRequest) throws Exception {
        // Find user by email
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());
        if (userOpt.isEmpty()) throw new Exception("Invalid email or password");

        User user = userOpt.get();

        // Plain-text password check
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            throw new Exception("Invalid email or password");
        }

        return user;
    }
}