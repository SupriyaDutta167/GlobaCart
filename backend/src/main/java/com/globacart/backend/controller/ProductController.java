package com.globacart.backend.controller;

import com.globacart.backend.dto.ProductDTO;
import com.globacart.backend.model.Product;
import com.globacart.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/add/{sellerId}")
    public ResponseEntity<?> addProduct(@PathVariable Long sellerId, @RequestBody Product product) {
        try {
            Product saved = productService.addProduct(product, sellerId);
            return ResponseEntity.ok(productService.convertToDTO(saved));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/")
    public List<ProductDTO> getAllProducts() {
        return productService.getAllProducts()
                .stream()
                .map(productService::convertToDTO)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        try {
            Product product = productService.getProductById(id);
            return ResponseEntity.ok(productService.convertToDTO(product));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/category/{category}")
    public List<ProductDTO> getProductsByCategory(@PathVariable String category) {
        return productService.getProductsByCategory(category)
                .stream()
                .map(productService::convertToDTO)
                .toList();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully");
    }


    // Fetch products by a particular seller
    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<?> getProductsBySeller(@PathVariable Long sellerId) {
        List<ProductDTO> products = productService.getProductsBySeller(sellerId)
                .stream().map(productService::convertToDTO).toList();
        return ResponseEntity.ok(products);
    }

    // Update product (only for seller who owns it)
    @PutMapping("/update/{productId}/seller/{sellerId}")
    public ResponseEntity<?> updateProduct(
            @PathVariable Long productId,
            @PathVariable Long sellerId,
            @RequestBody Product updatedProduct
    ) {
        try {
            Product saved = productService.updateProduct(productId, updatedProduct, sellerId);
            return ResponseEntity.ok(productService.convertToDTO(saved));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Seller dashboard stats
    @GetMapping("/seller/{sellerId}/stats")
    public ResponseEntity<?> getSellerStats(@PathVariable Long sellerId) {
        return ResponseEntity.ok(productService.getSellerStats(sellerId));
    }

}
