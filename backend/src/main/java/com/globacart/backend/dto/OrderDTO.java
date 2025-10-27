package com.globacart.backend.dto;

import com.globacart.backend.model.Order;
import com.globacart.backend.model.OrderItem;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

// This DTO is used to return order history
public class OrderDTO {

    private Long id;
    private BigDecimal totalPrice;
    private String status;
    private String shippingName;
    private String shippingAddressLine1;
    private String shippingCity;
    private String shippingPostalCode;
    private LocalDateTime createdAt;
    private List<OrderItemDTO> items;

    // Inner class for OrderItem details
    public static class OrderItemDTO {
        private Long productId;
        private String productName;
        private Integer quantity;
        private BigDecimal priceAtPurchase;

        public OrderItemDTO(OrderItem item) {
            this.productId = (item.getProduct() != null) ? item.getProduct().getId() : null;
            this.productName = item.getProductName();
            this.quantity = item.getQuantity();
            this.priceAtPurchase = item.getPriceAtPurchase();
        }

        // Getters
        public Long getProductId() { return productId; }
        public String getProductName() { return productName; }
        public Integer getQuantity() { return quantity; }
        public BigDecimal getPriceAtPurchase() { return priceAtPurchase; }
    }

    // Constructor to map from Order entity
    public OrderDTO(Order order) {
        this.id = order.getId();
        this.totalPrice = order.getTotalPrice();
        this.status = order.getStatus();
        this.shippingName = order.getShippingName();
        this.shippingAddressLine1 = order.getShippingAddressLine1();
        this.shippingCity = order.getShippingCity();
        this.shippingPostalCode = order.getShippingPostalCode();
        this.createdAt = order.getCreatedAt();
        this.items = order.getItems().stream()
                .map(OrderItemDTO::new)
                .collect(Collectors.toList());
    }

    // Getters
    public Long getId() { return id; }
    public BigDecimal getTotalPrice() { return totalPrice; }
    public String getStatus() { return status; }
    public String getShippingName() { return shippingName; }
    public String getShippingAddressLine1() { return shippingAddressLine1; }
    public String getShippingCity() { return shippingCity; }
    public String getShippingPostalCode() { return shippingPostalCode; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public List<OrderItemDTO> getItems() { return items; }
}
