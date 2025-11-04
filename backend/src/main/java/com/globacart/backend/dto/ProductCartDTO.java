package com.globacart.backend.dto;

import com.globacart.backend.model.Product;

// This DTO represents the "product" object nested inside the CartItemDTO
public class ProductCartDTO {
    private Long id;
    private String name;
    private String company; // <-- Added this, CartItem.jsx uses it
    private String imageUrl;
    private Double originalPrice;
    private Double discountPrice;
    private Integer quantity; // This will be the *stock* quantity

    // Constructor to map from Product entity
    public ProductCartDTO(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.company = product.getCompany();
        this.imageUrl = product.getImageUrl();
        this.originalPrice = product.getOriginalPrice();
        this.discountPrice = product.getDiscountPrice();
        this.quantity = product.getQuantity(); // This is the stock
    }

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getCompany() { return company; }
    public String getImageUrl() { return imageUrl; }
    public Double getOriginalPrice() { return originalPrice; }
    public Double getDiscountPrice() { return discountPrice; }
    public Integer getQuantity() { return quantity; }
}