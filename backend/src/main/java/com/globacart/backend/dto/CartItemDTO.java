package com.globacart.backend.dto;

// This DTO is used to return cart details to the frontend
public class CartItemDTO {

    // This is the nested product object
    private ProductCartDTO product;

    // This is the quantity in the cart
    private Integer quantity;

    public CartItemDTO(ProductCartDTO product, Integer quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    // Getters and Setters
    public ProductCartDTO getProduct() { return product; }
    public void setProduct(ProductCartDTO product) { this.product = product; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}