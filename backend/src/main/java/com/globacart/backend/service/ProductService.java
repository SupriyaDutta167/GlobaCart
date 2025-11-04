package com.globacart.backend.service;

import com.globacart.backend.dto.ProductDTO;
import com.globacart.backend.model.Product;
import com.globacart.backend.model.User;
import com.globacart.backend.repository.ProductRepository;
import com.globacart.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public Product addProduct(Product product, Long sellerId) throws Exception {
        User seller = userRepository.findById(sellerId)
                .orElseThrow(() -> new Exception("Seller not found"));

        if (!"SELLER".equalsIgnoreCase(seller.getRole().name())) {
            throw new Exception("Only sellers can add products");
        }

        product.setSeller(seller);
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findByAvailableTrue();
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> getProductsBySeller(Long sellerId) {
        return productRepository.findBySellerId(sellerId);
    }

    public Product getProductById(Long id) throws Exception {
        return productRepository.findById(id)
                .orElseThrow(() -> new Exception("Product not found"));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    // Convert Product → DTO
    public ProductDTO convertToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setCompany(product.getCompany());
        dto.setCategory(product.getCategory());
        dto.setOriginalPrice(product.getOriginalPrice());
        dto.setDiscountPrice(product.getDiscountPrice());
        dto.setDiscountPercent(product.getDiscountPercent());
        dto.setDescription(product.getDescription());
        dto.setQuantity(product.getQuantity());
        dto.setImageUrl(product.getImageUrl());
        dto.setSellerId(product.getSeller() != null ? product.getSeller().getId() : null);
        return dto;
    }

    // --- add inside ProductService class ---
    public Product updateProduct(Long productId, Product updatedData, Long sellerId) throws Exception {
        Product existing = productRepository.findById(productId)
                .orElseThrow(() -> new Exception("Product not found"));

        if (!existing.getSeller().getId().equals(sellerId)) {
            throw new Exception("You are not aut    horized to update this product");
        }

        // Update fields only if new values are provided
        if (updatedData.getName() != null) existing.setName(updatedData.getName());
        if (updatedData.getCompany() != null) existing.setCompany(updatedData.getCompany());
        if (updatedData.getCategory() != null) existing.setCategory(updatedData.getCategory());
        if (updatedData.getOriginalPrice() != null) existing.setOriginalPrice(updatedData.getOriginalPrice());
        if (updatedData.getDiscountPrice() != null) existing.setDiscountPrice(updatedData.getDiscountPrice());
        if (updatedData.getDiscountPercent() != null) existing.setDiscountPercent(updatedData.getDiscountPercent());
        if (updatedData.getDescription() != null) existing.setDescription(updatedData.getDescription());
        if (updatedData.getQuantity() != null) existing.setQuantity(updatedData.getQuantity());
        if (updatedData.getImageUrl() != null) existing.setImageUrl(updatedData.getImageUrl());
        if (updatedData.getAvailable() != null) existing.setAvailable(updatedData.getAvailable());

        return productRepository.save(existing);
    }

    public record SellerStats(int totalProducts, int totalQuantity, double avgDiscount) {}

    public SellerStats getSellerStats(Long sellerId) {
        List<Product> products = productRepository.findBySellerId(sellerId);
        int totalProducts = products.size();
        int totalQuantity = products.stream().mapToInt(p -> p.getQuantity() != null ? p.getQuantity() : 0).sum();
        double avgDiscount = products.stream()
                .filter(p -> p.getDiscountPercent() != null)
                .mapToDouble(Product::getDiscountPercent)
                .average().orElse(0.0);

        return new SellerStats(totalProducts, totalQuantity, avgDiscount);
    }

}
