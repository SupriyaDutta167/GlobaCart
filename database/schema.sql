use globacart_db;
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('USER','SELLER','ADMIN') DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    original_price DECIMAL(10,2) NOT NULL,
    discount_price FLOAT(10,2),
    discount_percent DECIMAL(5,2),
    description TEXT,
    quantity INT DEFAULT 0,
    available BOOLEAN DEFAULT TRUE,
    seller_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id)
);
ALTER TABLE products
    MODIFY COLUMN original_price FLOAT,
    MODIFY COLUMN discount_price FLOAT,
    MODIFY COLUMN discount_percent FLOAT;
    
ALTER TABLE products
ADD COLUMN image_url VARCHAR(255);


-- cart addition and orders

-- A persistent cart for each user
CREATE TABLE cart_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    -- A user can only have one row for a specific product
    UNIQUE KEY (user_id, product_id)
);

-- Main table for orders
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    
    -- Shipping Address fields
    shipping_name VARCHAR(255) NOT NULL,
    shipping_address_line1 VARCHAR(255) NOT NULL,
    shipping_city VARCHAR(100) NOT NULL,
    shipping_postal_code VARCHAR(20) NOT NULL,
    
    -- Dummy payment details
    payment_method VARCHAR(50) DEFAULT 'DUMMY_PAYMENT',
    payment_status VARCHAR(50) DEFAULT 'COMPLETED',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Stores a snapshot of the items in a specific order
CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT,
    quantity INT NOT NULL,
    
    -- Store the price at the time of purchase
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    
    product_name VARCHAR(255) NOT NULL, -- Store product name for history
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    -- We keep the product_id link, but don't cascade delete
    -- so we can see order history even if a product is deleted.
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL 
);





