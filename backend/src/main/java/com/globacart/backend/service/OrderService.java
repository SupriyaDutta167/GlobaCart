package com.globacart.backend.service;

import com.globacart.backend.dto.CreateOrderRequest;
import com.globacart.backend.dto.OrderDTO;
import com.globacart.backend.model.*;
import com.globacart.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    // Get a user's entire order history
    public List<OrderDTO> getOrderHistory(Long userId) {
        return orderRepository.findByUserId(userId)
                .stream()
                .map(OrderDTO::new)
                .collect(Collectors.toList());
    }

    // Create a new order from a user's cart
    @Transactional
    public OrderDTO createOrder(Long userId, CreateOrderRequest request) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));

        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);
        if (cartItems.isEmpty()) {
            throw new Exception("Cart is empty. Cannot create order.");
        }

        Order order = new Order();
        order.setUser(user);
        order.setStatus("PENDING");
        order.setPaymentMethod("DUMMY_PAYMENT"); // As requested
        order.setPaymentStatus("COMPLETED"); // As requested

        // Set shipping details
        order.setShippingName(request.getShippingName());
        order.setShippingAddressLine1(request.getShippingAddressLine1());
        order.setShippingCity(request.getShippingCity());
        order.setShippingPostalCode(request.getShippingPostalCode());

        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalPrice = BigDecimal.ZERO;

        // Process each cart item
        for (CartItem cartItem : cartItems) {
            Product product = cartItem.getProduct();

            // Check stock
            if (product.getQuantity() < cartItem.getQuantity()) {
                throw new Exception("Not enough stock for product: " + product.getName());
            }

            // Determine price
            Double effectivePrice = (product.getDiscountPrice() != null) ? product.getDiscountPrice() : product.getOriginalPrice();
            BigDecimal priceAtPurchase = BigDecimal.valueOf(effectivePrice);

            // Create OrderItem
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setProductName(product.getName());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPriceAtPurchase(priceAtPurchase);

            orderItems.add(orderItem);

            // Update total price
            totalPrice = totalPrice.add(priceAtPurchase.multiply(BigDecimal.valueOf(cartItem.getQuantity())));

            // Decrease product stock
            product.setQuantity(product.getQuantity() - cartItem.getQuantity());
            productRepository.save(product);
        }

        order.setTotalPrice(totalPrice);
        order.setItems(orderItems); // Add items to the order

        // Save the order (which cascades to save OrderItems)
        Order savedOrder = orderRepository.save(order);

        // Clear the user's cart
        cartItemRepository.deleteByUserId(userId);

        return new OrderDTO(savedOrder);
    }
}
