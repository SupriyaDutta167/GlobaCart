package com.globacart.backend.controller;

import com.globacart.backend.dto.AddToCartRequest;
import com.globacart.backend.dto.CartItemDTO;
import com.globacart.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CartController {

    @Autowired
    private CartService cartService;

    // Get a user's cart
    @GetMapping("/{userId}")
    public ResponseEntity<List<CartItemDTO>> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCart(userId));
    }

    // Add an item to a user's cart
    @PostMapping("/{userId}")
    public ResponseEntity<?> addToCart(@PathVariable Long userId, @RequestBody AddToCartRequest request) {
        try {
            CartItemDTO cartItem = cartService.addToCart(userId, request);
            return ResponseEntity.ok(cartItem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Update quantity of an item
    // We use a RequestParam for simplicity
    @PutMapping("/{userId}/{productId}")
    public ResponseEntity<?> updateCartItemQuantity(@PathVariable Long userId,
                                                    @PathVariable Long productId,
                                                    @RequestParam Integer quantity) {
        try {
            CartItemDTO cartItem = cartService.updateCartItemQuantity(userId, productId, quantity);
            if (cartItem == null) {
                // This means quantity was <= 0 and item was deleted
                return ResponseEntity.ok("Item removed from cart");
            }
            return ResponseEntity.ok(cartItem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Remove an item from the cart
    @DeleteMapping("/{userId}/{productId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long userId, @PathVariable Long productId) {
        cartService.removeFromCart(userId, productId);
        return ResponseEntity.ok("Item removed from cart");
    }
}
