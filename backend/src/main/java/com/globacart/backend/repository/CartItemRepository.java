package com.globacart.backend.repository;

import com.globacart.backend.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByUserId(Long userId);

    Optional<CartItem> findByUserIdAndProductId(Long userId, Long productId);

    @Transactional
    @Modifying
    void deleteByUserIdAndProductId(Long userId, Long productId);

    @Transactional
    @Modifying
    void deleteByUserId(Long userId);
}
