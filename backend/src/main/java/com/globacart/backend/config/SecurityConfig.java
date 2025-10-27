package com.globacart.backend.config;

// ... other imports (like JwtAuthFilter, AuthenticationProvider, etc.)
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
// Add @EnableWebSecurity if it's missing
public class SecurityConfig {

    // You likely have an Autowired JwtAuthFilter here
    // @Autowired
    // private JwtAuthFilter jwtAuthFilter;

    // You may also have an AuthenticationProvider bean

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // Disable CSRF
                .authorizeHttpRequests(auth -> auth

                        // --- 1. Allow all your AUTH endpoints ---
                        .requestMatchers("/api/auth/**").permitAll()

                        // --- 2. Allow BROWSING products without login ---
                        .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()

                        // --- 3. (THE FIX) Allow Cart & Order routes FOR NOW ---
                        // We permit these for testing since you pass userId in the URL.
                        // Later, you will remove "{userId}" and secure these.
                        .requestMatchers("/api/cart/**", "/api/orders/**").permitAll()

                        // --- 4. (THE FIX) Change this line ---
                        .anyRequest().permitAll() // Change from .authenticated() to .permitAll()
                )
        // --- 5. Add your JWT filter (if you have one) ---
        // .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        // .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
        ;

        return http.build();
    }
}

