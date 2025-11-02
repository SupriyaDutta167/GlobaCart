INSERT INTO users (username, email, password, role)
VALUES 
('admin', 'admin@globacart.com', 'admin123', 'ADMIN'),
('user1', 'user1@example.com', 'user123', 'USER');


SHOW TABLES;
DESCRIBE users;
SELECT * FROM users;

SELECT * FROM products;

INSERT INTO users (username, email, password, role)
VALUES ('commonseller', 'commonseller@example.com', 'seller123', 'SELLER');

delete from products where id= 8;
