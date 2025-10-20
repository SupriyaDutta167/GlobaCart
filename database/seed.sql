INSERT INTO users (username, email, password, role)
VALUES 
('admin', 'admin@globacart.com', 'admin123', 'ADMIN'),
('user1', 'user1@example.com', 'user123', 'USER');

use globacart_db;
SHOW TABLES;
DESCRIBE users;
SELECT * FROM users;

