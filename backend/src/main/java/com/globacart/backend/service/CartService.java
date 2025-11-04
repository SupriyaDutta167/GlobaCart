package com.globacart.backend.service;

import com.globacart.backend.dto.AddToCartRequest;
import com.globacart.backend.dto.CartItemDTO;
import com.globacart.backend.dto.ProductCartDTO; // <--- IMPORT THE NEW DTO
import com.globacart.backend.model.CartItem;
import com.globacart.backend.model.Product;
import com.globacart.backend.model.User;
import com.globacart.backend.repository.CartItemRepository;
import com.globacart.backend.repository.ProductRepository;
import com.globacart.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {

    // ... (Autowired properties are unchanged)
    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;


    // Get all items in a user's cart
    public List<CartItemDTO> getCart(Long userId) {
        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);

        // --- THIS LOGIC IS MODIFIED ---
        return cartItems.stream().map(item -> {
            Product p = item.getProduct();

            // 1. Create the nested product DTO
            ProductCartDTO productDTO = new ProductCartDTO(p);

            // 2. Create the main CartItemDTO
            //    It passes the productDTO and the cart quantity
            return new CartItemDTO(productDTO, item.getQuantity());

        }).collect(Collectors.toList());
    }

    // Add an item to the cart, or update quantity if it already exists
    @Transactional
    public CartItemDTO addToCart(Long userId, AddToCartRequest request) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new Exception("Product not found"));

        if (!product.getAvailable() || product.getQuantity() < request.getQuantity()) {
            throw new Exception("Product is out of stock or requested quantity unavailable");
        }

        Optional<CartItem> existingItemOpt = cartItemRepository.findByUserIdAndProductId(userId, request.getProductId());

        CartItem cartItem;
        if (existingItemOpt.isPresent()) {
            // Update quantity
            cartItem = existingItemOpt.get();
            int newQuantity = cartItem.getQuantity() + request.getQuantity();
            if (product.getQuantity() < newQuantity) {
                throw new Exception("Not enough stock");
            }
            cartItem.setQuantity(newQuantity);
        } else {
            // Add new item
            cartItem = new CartItem(user, product, request.getQuantity());
        }

        cartItemRepository.save(cartItem);

        // --- THIS LOGIC IS MODIFIED ---
        // Return the new nested DTO structure
        ProductCartDTO productDTO = new ProductCartDTO(product);
        return new CartItemDTO(productDTO, cartItem.getQuantity());
    }

    // Update the quantity of a specific item
    @Transactional
    public CartItemDTO updateCartItemQuantity(Long userId, Long productId, Integer quantity) throws Exception {
        if (quantity <= 0) {
            // If quantity is 0 or less, remove the item
            removeFromCart(userId, productId);
            return null; // Signal item removal
        }

        CartItem cartItem = cartItemRepository.findByUserIdAndProductId(userId, productId)
                .orElseThrow(() -> new Exception("Cart item not found"));

        Product product = cartItem.getProduct();
        if (product.getQuantity() < quantity) {
            throw new Exception("Not enough stock");
        }

        cartItem.setQuantity(quantity);
        cartItemRepository.save(cartItem);

        // --- THIS LOGIC IS MODIFIED ---
        // Return the new nested DTO structure
        ProductCartDTO productDTO = new ProductCartDTO(product);
        return new CartItemDTO(productDTO, cartItem.getQuantity());
    }


    // Remove an item completely from the cart
    public void removeFromCart(Long userId, Long productId) {
        cartItemRepository.deleteByUserIdAndProductId(userId, productId);
    }
}