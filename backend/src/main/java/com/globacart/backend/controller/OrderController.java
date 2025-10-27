package com.globacart.backend.controller;

import com.globacart.backend.dto.CreateOrderRequest;
import com.globacart.backend.dto.OrderDTO;
import com.globacart.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Create an order from the user's cart
    @PostMapping("/{userId}")
    public ResponseEntity<?> createOrder(@PathVariable Long userId, @RequestBody CreateOrderRequest request) {
        try {
            OrderDTO order = orderService.createOrder(userId, request);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get a user's order history
    @GetMapping("/{userId}")
    public ResponseEntity<List<OrderDTO>> getOrderHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getOrderHistory(userId));
    }
}
