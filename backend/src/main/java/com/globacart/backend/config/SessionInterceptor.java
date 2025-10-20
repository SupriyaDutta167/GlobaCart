package com.globacart.backend.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerInterceptor;

public class SessionInterceptor implements HandlerInterceptor {
    private static final String SESSION_USER_KEY = "userId";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // Only protect /api/cart/** and /api/orders/** for example
        String path = request.getRequestURI();
        if (path.startsWith("/api/cart") || path.startsWith("/api/orders")) {
            Object uid = request.getSession().getAttribute(SESSION_USER_KEY);
            if (uid == null) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Unauthorized - please login");
                return false;
            }
        }
        return true;
    }
}
