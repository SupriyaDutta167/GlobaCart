package com.globacart.backend.controller;

import com.globacart.backend.dto.LoginRequest;
import com.globacart.backend.dto.SignupRequest;
import com.globacart.backend.model.User;
import com.globacart.backend.service.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    @Autowired
    private AuthService authService;

    // --- USER Registration ---
    @PostMapping("/register/user")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {
        try {
            User user = authService.registerUser(signupRequest);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // --- SELLER Registration ---
    @PostMapping("/register/seller")
    public ResponseEntity<?> registerSeller(@RequestBody SignupRequest signupRequest) {
        try {
            User user = authService.registerSeller(signupRequest);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // --- USER Login ---
    @PostMapping("/login/user")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest, HttpSession session) {
        try {
            User user = authService.loginUser(loginRequest);
            session.setAttribute("user", user); // store user in session
            session.setAttribute("userId", user.getId()); // <-- ADD THIS LINE
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // --- SELLER Login ---
    @PostMapping("/login/seller")
    public ResponseEntity<?> loginSeller(@RequestBody LoginRequest loginRequest, HttpSession session) {
        try {
            User user = authService.loginSeller(loginRequest);
            session.setAttribute("user", user); // store user in session
            session.setAttribute("userId", user.getId()); // <-- ADD THIS LINE
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // --- Logout (unchanged) ---
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out successfully");
    }

    // --- Check session (unchanged) ---
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if(user == null) return ResponseEntity.status(401).body("Not logged in");
        return ResponseEntity.ok(user);
    }
}

